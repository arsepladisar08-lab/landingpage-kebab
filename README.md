# Toko Kebab Al Firdaus — Landing Page

React + Vite + TypeScript landing page for Toko Kebab Al Firdaus, focused on kebab ingredients, homemade frozen food, and household/wholesale enquiries from Taman, Sidoarjo.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

- Import this GitHub repository into Vercel.
- Framework preset: **Vite**.
- Build command: `npm run build`.
- Output directory: `dist`.
- Root directory: repository root.
- Production branch: `SOWAN` (current default branch).

## Project structure

- `src/App.tsx` — page composition and lightweight reveal behaviour.
- `src/components/` — modular page sections, product cards, wholesale form, navigation, and CTAs.
- `src/data/content.ts` — business details, product categories, steps, and FAQ copy.
- `src/index.css` — red/yellow/green visual system and responsive layouts.
- `public/brand/kebab-al-firdaus-logo.webp` — original logo extracted from the supplied HTML file.
- `index.html` — title, description, social metadata, and Store structured data.

## Business details used

- Business: Toko Kebab Al Firdaus.
- Positioning in the supplied HTML: kebab ingredients and homemade frozen food from Taman, Sidoarjo.
- Public number carried over from the previous repository version: 0838-3036-1617. **Confirm this is the current official WhatsApp before launch.**
- Instagram store: [@tokokebabalfirdaus](https://www.instagram.com/tokokebabalfirdaus/).
- Instagram product: [@kebabalfirdaus](https://www.instagram.com/kebabalfirdaus/).
- The supplied HTML intentionally avoids claiming exact street address, operating hours, prices, delivery coverage, minimum wholesale order, or storage/shelf-life details; this implementation keeps those as confirmation items.

## Content and asset status

- Product categories in the supplied HTML: daging kebab frozen, kulit kebab/tortilla, kebab frozen, frozen food, paket kebutuhan usaha, and custom enquiries.
- Prices are intentionally not shown because an approved price list was not supplied.
- Product cards currently use category illustrations/placeholders. Replace them with original product and packaging photos before publication.
- The original brand logo is used in the hero.
- Wholesale enquiry form creates a WhatsApp message for the user to review and send. It does not store form submissions on a server.

## QA status

- **PASS:** source tree includes React/Vite sections, product and wholesale flows, responsive navigation, accessible field labels, form required-field validation, FAQ disclosure controls, WhatsApp prefilled messages, and reduced-motion handling.
- **NOT TESTED:** browser rendering at physical mobile/desktop devices, live WhatsApp destination, social-profile availability, external link behavior, Lighthouse/Core Web Vitals, and Vercel deployment.
- **NEEDS DATA:** owner confirmation for WhatsApp number, product availability and variants, actual price list, original product/packaging photos, delivery/pickup rules, wholesale minimums, and official address/hours if they are to be displayed.
