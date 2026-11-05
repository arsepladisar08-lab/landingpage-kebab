# Kebab Al Firdaus — Landing Page

React + Vite + TypeScript landing page for Kebab Al Firdaus in Medaeng, Sidoarjo.

## Business positioning

- **Main business:** ready-to-eat kebab for individual and household customers.
- **Additional services:** kebab ingredients / wholesale enquiries and larger orders for events.
- **Additional snack in the supplied reference:** Roti Maryam; current availability must be confirmed with the owner.

The storefront is deliberately kebab-first. The four kebab varieties—Original, Keju, Pedas, and Komplit—are the primary menu cards and primary conversion path. Wholesale and event enquiries are presented as secondary services.

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
npm run preview
```

## Deploy to Vercel

- Import this GitHub repository into Vercel.
- Framework preset: **Vite**.
- Build command: `npm run build`.
- Output directory: `dist`.
- Root directory: repository root.
- Production branch: `SOWAN`.

## Project structure

- `src/App.tsx` — page composition and order-modal state.
- `src/components/` — modular page sections, four-variant kebab menu, mode-aware order modal, navigation, and CTAs.
- `src/data/content.ts` — business details, product variants, WhatsApp message builder, ordering steps, and FAQ copy.
- `src/index.css` — reference-inspired visual system and responsive layouts.
- `index.html` — title, description, social metadata, and restaurant structured data.

## Ordering experience

- Kebab / snack orders use serving or snack quantities.
- Wholesale enquiries use a unit selector and destination area.
- Event enquiries can include event date, estimated servings, and location.
- The summary is prepared client-side and opened in WhatsApp for customer review. The website does not store order form submissions on a server.
- Prices are not shown because an owner-approved price list was not provided.

## Source data and launch checks

Business address, opening hours, WhatsApp number, and public-directory rating displayed or carried in the reference project are **source-derived values, not owner-verified launch data**. Confirm the current official WhatsApp number, exact address, operating hours, public rating/review count, current menu and availability with the owner before final publication.

The menu illustrations are stylized SVG artwork retained from the design reference, not photographs of actual products. Replace or supplement them with owner-approved kebab photos when available. Confirm prices, delivery/pickup rules, wholesale product list and minimums, and event-order capacity before advertising these details.

## QA status

- **PASS:** GitHub Actions TypeScript check (`npm run lint`) and Vite production build (`npm run build`) on the current branch.
- **NOT TESTED:** physical-device browser review, live WhatsApp handoff on customer devices, Lighthouse/Core Web Vitals, and final Vercel deployment.
