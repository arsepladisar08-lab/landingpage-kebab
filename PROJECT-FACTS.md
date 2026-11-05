# Project Facts — Kebab Al Firdaus

## Confirmed business positioning

The business owner confirmed that the principal sales focus is **ready-to-eat kebab for consumers**. Kebab ingredients / wholesale and event orders are **additional services**, not the main positioning.

## Primary menu in the supplied ZIP reference

The supplied ZIP presents four main ready-to-eat kebab variants:

1. Kebab Original
2. Kebab Keju
3. Kebab Pedas
4. Kebab Komplit

The reference also presents Roti Maryam as an additional snack. The current availability of all menu items, ingredients, sizes, and variants should be confirmed with the owner.

## Additional services

- Kebab ingredients / wholesale enquiries for small food businesses, sellers, and resellers.
- Larger kebab orders for gatherings, family events, and other occasions.

The exact wholesale catalogue, unit sizes, minimum order, event availability, event lead time, and service area are not confirmed in the source data.

## Audience and conversion strategy

- Primary audience: consumers looking to buy ready-to-eat kebab.
- Primary conversion: choose one of the four kebab varieties and continue the order through WhatsApp.
- Secondary audience: kebab sellers / small food businesses seeking supplies.
- Secondary conversion: consultation for wholesale ingredients.
- Additional service conversion: discuss event date, estimated quantity, and delivery / pickup details.

## Design direction from the supplied ZIP

- Visual character: editorial local-food storefront with a strong charcoal hero, warm paper surfaces, lime accents, and orange details.
- Typography: Manrope display and DM Sans body.
- Hero: “Gigit hangatnya. Nikmati rasanya.” with a CSS kebab composition.
- Menu cards: four illustrated kebab variants, tags, short descriptions, and direct order actions.
- Order flow: quick modal with product selection, quantity stepper, WhatsApp preview, and conditional fields for wholesale / events.
- Responsive layout: mobile-first navigation, stacked content, and a scrollable order sheet/modal.
- Menu SVGs are illustrations; they are not verified product photographs.

## Data retained from project references — owner verification required

- WhatsApp number: +62 838-3036-1617.
- Address: Jl. Bali No.13 Blok O, Medaeng Kulon, Kedungturi, Taman, Sidoarjo 61257.
- Hours in supplied ZIP: Senin–Sabtu 06.00–21.00; Minggu 06.00–18.00.
- Public-directory rating in supplied ZIP: 4.6 / 5 from 57 reviews.

These values are retained from the supplied ZIP / prior project data, not newly confirmed by the owner in this conversation. Validate them before using them as definitive current business information.

## Unknowns / owner confirmation required

- Current official WhatsApp number.
- Exact street address and Google Maps pin.
- Official operating hours.
- Approved retail price list and active kebab variants.
- Ingredients, portion sizes, and current Roti Maryam availability.
- Wholesale product list, packaging units, wholesale prices, and MOQ.
- Event service scope, available dates, capacity, and ordering lead time.
- Delivery / pickup rules, service area, payment methods, and delivery rates.
- Original product and packaging photographs.

## Implementation decisions

- Preserve React + Vite + TypeScript.
- Use a kebab-first home page and primary menu cards.
- Keep wholesale and event paths visually subordinate as additional services.
- Use a single mode-aware modal with different quantities / fields for ready-to-eat kebab, snacks, wholesale, and events.
- Build prefilled WhatsApp message content client-side; the app does not persist customer data on a server.
- Centralize products and business information in `src/data/content.ts`.
- Do not invent prices or imply that reference illustrations are real product photos.
