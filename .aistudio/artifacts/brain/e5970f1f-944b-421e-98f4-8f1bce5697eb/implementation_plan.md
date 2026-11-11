# STEAMORA Cleaning — Complete SEO & Performance Optimization

A production-grade SEO, rendering, and conversion optimization implementation for STEAMORA Cleaning Melbourne on its official production domain (`https://steamoracleaning.com`). This plan delivers build-time static HTML prerendering for key landing pages on Vercel, dynamic homepage service adaptation, verified Schema.org structured data, audited trust claims, enhanced mobile Core Web Vitals, and end-to-end GA4 conversion tracking.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were confirmed during the clarification phase and are locked for execution:
> - **Search Engine Rendering**: Build-time static HTML prerendering generating dedicated route-specific HTML files (`dist/<route>/index.html`) with server-delivered meta tags, canonical links, JSON-LD schema, and meaningful semantic body content, preserving 100% Vercel compatibility without a full Next.js framework rewrite.
> - **Homepage Query Parameter Handling**: Query parameters such as `/?service=sofa` dynamically adapt the homepage hero headline, description, imagery, and CTA to the specific service while maintaining the canonical URL pointing cleanly to root `https://steamoracleaning.com/`.
> - **Trust & Marketing Claims**: All unverified marketing claims (e.g. specific $20M insurance figures, WoolSafe/IICRC badge claims, 99.9% allergen percentages) will be replaced with professional, neutral phrasing and flagged in an owner confirmation report.

---

## 1. Overview & Core Concept

- **What It Does**: Upgrades the STEAMORA Cleaning web application into an SEO powerhouse optimized for competitive Melbourne search queries (e.g., *Carpet cleaning Melbourne*, *Sofa cleaning Melbourne*, *Couch cleaning Melbourne*). It establishes canonical `.com` authority, eliminates crawler rendering barriers via build-time static HTML generation, presents rich Schema.org `CleaningService` and `Service` microdata, and delivers sub-second LCP speeds.
- **Target Audience / Persona**: Melbourne homeowners, tenants needing end-of-lease bond cleaning, pet owners, and commercial property managers seeking reliable, professional steam cleaning across Greater Melbourne.
- **Key Value**: Guarantees fast organic search discovery, crawlability across all search bots, zero Search Console schema warnings, transparent local service credibility, and friction-free lead conversion.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Direct Search Bot & Visitor Entry (Landing Page Flow)**:
   - A visitor or Googlebot accesses `https://steamoracleaning.com/carpet-cleaning`.
   - The browser receives prerendered HTML with exact `<title>`, meta description, canonical link, `Service` JSON-LD schema, and initial semantic markup (H1, intro, benefits, Melbourne service areas).
   - React mounts smoothly without visual flicker, providing interactive quote calculation and booking affordances.
2. **Paid / Campaign URL Flow (Dynamic Service Personalization)**:
   - A user lands on `/?service=sofa` from an ad or referral.
   - The hero instantly displays *"Professional Sofa & Couch Cleaning in Melbourne"*, sofa-specific photography, tailored copy, and a sofa-targeted quote trigger.
   - The canonical tag remains `https://steamoracleaning.com/` to avoid duplicate indexing.
3. **Conversion & Quote Flow**:
   - The user clicks *"Get a Free Quote"* or *"Call 0449 993 786"*.
   - Conversion events (`quote_form_submit`, `phone_call_click`, `whatsapp_click`) fire seamlessly into GA4 (`window.dataLayer`) and provide immediate confirmation feedback.

