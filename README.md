# Audit AI 🌐⚡

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-f38020?style=flat&logo=cloudflare)](https://audit-ai-98b.pages.dev)
[![UI Theme](https://img.shields.io/badge/UI%20Design-Tools4Genz%20Theme-6366f1)](https://tools4genz.com)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**Audit AI** is a next-generation **AI-powered website auditing and intelligence platform**. It analyzes websites across **Performance (Core Web Vitals), SEO Health, WCAG Accessibility, SSL & Security Headers, Phishing & Scam Detection**, and automatically generates **actionable AI code fixes**.

Designed with the **Tools4Genz UI Design System**, equipped with bilingual support (English & Hindi), dark/light themes, and built for instant deployment on **Cloudflare Pages & Edge Functions**.

🌐 **Live Production Deployment:** [https://audit-ai-98b.pages.dev](https://audit-ai-98b.pages.dev)

---

## 🚀 Key Features

### 1. ⚡ Core Web Vitals & Speed Audit
- Evaluates **First Contentful Paint (FCP)**, **Largest Contentful Paint (LCP)**, **Time to First Byte (TTFB)**.
- Analyzes total page weight, resource counts, and HTTP text compression (**Brotli** & **Gzip**).

### 2. 🔍 SEO & Social Card Engine
- Audits `<title>` tag lengths, `<meta description>` optimization, and self-referencing canonical links.
- Evaluates semantic heading structure (`H1`-`H6`).
- Real-time **Google Search Snippet Preview**.
- **OpenGraph** and **Twitter/X Large Image Card** previews.

### 3. 🔒 Cyber Security & Edge Headers
- Tests **HTTPS / TLS 1.3** transport security.
- Verifies critical HTTP response headers:
  - `Strict-Transport-Security` (HSTS)
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options` (Clickjacking mitigation)
  - `X-Content-Type-Options` (MIME sniffing defense)
  - `Referrer-Policy` & `Permissions-Policy`

### 4. ♿ WCAG 2.1 Accessibility
- Image `alt` text coverage and screen reader readiness.
- Root HTML `lang` attribute verification.
- Interactive button accessible name check & ARIA landmarks.
- Color contrast ratio compliance.

### 5. 🛡️ Scam & Phishing Trust Shield
- Intelligent heuristic analysis detecting fraudulent or clone sites:
  - Typosquatting and abnormal hyphen count checks.
  - Raw IP address hosting detection.
  - Phishing keyword triggers (`login`, `bank`, `wallet`, `otp`, `urgent`).
  - Trust Score (0-100) and risk verdict: **Safe**, **Suspicious**, or **High Risk**.

### 6. ⚔️ Side-by-Side Competitor Comparison
- Audit two websites simultaneously and benchmark them head-to-head.

### 7. 💻 Tech Stack & CMS Detector
- Automatically identifies frontend frameworks (React, Next.js, Vue, Tailwind CSS), CMS platforms (WordPress, Shopify), CDNs (Cloudflare), and Analytics.

### 8. 🩺 AI Doctor & Instant Code Fixes
- Generates human-friendly explanations of every issue.
- Provides 1-click **Drop-in Code Snippets** (HTML, Nginx, HTTP headers) to fix issues immediately.

### 9. 📄 Export & Sharing
- Export complete client-ready **PDF Reports** via native print styling.
- **Export JSON** for automated CI/CD pipelines.
- Generate shareable audit links.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vite 6
- **Internationalization:** `i18next`, `react-i18next`, `i18next-browser-languagedetector` (English & हिन्दी)
- **Deployment & Edge Backend:** Cloudflare Pages & Cloudflare Pages Functions (`functions/api/audit.ts`)
- **Design System:** Tools4Genz modern sleek theme (Indigo primary, Emerald accent, Slate dark/light surface)
- **Local Engine & Automation:** Python Flask, Beautiful Soup, SQLite (included for standalone CLI workflows)

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/alokmodanval/audit-ai.git
cd audit-ai

# Install dependencies
npm install

# Start local development server
npm run dev
```

Build for production:
```bash
npm run build
```

Deploy to Cloudflare Pages:
```bash
npm run deploy
```

---

## 📄 License

MIT License. Designed and maintained for modern web creators.
