# Project Facts — Toko Kebab Al Firdaus

## Source-derived positioning
The supplied `kebab-al-firdaus-landingpage.html` frames the business as a shop for kebab ingredients and homemade frozen food from Taman, Sidoarjo, with retail/satuan buying and enquiries for wholesale/resellers.

## Product categories from the supplied HTML
1. Daging kebab frozen
2. Kulit kebab / tortilla
3. Kebab frozen
4. Frozen food
5. Paket kebutuhan usaha
6. Kebutuhan sesuai permintaan

Descriptions deliberately direct customers to confirm current variants, package sizes, stock, storage guidance, and prices with the admin.

## Target audiences from the supplied HTML
- Household consumers
- Kebab shops / warung kebab
- Frozen-food resellers
- Catering and canteen operators
- Event/family needs

## Conversion strategy
- Primary conversion: ask about products or order through WhatsApp.
- Secondary conversion: request wholesale/reseller pricing through a prefilled WhatsApp enquiry form.
- Social discovery: store and product Instagram accounts.
- Location reference: general Taman, Sidoarjo area only; no precise pin claimed.

## Existing project data carried forward
- WhatsApp number in the previous GitHub project: +62 838-3036-1617.
- Treat this as a carried-forward value, not as confirmation from the supplied HTML. The supplied HTML's WhatsApp setting is blank and explicitly asks the owner to enter the official number before launch.

## Unknowns / owner confirmation required
- Current and official WhatsApp number.
- Exact street address and store map pin.
- Official operating hours.
- Current product availability, variants, sizes, ingredients, package weights, prices, and MOQ.
- Whether the shop currently ships beyond Sidoarjo, shipping rates, pickup process, and payment methods.
- Frozen storage instructions, shelf life, and cooking instructions from approved packaging or owner guidance.
- Current product and packaging photos.

## Brand and visual direction from supplied HTML
- Primary palette: deep red, bright yellow, warm off-white, charcoal, and green WhatsApp CTA.
- Typography: Space Grotesk display + DM Sans body.
- Visual tone: bold local-food storefront with neo-brutalist outlines and shadows.
- Original logo extracted from embedded WebP in supplied HTML; product imagery remains placeholders pending real photos.

## Implementation decisions
- Preserve React + Vite + TypeScript structure from repository.
- Convert uploaded single-file HTML into modular React components.
- Use native IntersectionObserver and CSS motion rather than loading GSAP from CDN.
- Keep WhatsApp message/form flow client-side; no server data collection.
- Store content centrally in `src/data/content.ts`.
