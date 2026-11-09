# GenQuantis Software — Website Integration Guide

This guide explains how to connect your primary marketing website (e.g., CuraQuantis / Zerokost main website) directly to this standalone **GenQuantis Partner & Investor Portal** software.

---

## 1. Direct Software URL Mappings

When users on your website click on partnership opportunities or investor portals, link them directly to the corresponding endpoint on this portal software:

| User Intent on Main Website | Destination URL on GenQuantis Portal |
| :--- | :--- |
| **Partner & Investor Portal Hub** | `https://<PORTAL_DOMAIN>/` or `https://<PORTAL_DOMAIN>/partner-portal` |
| **Apply for Pan-India Channel Partner** | `https://<PORTAL_DOMAIN>/apply/pan-india` |
| **Apply for Regional Channel Partner** | `https://<PORTAL_DOMAIN>/apply/regional` |
| **Apply for Franchise Diagnostic Center** | `https://<PORTAL_DOMAIN>/apply/franchise` |
| **Compare All 3 Pathways** | `https://<PORTAL_DOMAIN>/apply` |
| **Track Submitted Docket Status** | `https://<PORTAL_DOMAIN>/#pathways` |
| **Partner Docket Sign In** | `https://<PORTAL_DOMAIN>/portal/login` |
| **Executive Scrutiny Board Login** | `https://<PORTAL_DOMAIN>/portal/login?tab=admin` |

---

## 2. Drop-in HTML Snippets for Your Main Website

### A. Navigation Bar Link (Orange Gradient Pill)

Add this button to your main website's navbar:

```html
<!-- GenQuantis Partner Portal Navbar Button -->
<a
  href="https://portal.genquantis.com/"
  target="_blank"
  rel="noopener noreferrer"
  style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: 9999px; background: linear-gradient(135deg, #f97316 0%, #f59e0b 100%); color: #ffffff; font-weight: 600; font-size: 13px; text-decoration: none; box-shadow: 0 4px 14px rgba(249, 115, 22, 0.3); transition: transform 0.2s, box-shadow 0.2s;"
  onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 20px rgba(249, 115, 22, 0.4)';"
  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 14px rgba(249, 115, 22, 0.3)';"
>
  <span style="width: 7px; height: 7px; border-radius: 9999px; background-color: #ffffff; display: inline-block;"></span>
  <span>Partner & Investor Portal</span>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 17l9.2-9.2M17 17V7H7"/>
  </svg>
</a>
```

---

### B. Hero / Homepage CTA Cards (3 Pathway Links)

```html
<!-- GenQuantis 3-Pathway Direct Gateway Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 1100px; margin: 40px auto; font-family: system-ui, sans-serif;">
  
  <!-- 1. Pan-India Channel Partner -->
  <a href="https://portal.genquantis.com/apply/pan-india" target="_blank" style="padding: 24px; border-radius: 20px; background: #ffffff; border: 1px solid #fed7aa; text-decoration: none; color: inherit; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.08); transition: transform 0.2s;">
    <div style="font-size: 11px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Tier 1 Master Network</div>
    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Pan-India Channel Partner</div>
    <div style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 16px;">National master distribution, cold-chain logistics, and hospital network integration.</div>
    <div style="font-size: 12px; font-weight: 700; color: #ea580c;">Apply Pan-India &rarr;</div>
  </a>

  <!-- 2. Regional Channel Partner -->
  <a href="https://portal.genquantis.com/apply/regional" target="_blank" style="padding: 24px; border-radius: 20px; background: #ffffff; border: 1px solid #fde68a; text-decoration: none; color: inherit; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.08); transition: transform 0.2s;">
    <div style="font-size: 11px; font-weight: 700; color: #d97706; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Tier 2 Zonal Lead</div>
    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Regional Channel Partner</div>
    <div style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 16px;">State & UT healthcare penetration, clinical doctor networks, and franchise introductions.</div>
    <div style="font-size: 12px; font-weight: 700; color: #d97706;">Apply Regional &rarr;</div>
  </a>

  <!-- 3. Franchise Investor -->
  <a href="https://portal.genquantis.com/apply/franchise" target="_blank" style="padding: 24px; border-radius: 20px; background: #ffffff; border: 1px solid #fdba74; text-decoration: none; color: inherit; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.08); transition: transform 0.2s;">
    <div style="font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Tier 3 Clinic Ownership</div>
    <div style="font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Franchise Smart Clinic Hub</div>
    <div style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 16px;">Own and operate an AI Preventive Diagnostics Center (1,200 – 3,500 sq.ft prime commercial space).</div>
    <div style="font-size: 12px; font-weight: 700; color: #c2410c;">Apply Franchise &rarr;</div>
  </a>

</div>
```

---

## 3. Recommended Subdomain Setup

Host this portal software on a dedicated subdomain:
* **Recommended Subdomain:** `https://portal.genquantis.com` or `https://partner.genquantis.com`
* **Vercel / Netlify / Azure:** Point the root to `dist/` and route `/api/*` to the Express backend or your Azure API service.

---

## 4. Default Demonstration Credentials

For testing and demonstrating the platform:

| Role | Login Identifier | Password / Verification | Destination |
| :--- | :--- | :--- | :--- |
| **Partner / Applicant** | `GQ-2026-904128` | `vikram.sengupta@apollomediagroup.in` (or 1-Click Auto-Fill) | `/portal/partner-dashboard` |
| **Scrutiny Board / Admin** | `admin@genquantis.com` | `Admin@GenQuantis2026` (or 1-Click Auto-Fill) | `/portal/admin` |

