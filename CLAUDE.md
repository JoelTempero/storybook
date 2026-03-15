# Storybook Weddings

## Overview
- **Client**: Storybook Weddings
- **Type**: Static PWA / Business Website
- **Status**: Live
- **Domain**: storybook.nz (GitHub Pages)

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JS
- **Backend**: None (static site)
- **Database**: None
- **Hosting**: GitHub Pages
- **Other**: PWA (service worker, manifest, offline support), Google Fonts (Inter, Cormorant Garamond)

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

## Site Structure
- `index.html` — Home page (hero video, sections)
- `about.html` — About page
- `portfolio.html` — Portfolio/gallery
- `pricing.html` — Pricing packages
- `privacy.html` / `terms.html` — Legal pages
- `portal/login.html` — Client portal login
- `offline.html` — PWA offline fallback

## Current Progress
- Full site is live with all core pages
- PWA configured with service worker and manifest
- Client portal login page exists

## Next Steps
- [ ] Review and identify any improvements or new features needed
- [ ] Check portal functionality and expand if needed

## Session Log
### 2026-03-15
- Initial project scan and CLAUDE.md created

## Key Decisions
- Static site with no build tools — keeps deployment simple via GitHub Pages
- PWA approach for mobile install capability

## Known Issues
- Untracked file: `assets/images/AA.avif` (not yet committed)