### Visual Identity & Theme
- **Color Discipline**: 60% clean canvas (`#fafcff` neutral light / deep obsidian `#0a192f` accents), 30% structural surfaces (crisp white cards with subtle hairline `border-slate-200/80` borders), 10% high-intent action accents (emerald/teal `teal-600` primary buttons, `#25D366` WhatsApp action).
- **Typography & Hierarchy**: Neo-grotesque display (`Outfit` / `Plus Jakarta Sans`) with balanced headline wrapping (`text-wrap: balance`), clear 1-line metadata tags without gratuitous pill clutter, and tabular numbers (`tabular-nums`) for pricing transparency.
- **Top Bar Contract**: Clean 3-zone layout (single-element STEAMORA wordmark, single-line desktop navigation links, and primary Quote CTA).
- **Mobile Sticky Budget**: Floating mobile CTA bar strictly capped under 15% mobile viewport height with instant thumb-friendly tap targets ($\ge 44\text{px}$).

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Build-Time Prerendering Script vs. Framework Migration
- **Chosen Approach**: A high-speed Node/TypeScript post-build script (`scripts/prerender.ts`) executed immediately after `vite build`. It extracts route metadata from `src/utils/seo.ts` and `src/data/servicesData.ts`, injects route-specific title, meta tags, OpenGraph, JSON-LD, and semantic HTML into `dist/<route>/index.html`, paired with `cleanUrls: true` in `vercel.json`.
- **Why**: Delivers 100% of the SEO benefits of pre-rendered static HTML (instant indexing by Googlebot/Bingbot/social scrapers without JavaScript evaluation delays) while avoiding the risks, code rewriting, and maintenance overhead of migrating a working Vite app to Next.js or Astro.
- **Alternatives Considered**: 
  - *Full Next.js rewrite*: Unnecessary risk for an existing production application; breaks working routing components.
  - *Client-side only meta tags*: Search engine crawlers can struggle or delay indexing SPA client-side DOM mutations.

### Decision 2: Homepage Query Parameter Personalization (`/?service=...`)
- **Chosen Approach**: Dynamic personalization of hero copy, imagery, and CTAs when `?service=sofa|carpet|upholstery|mattress|blind|rug` is present, while strictly asserting `<link rel="canonical" href="https://steamoracleaning.com/">`.
- **Why**: Maximizes conversion rate for incoming campaign traffic without fragmenting search engine equity into duplicate query-string URLs.
- **Alternatives Considered**: 301 redirecting query strings to dedicated service landing pages was considered, but dynamic hero personalization gives the user the full homepage social proof, reviews, and calculator while tailoring the top message.

### Decision 3: Factual Claim Neutralization & Verification Flags
- **Chosen Approach**: Neutralize unverified numbers (e.g. change "$20M Public Liability" to "Comprehensive Public Liability Insurance", and "WoolSafe/IICRC certified" to "Certified Fabric Care Technicians & Eco-Friendly Formulations").
- **Why**: Protects the business from regulatory and search engine spam/misrepresentation flags while presenting a strong, professional image. All neutralized items are compiled into an actionable Owner Verification Checklist.

---

## 4. Technical Architecture & Implementation Details

### System Architecture & Prerender Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Vite Build Lifecycle                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │    npm run build (vite)     │
                      │   Generates dist/index.html │
                      │   Bundles JS/CSS Assets     │
                      └─────────────────────────────┘
                                     │
                                     ▼
                      ┌─────────────────────────────┐
                      │  tsx scripts/prerender.ts   │
                      │  (Reads SEO & Service Data) │
                      └─────────────────────────────┘
                                     │
     ┌───────────────────────────────┴───────────────────────────────┐
     ▼                                                               ▼
┌───────────────────────────┐                         ┌─────────────────────────────┐
│  dist/index.html (Root)   │                         │ dist/<service>/index.html   │
│  - steamoracleaning.com   │                         │ - /sofa-cleaning            │
│  - CleaningService Schema │                         │ - /carpet-cleaning          │
│  - Pre-filled SEO Meta    │                         │ - /upholstery-cleaning      │
└───────────────────────────┘                         │ - /mattress-cleaning        │
                                                      │ - /blind-cleaning           │
                                                      │ - /rug-cleaning             │
                                                      │ - /services, /about, /etc.  │
                                                      └─────────────────────────────┘
                                                                     │
                                                                     ▼
                                                      ┌─────────────────────────────┐
                                                      │         Vercel Edge         │
                                                      │ cleanUrls: true             │
                                                      │ Serves static route HTML    │
                                                      │ Falls back to SPA index     │
                                                      └─────────────────────────────┘
