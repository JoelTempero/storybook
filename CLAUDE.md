# Storybook Weddings

## Overview
- **Client**: Storybook Weddings
- **Type**: Static PWA / Business Website
- **Status**: Live
- **Domain**: storybook.nz (GitHub Pages)

## Playbooks In Use
Read these from the Brain folder at session start. Do not copy into this project.
Brain location: `D:/Sidequest Digital/Dev Projects/Brain/`

- `JoelTempero.md` — working profile (always)
- `TokenDiscipline.md` — token cost hygiene (always)
- `CLAUDE-WebsiteInstructions.md` — 13-phase website rebuild workflow
- `DesignSystem.md` — design contract workflow
- `ContentScraping.md` — content extraction workflow
- `SEO.md` — SEO workflow
- `Security.md` — pre-launch security audit
- `Deployment.md` — deployment workflow

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS
- **Backend**: None (static site)
- **Database**: None
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics 4 (G-773S4SHMBD)
- **Other**: PWA (service worker v2, manifest, offline support), Google Fonts (Inter, Cormorant Garamond)

## Build & Dev Commands
- Dev server: Open `index.html` in browser or use any local server (e.g. `npx serve`)
- Build: N/A (no build step)
- Deploy: Push to `main` branch (GitHub Pages auto-deploys)

## Code Conventions
- Custom web components for shared UI (`<site-header>` in `js/components.js`)
- Dark theme (#0A0A0A background)
- Mobile-first responsive design
- CSS split: `styles.css` (main) + `creative-sections.css`
- JS split: `main.js` + `components.js` + `creative-sections.js`
- All scripts use `defer` attribute
- Portfolio images use `loading="lazy"`

## Site Structure
- `index.html` — Home page (hero video, creative sections, contact form)
- `about.html` — About page (team bio, FAQ accordion)
- `portfolio.html` — Portfolio/gallery (mosaic layout, video modals)
- `pricing.html` — Pricing calculator (services, add-ons, quote builder)
- `privacy.html` / `terms.html` — Legal pages (noindex)
- `portal/login.html` — Client portal login (noindex, nofollow)
- `offline.html` — PWA offline fallback
- `robots.txt` / `sitemap.xml` — SEO crawl files

## Current Progress
- Full site live with all core pages
- PWA configured with service worker v2 and manifest
- Client portal login page exists
- Drone videography/photography add-on on pricing page (Aorangi Aerials partnership)
- Full SEO implementation: robots.txt, sitemap.xml, canonical URLs, OG/Twitter cards, JSON-LD schemas
- GA4 tracking on all public pages
- Performance: deferred scripts, lazy-loaded images, noindex on legal/portal pages

## Next Steps
- [ ] Verify Google Search Console ownership and submit sitemap
- [ ] Create proper 1200x630px OG share image with logo/CTA overlay (Canva)
- [ ] Optimise large images (convert PNGs to WebP — filmstrip, heights-groom, testimonials)
- [ ] Expand client portal beyond login page
- [ ] Consider blog/content marketing for organic traffic (e.g. "Best wedding venues in Canterbury")

## Session Log
### 2026-03-15
- Initial project scan and CLAUDE.md created
- Added drone videography/photography add-on to pricing (slider for 1-5 locations, AA logo)
- Implemented SEO phases 1-4: robots.txt, sitemap.xml, canonicals, OG/Twitter cards, JSON-LD (LocalBusiness, FAQ, Breadcrumbs), defer scripts, lazy loading, noindex on legal pages
- Added GA4 tracking (G-773S4SHMBD) to all public pages
- Set portfolio-01.jpg as social share image, expanded OG descriptions
- Fixed service worker (removed dead page refs, added missing assets, bumped to v2)

## Key Decisions
- Static site with no build tools — keeps deployment simple via GitHub Pages
- PWA approach for mobile install capability
- Drone add-on uses slider (1-5 locations) rather than checkboxes for cleaner UX
- Using portfolio-01.jpg as OG share image (not perfectly sized at 2244x1496 but works; proper 1200x630 version is a future task)
- Legal pages (privacy, terms) and portal set to noindex to save crawl budget
- JSON-LD LocalBusiness schema includes Christchurch geo coordinates and service catalog with pricing

## Known Issues
- OG share image is 2244x1496 instead of recommended 1200x630 (platforms auto-crop, but a purpose-built image would be better)
- Google Search Console not yet verified/sitemap not yet submitted
