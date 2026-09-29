# ATELIER NORTH

A fictional architecture and interiors studio website built as a **Concept Project** for a design portfolio. The studio, projects, articles, locations, plans and photographs are conceptual work.

## Run locally

Use Node.js 22.19 or newer; Node.js 24 is recommended. The application itself supports Next.js's Node.js 20.9 minimum, while the included Lighthouse QA tooling requires 22.19 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For a production preview:

```bash
npm run build
npm run start
```

If deployed, set `NEXT_PUBLIC_SITE_URL` to the public origin so social image URLs resolve correctly. No credentials, email provider or database are required.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test:icons
npm run test:creator
npm run test:creator-config
```

The browser suite starts the production server on port 3204 and uses installed Google Chrome. It checks route availability, image loading, interactions, responsive overflow, selected accessibility rules and portfolio screenshots.

The dedicated icon suite additionally checks Chrome, Edge, WebKit desktop, iPhone WebKit emulation and Android Chrome emulation at 375, 390, 430, 768, 1024 and 1440 pixels. Install the WebKit browser once with `npx playwright install webkit` before running that matrix. See `ICON-CONSISTENCY-QA.md` for the symbol audit and before/after evidence.

The creator suite uses the same five profiles to check credit, contact destinations, keyboard/touch interaction, focus, accessibility and overflow at all six widths. `npm test` also runs the two creator configuration tests after the main browser suite, then refreshes portfolio cover images.

For the performance audit, keep a production server running on port 3204 in one terminal, then use another terminal:

```bash
npm run audit:performance
```

The audit saves desktop and mobile HTML/JSON reports under `qa/`. It primes the server's image conversion cache before measuring a fresh browser navigation with Lighthouse network simulation. Its dedicated Chrome profiles remain under ignored `qa/.profiles/` to avoid Windows temporary-profile cleanup errors. `AUDIT_ORIGIN` can select another local production server.

`node scripts/responsive-review.mjs` creates visual review sheets for the six requested widths against the running production server. See `QA.md` for the verified results and limitations.

## Content and assets

Typed content in `content/` drives the five project studies, three journal articles and four service areas. Fifteen optimized WebP images are in `public/images/`. `ASSET-PROVENANCE.md` describes their origin, and `CASE-STUDY.md` explains the design decisions. `screenshots/` contains captures from the production build and a screenshot index.

The enquiry form is an honest demonstration. It validates locally and does not send or save entered information.

## Creator and freelance contact

The ruled creator colophon beneath the original studio footer identifies this as an independent concept project designed and developed by Alson Chua. Its **Start a Project** control reveals real WhatsApp and email choices. LinkedIn and GitHub are separate profile links. The fictional studio enquiry remains a local demonstration.

Update personal details in **`config/creator.ts`**. The same file supplies the creator credit, real contact destinations, prefilled messages and author metadata. `conceptProject.name` controls the project context in the contact messages.

`creator.portfolioUrl` is currently `null`, so no portfolio link is rendered. When the main portfolio is live, replace `null` with its full HTTPS URL and rebuild/restart the production application. **View Portfolio** will then appear automatically; no component edit is needed.

The layer adds no client JavaScript or analytics package. Semantic `data-analytics-event` identifiers are ready for future tracking. See [CREATOR-INTEGRATION.md](CREATOR-INTEGRATION.md) for implementation, event names and verification evidence. With the production server running, `node scripts/creator-review.mjs` refreshes the six creator review sheets and compares core layout metrics against the saved pre-integration baseline.
