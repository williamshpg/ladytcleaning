# SEO Action Plan & Roadmap: Lady T's Cleaning Services
**Target**: Achieve #1 organic & local 3-pack rankings in Benin City & Edo State  
**Baseline Health Score**: **93 / 100** (Grade A)  
**Target Post-Implementation Score**: **98+ / 100**  

---

## 📌 Phase 1: Immediate Quick Wins — ✅ COMPLETED

### Task 1.1: Add Video Poster Frame to Hero Section (LCP Optimization)
- **Status**: ✅ **Completed**
- **Target File**: [index.html](file:///c:/Users/Dell%20Xps/Documents/Lady%20T%20Cleaning/index.html#L332)
- **Implemented**: Added `poster="/kitchen-clean.jpg"` to the `<video id="hero-video-player">` element.
- **Impact**: Eliminates mobile blank render delay and provides instant perceived Largest Contentful Paint (LCP).

### Task 1.2: Optimize Meta Descriptions for Mobile & Desktop Snippets
- **Status**: ✅ **Completed**
- **Target Files**:
  - [index.html](file:///c:/Users/Dell%20Xps/Documents/Lady%20T%20Cleaning/index.html#L7): Trimmed to 158 chars: `Benin City's top-rated cleaning company. Residential, office, deep cleaning & fumigation across Edo State. Call or WhatsApp 0703 875 0117 for instant booking!`
  - [contact.html](file:///c:/Users/Dell%20Xps/Documents/Lady%20T%20Cleaning/contact.html#L7): Trimmed to 158 chars: `Looking for cleaners near you in Benin City? Contact Lady T's Cleaning Services. Call or WhatsApp 0703 875 0117. Fast dispatch to GRA, Ugbowo & all Edo State.`
  - [services.html](file:///c:/Users/Dell%20Xps/Documents/Lady%20T%20Cleaning/services.html#L7): Trimmed to 156 chars: `Top cleaning services in Benin City & Edo State. Residential, commercial office, deep clean, carpets & fumigation. Call or WhatsApp Lady T on 0703 875 0117.`

### Task 1.3: Refine About Page Title Tag
- **Status**: ✅ **Completed**
- **Target File**: [about.html](file:///c:/Users/Dell%20Xps/Documents/Lady%20T%20Cleaning/about.html#L6)
- **Implemented**: Shortened to 64 chars: `About Lady T's Cleaning Services | Benin City Cleaners Edo State` (prevents SERP snippet truncation).

---

## 🚀 Phase 2: High-Impact Performance & Media Optimizations (Week 1–2)

### Task 2.1: Next-Gen WebP Image Conversion
- **Action**: Convert all high-resolution JPEG imagery in `public/` (`service-residential.jpg`, `service-commercial.jpg`, `service-fumigation.jpg`, `service-carpet.jpg`, `service-post-construction.jpg`, `kitchen-clean.jpg`, `clean-kitchen-sparkle.jpg`, `team-vetted.jpg`) into `.webp` format at 85% quality.
- **Estimated Savings**: ~6MB payload reduction (~60% total bandwidth reduction on initial page load).

### Task 2.2: Mobile Video Alternate Source
- **Action**: Encode a lightweight 720p/30fps MP4 compressed with Handbrake or ffmpeg (<1.2MB) and provide conditional loading via media queries or `<source media="(max-width: 768px)">`.

### Task 2.3: Production Hosting Cache & Security Headers
- **Action**: When hosting on Cloudflare / Vercel / Nginx, set response headers:
  ```http
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Cache-Control: public, max-age=31536000, immutable  # (for /public static assets)
  ```

---

## 📈 Phase 3: Content Expansion & Authority Scaling (Month 1–2)

### Task 3.1: Individual Blog Article URLs
- **Action**: Create dedicated HTML files for each major guide:
  - `/blog/house-cleaning-cost-in-benin-city.html`
  - `/blog/deep-cleaning-vs-regular-cleaning.html`
  - `/blog/post-construction-cleaning-checklist.html`
- **Benefit**: Captures exact match long-tail questions on Google Search and boosts internal link juice.

### Task 3.2: Google Business Profile (GBP) Review Velocity
- **Action**: Collect 20+ reviews from real customers in Benin City on the verified GBP (`cid=10093121544320497292`).
- **Action**: Update `schema.org/LocalBusiness` on the homepage to include `aggregateRating`:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "48"
  }
  ```
- **Benefit**: Displays star rating stars directly in Google organic search results.

---

## 🔍 Phase 4: Ongoing Monitoring & Local Domination (Monthly)

1. **Search Console Monitoring**:
   - Check click-through-rates (CTR) for `cleaning services in benin city` and `cleaners near me`.
   - Ensure 0 coverage errors in Google Search Console.
2. **Local Pack Rank Tracking**:
   - Track ranking position in the Google Maps Local 3-Pack across Benin City coordinates (GRA, Ugbowo, Airport Rd, Amagba).
3. **AI Search Engine Monitoring**:
   - Perform monthly prompts in ChatGPT Search and Perplexity: *"Who are the best residential and office cleaners in Benin City, Nigeria?"* to verify brand citations.
