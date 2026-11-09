# GenQuantis™ Partner & Investor Portal — Azure Deployment Guide

This guide provides end-to-end instructions for deploying the **GenQuantis™ Partner & Investor Portal** on Microsoft Azure with enterprise security, MongoDB Atlas connectivity, automated SSL, and custom domain setup.

---

## 1. Architecture Overview

The software is structured to support both **Single-Service Unified Deployment** (easiest & recommended) and **Decoupled Deployment**:

```
                                      +---------------------------------------------+
                                      |            Client / Browser                 |
                                      +---------------------------------------------+
                                                             |
                                                             | HTTPS (portal.genquantis.com)
                                                             v
                             +---------------------------------------------------------------+
                             |             Azure App Service (Linux Node.js 20 LTS)          |
                             |                                                               |
                             |   +-----------------------+     +-------------------------+   |
                             |   |  Vite React Frontend  |     |  Express API Server     |   |
                             |   |  (SPA dist/ assets)   | <-> |  (server/server.cjs)    |   |
                             |   +-----------------------+     +-------------------------+   |
                             +---------------------------------------------------------------+
                                                             |
                                                             | TLS 1.3 / MongoDB Wire Protocol
                                                             v
                             +---------------------------------------------------------------+
                             |                 MongoDB Atlas Cloud Cluster                   |
                             |               (Applications, Documents, Audit)               |
                             +---------------------------------------------------------------+
```

### Why Azure App Service (Unified) is Recommended:
- **Zero CORS Issues**: Frontend and API share the exact same origin (`https://your-app.azurewebsites.net`).
- **Single Bill & Resource**: One App Service Plan runs both client and API.
- **Built-in Auto-SSL**: Free Microsoft-managed TLS/SSL certificates with automated renewal.
- **Git Continuous Deployment**: Direct push-to-deploy via GitHub Actions.

---

## 2. Prerequisites