```

### Phased Execution Steps

1. **Phase 1 — Domain Correction (`steamoracleaning.com`)**:
   - Update `BASE_URL` in `src/utils/seo.ts` to `https://steamoracleaning.com`.
   - Update `index.html` canonical link, og:image, twitter:image, and JSON-LD `@id` / `url`.
   - Update `public/robots.txt` (`Sitemap: https://steamoracleaning.com/sitemap.xml`).
   - Update `public/sitemap.xml` with canonical `.com` URLs for all 13 primary public routes.
   - Update `QuoteCalculator.tsx` notification string.

2. **Phase 2 & 4 — Service SEO & Structured Data Expansion**:
   - Enhance `src/data/servicesData.ts` with comprehensive keyword-targeted data (H1s, Melbourne area mentions, structured FAQs, process steps).
   - Ensure `src/utils/seo.ts` generates clean `Service` schema linked to `#cleaningservice` with zero self-referential `aggregateRating` markup.
   - Ensure every landing page has a distinct title (30–60 chars), descriptive meta (120–160 chars), and OpenGraph card.

3. **Phase 3 — Build-Time Static Prerenderer (`scripts/prerender.ts`)**:
   - Create Node/TS script utilizing `dist/index.html` as master template.
   - Generate prerendered route directories:
     - `/`
     - `/sofa-cleaning`
     - `/carpet-cleaning`
     - `/upholstery-cleaning`
     - `/mattress-cleaning`
     - `/blind-cleaning`
     - `/rug-cleaning`
     - `/services`
     - `/about`
     - `/contact`
     - `/faq`
     - `/reviews`
     - `/book-online`
   - Inject route-specific title, description, canonical link, OpenGraph tags, schema markup, and crawlable semantic server-rendered content into `#root`.
   - Update `package.json` build command to `vite build && tsx scripts/prerender.ts`.
   - Update `vercel.json` with `"cleanUrls": true`.

4. **Phase 5 — Dynamic Homepage Service Adaptation**:
   - In `src/pages/HomePage.tsx`, link `heroService` to dynamic headline, paragraph, image, and CTA when `dynamicServiceId` matches (`sofa`, `carpet`, `upholstery`, `mattress`, `blind`, `rug`).
   - Retain root canonical URL (`https://steamoracleaning.com/`) on query parameter hits.

5. **Phase 6 & 7 — Trust & Factual Claim Audit**:
   - Review and neutralize unverified claims across `Footer.tsx`, `AboutPage.tsx`, `ServiceDetailPage.tsx`, `SuburbLandingPage.tsx`, `QuoteCalculator.tsx`, and `faqsData.ts`.
   - Replace rigid guarantees and unverified percentages with credible guarantees (e.g. "Satisfaction Guarantee — Free Re-clean if Not Delighted", "End-of-Lease Approved Invoices").

6. **Phase 8 & 10 — Google Favicon & Core Web Vitals (LCP) Optimization**:
   - In `src/pages/ServiceDetailPage.tsx`, remove `loading="lazy"` on above-the-fold hero image and apply `fetchPriority="high"`.
   - Confirm all favicon dimensions (`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `site.webmanifest`).

7. **Phase 11 & 12 — Conversion Tracking Verification & Final Testing**:
   - Verify `trackConversion` hooks on quote submissions, phone clicks (`0449 993 786`), WhatsApp clicks, and bookings.
   - Run type checks (`tsc --noEmit`), applet compilation, and static prerender verification.
   - Produce the detailed completion report, files changed, owner verification checklist, and Google Search Console submission guide.
