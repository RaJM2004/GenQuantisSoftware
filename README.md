# GenQuantis Software — Partner & Investor Portal

Standalone enterprise portal software extracted from the GenQuantis ecosystem (`https://github.com/RaJM2004/GenQuantis`).

This software is designed to be hosted independently (e.g., `https://portal.genquantis.com` or `https://partner.genquantis.com`) so the main marketing website can simply link directly to it via its URL rather than rendering the complete due diligence, KYC, document vault, and management portals within the public marketing pages.

---

## Architecture & Features

### 1. Partner & Investor Portal Hub (`/` & `/partner-portal`)
- Overview of GenQuantis partnership opportunities and network expansion.
- Real-time application reference tracker connected directly to MongoDB Atlas and local resilient storage.
- Gateway cards to all three structured application pathways.
- Authority matrix and compliance declarations.

### 2. Three Distinct Application Forms (`/apply/:pathway`)
Each pathway features a specialized multi-step form wizard with strict validation, interactive territory selection, and document uploads:
1. **Pan-India Channel Partner Form** (`/apply/pan-india`):
   - Tier 1: National master distribution network (₹5 Cr – ₹15 Cr+).
   - Cold-chain distribution readiness, corporate governance, and multi-zone team coordination.
2. **Regional Channel Partner Form** (`/apply/regional`):
   - Tier 2: State & Zonal healthcare leadership (₹50 Lakhs – ₹3 Crores).
   - Doctor and clinic network penetration, franchise onboarding coordination.
3. **Franchise Investor Application Form** (`/apply/franchise`):
   - Tier 3: AI Diagnostic & Smart Clinic hub ownership (₹1.5 Cr – ₹3 Crores).
   - Commercial property details (1,200 – 3,500 sq.ft), local diagnostic equipment compliance, NABL & AERB alignment.

#### Wizard Steps Included:
- **Step 1:** Individual & Authorized Signatory Profile (KYC, Education, Experience).
- **Step 2:** Business Entity Information (Type, CIN, GSTIN, Audited Turnover).
- **Step 3:** Interactive Territory Allocation Map (`IndiaTerritoryMap`) with 36 States & Union Territories.
- **Step 4:** Financial Net-Worth & Investment Capability Tier.
- **Step 5:** Client-Side Document Vault (`DocumentVault` powered by IndexedDB) for Government IDs, Incorporation Certificates, Bank Statements, and Audited Balance Sheets.
- **Step 6:** Statutory Declarations, Digital Submission, Reference Docket Generation (`GQ-2026-XXXXXX`), and Dual Email Confirmation Dispatching.

### 3. Portal Sign In (`/portal/login` & `/login`)
- **Applicant / Channel Partner Sign In:**
  - Login using Application Reference Number (e.g. `GQ-2026-904128`) and registered Mobile / Email.
  - One-click sample test login provided.
  - Redirects to the live **Partner Dashboard** (`/portal/partner-dashboard`).
- **Scrutiny Board / Admin Sign In:**
  - Login for GenQuantis & GenQuantis executive leadership.
  - Authenticates with authorized credentials (`admin@genquantis.com`, `dharani@genquantis.com`, `ashwin@genquantis.com`).
  - Redirects to the **Management Scrutiny Dashboard** (`/portal/admin`).

### 4. Dashboards & Management Workflows
- **Partner Dashboard** (`/portal/partner-dashboard`):
  - Real-time multi-stage due diligence progress tracker.
  - Document verification status and one-click re-upload for rejected files.
  - Official GenQuantis bank account RTGS/NEFT payment details.
  - Territory assignment details and MoU / Agreement dockets.
  - Prospective investor lead registration module for Channel Partners.
- **Management Scrutiny Board** (`/portal/admin`):
  - Executive review board for screening, advancing, approving, or rejecting applications.
  - Document inspection viewer (Zoom, Rotate, Verify, Reject with notes).
  - Multi-criteria filtering by pathway, status, and state.
  - Direct email dispatching and full immutable audit log.

### 5. Backend API & Database
- Express backend (`genquantis/server.cjs`) with Mongoose models:
  - `PartnerApplication` (Full application schema, timeline, documents, audit logs).
  - `InvestorLead` (Lead referral records).
- Connected to MongoDB Atlas (`genquantis` database).
- Resilient fallback: Automatically serves cached memory data if the database is temporarily unreachable.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start both Express API (Port 5000) and Vite Frontend (Port 8080) concurrently
npm run dev:all

# Or run separately:
npm run server  # Starts Express server on http://localhost:5000
npm run dev     # Starts Vite dev server on http://localhost:8080

# Build production bundle
npm run build
```

---

## Linking from the Main Website

In your primary website (e.g., GenQuantis main site), you can replace embedded form sections with direct links pointing to this portal:

- **Partner Portal Hub:** `<a href="https://<PORTAL_URL>/">Partner & Investor Portal</a>`
- **Pan-India Application:** `<a href="https://<PORTAL_URL>/apply/pan-india">Apply Pan-India</a>`
- **Regional Application:** `<a href="https://<PORTAL_URL>/apply/regional">Apply Regional</a>`
- **Franchise Application:** `<a href="https://<PORTAL_URL>/apply/franchise">Apply Franchise</a>`
- **Portal Login:** `<a href="https://<PORTAL_URL>/portal/login">Partner Sign In</a>`
- **Executive Scrutiny Board:** `<a href="https://<PORTAL_URL>/portal/login?tab=admin">Scrutiny Board</a>`