1. **Azure Account**: Active subscription with permissions to create App Services ([portal.azure.com](https://portal.azure.com)).
2. **MongoDB Atlas Cluster**: Connection string (`mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/curaquantis`).
3. **GitHub Repository**: Code pushed to your repository (e.g. `main` branch).
4. **Azure CLI** (Optional, for command-line deployment): Installed on your workstation ([Install Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)).

---

## 3. Method 1: Azure App Service (Portal Walkthrough — Recommended)

### Step 1: Create the Web App in Azure Portal
1. Log in to [Azure Portal](https://portal.azure.com).
2. Click **Create a resource** > Search for **Web App** > Click **Create**.
3. Fill in the **Basics** tab:
   - **Subscription**: Select your subscription.
   - **Resource Group**: Select existing or click *Create new* (e.g., `rg-genquantis-prod`).
   - **Name**: Enter a unique name (e.g., `genquantis-portal` -> will be `https://genquantis-portal.azurewebsites.net`).
   - **Publish**: Choose **Code**.
   - **Runtime stack**: **Node 20 LTS**.
   - **Operating System**: **Linux** (Fastest & most cost-effective).
   - **Region**: Choose closest to your target users (e.g., **Central India** or **South India**).
   - **Pricing Plan**:
     - *For Testing/Staging*: **Free F1** or **Basic B1**.
     - *For Production*: **Standard S1** or **Premium P0V3** (supports custom domains & auto-scaling).
4. Click **Review + Create**, then click **Create**. Wait ~60 seconds for deployment to complete.

---

### Step 2: Configure Environment Variables (Application Settings)
1. Go to your newly created **Web App** in the Azure Portal.
2. In the left navigation menu under **Settings**, click **Configuration** (or **Environment variables**).
3. Under **Application settings**, click **+ New application setting** to add the following variables:

| Name | Recommended Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production optimizations & logging |
| `PORT` | `8080` (or leave default) | Azure automatically maps this to port 80/443 |
| `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster0.gxsxc6g.mongodb.net/curaquantis?retryWrites=true&w=majority` | Your MongoDB Atlas connection URI |
| `GENQUANTIS_SUPPORT_EMAIL` | `support@genquantis.com` | Official support & scrutiny email |
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `true` | Tells Oryx/Azure to run `npm install` & build automatically |

4. Click **Apply** or **Save** at the top, then confirm **Continue**.

---

### Step 3: Configure Startup Command
1. In the Web App menu under **Settings**, click **Configuration** (or **General settings**).
2. In the **Startup Command** field, enter:
   ```bash
   npm run build && npm start
   ```
   *(Note: `npm start` executes `node server/server.cjs`, which serves the built React app and the API).*
3. Click **Save**.

---

### Step 4: Connect Continuous Deployment (GitHub Actions)
1. In the Web App menu under **Deployment**, click **Deployment Center**.
2. Under **Source**, select **GitHub**.
3. Authorize Azure to access your GitHub account.
4. Select:
   - **Organization**: Your GitHub username / Org.
   - **Repository**: `GenQuantis Software` (or your repository name).
   - **Branch**: `main`.
5. Under **Build provider**, select **GitHub Actions**.
6. Click **Save**. Azure will automatically commit a workflow file to `.github/workflows/` and trigger your first automated build and deployment!

---

## 4. Method 2: Deployment via Azure CLI (One Command)

If you have Azure CLI installed and logged in (`az login`), you can deploy directly from your local terminal:

```powershell
# 1. Login to Azure
az login

# 2. Set your default resource group and location (e.g. Central India)
az group create --name rg-genquantis-prod --location centralindia

# 3. Create Linux App Service Plan (Basic B1 tier)
az appservice plan create \
  --name plan-genquantis-linux \
  --resource-group rg-genquantis-prod \
  --sku B1 \
  --is-linux

# 4. Create Web App
az webapp create \
  --name genquantis-portal \
  --resource-group rg-genquantis-prod \
  --plan plan-genquantis-linux \
  --runtime "NODE:20-lts"

# 5. Set Environment Variables
az webapp config appsettings set \
  --name genquantis-portal \
  --resource-group rg-genquantis-prod \
  --settings \
    NODE_ENV="production" \
    SCM_DO_BUILD_DURING_DEPLOYMENT="true" \
    MONGO_URI="mongodb+srv://<USER>:<PASS>@cluster0.gxsxc6g.mongodb.net/curaquantis?retryWrites=true&w=majority" \
    GENQUANTIS_SUPPORT_EMAIL="support@genquantis.com"

# 6. Set Startup Command
az webapp config set \
  --name genquantis-portal \
  --resource-group rg-genquantis-prod \
  --startup-file "npm run build && npm start"

# 7. Deploy local code to Azure Web App
az webapp up \
  --name genquantis-portal \
  --resource-group rg-genquantis-prod \
  --runtime "NODE:20-lts"
```

---

## 5. Method 3: Docker Container Deployment (Azure Container Apps / Web App for Containers)

A production-ready `Dockerfile` and `.dockerignore` are included in the workspace root.

### Build and Push using Azure Container Registry (ACR):
```powershell
# 1. Create Container Registry
az acr create --resource-group rg-genquantis-prod --name acrgenquantis --sku Basic --admin-enabled true

# 2. Build and push image to ACR directly in cloud
az acr build --registry acrgenquantis --image genquantis-portal:v1 .

# 3. Deploy container to Web App
az webapp create \
  --resource-group rg-genquantis-prod \
  --plan plan-genquantis-linux \
  --name genquantis-portal \
  --deployment-container-image-name acrgenquantis.azurecr.io/genquantis-portal:v1
```

---

## 6. MongoDB Atlas Network Configuration for Azure

By default, MongoDB Atlas blocks connections from unfamiliar IP addresses. You must grant access:

1. Log in to [MongoDB Atlas Console](https://cloud.mongodb.com/).
2. In the left menu under **Security**, click **Network Access**.
3. Click **+ Add IP Address**:
   - **Option A (Standard Cloud Setup)**: Click **Allow Access from Anywhere** (`0.0.0.0/0`).
     - *Security note*: With strong MongoDB user credentials and SCRAM-SHA-256 authentication enabled, this is standard for dynamic Azure PaaS IPs.
   - **Option B (Strict Azure IP Range)**: In Azure Portal under your Web App's **Properties**, copy the **Outbound IP addresses** and add each one to Atlas.
4. Click **Confirm**.

---

## 7. Custom Domain & Free Azure SSL Certificate

To link `portal.genquantis.com` or your company domain:

### Step 1: DNS Configuration (at GoDaddy, Cloudflare, Namecheap, etc.)
Add two DNS records to your domain provider:

| Type | Host / Name | Value / Destination |
| :--- | :--- | :--- |
| **CNAME** | `portal` | `genquantis-portal.azurewebsites.net` |
| **TXT** | `asuid.portal` | Verification ID from Azure Portal |

### Step 2: Bind in Azure Portal
1. In your Azure Web App, navigate to **Custom domains** in the left menu.
2. Click **+ Add custom domain**.
3. Enter your domain: `portal.genquantis.com`.
4. Click **Validate**. Once validation passes, click **Add**.
5. Under **Certificates**, select **App Service Managed Certificate** (100% Free, auto-renews annually).
6. Click **Add binding** with **SNI SSL**.

Your portal is now accessible at `https://portal.genquantis.com` with full HTTPS!

---

## 8. Verifying the Deployment & Monitoring

### 1. Health Check
Open your browser and navigate to:
```
https://<your-app-name>.azurewebsites.net/api/health
```
Expected response:
```json
{
  "status": "healthy",
  "service": "GenQuantis™ Partner & Investor API Server",
  "storage": "mongodb_atlas",
  "cluster": "cluster0.gxsxc6g.mongodb.net",
  "timestamp": "2026-11-09T..."
}
```

### 2. Live Log Streaming
To monitor live logs in real time from Azure CLI:
```powershell
az webapp log tail --name genquantis-portal --resource-group rg-genquantis-prod
```
Or in the Azure Portal:
- Navigate to **Monitoring** > **Log stream**.

---

## 9. Troubleshooting & FAQ

### Issue: "You do not have permission to view this directory or page"
- **Cause**: Startup command missing or `dist/` not built.
- **Fix**: Verify your startup command is set to `npm run build && npm start` in **Settings > Configuration > General Settings**.

### Issue: MongoDB Connection Timeout
- **Cause**: Atlas IP Access list is blocking Azure's outbound IPs.
- **Fix**: In MongoDB Atlas **Network Access**, ensure `0.0.0.0/0` is added or Azure outbound IPs are whitelisted.

### Issue: Client-side Routes (e.g. `/apply/pan-india`) 404 on refresh
- **Cause**: Server not routing unhandled GET requests to `index.html`.
- **Fix**: Already built into `server/server.cjs`! It automatically rewrites non-API GET requests to `dist/index.html`.
