# ATELIER NORTH — QA record

## Motion polish — 30 September 2026

The motion update was verified against the local production build at `http://localhost:3204` (build ID `HWq4smi9Yb8PvGbA3YO2y`). The detailed direction, timing and reproduction commands are in [MOTION-POLISH.md](MOTION-POLISH.md). The project remains a fictional Concept Project with a local-only studio enquiry and a separate real creator contact layer.

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; all known routes produced by the Next.js production build |
| `npm run test:motion` | 20/20 passed across Chrome, Edge, desktop WebKit, iPhone WebKit emulation and Android Chrome emulation; the final reduced-motion hover adjustment also passed 5/5 targeted checks |
| `npm test` | 18/18 browser checks passed; 2/2 creator configuration tests passed in the post-test step; portfolio screenshots refreshed |
| Responsive motion checks | Eight representative routes at 375, 390, 430, 768, 1024 and 1440px in each browser profile; no horizontal overflow or active-visit console/page errors |
| Core presentation comparison | Fourteen routes at the same six widths; zero sampled changes in text, header/headings/images/footer geometry, typography, color or spacing within the 0.5px tolerance |
| Accessibility and fallback | Reduced-motion preference works when changed live; linked image focus exposes imagery; content remains visible without JavaScript; the main suite’s Axe scans passed |
| Image and interaction checks | Opening images are immediately visible; selected loaded images reveal once; menu navigation remains immediate; hovering arrows does not resize links |

The motion matrix record is [browser-matrix.json](qa/motion/browser-matrix.json), and the saved geometry comparison is [layout-differences.json](qa/motion/layout-differences.json). The desktop mask’s early, middle and settled states were visually reviewed in [image-reveal-review.png](qa/motion/image-reveal-review.png). The [mobile menu capture](qa/motion/menu-mobile.png) and [home captures](qa/motion/home-mobile.png) were also inspected. Existing full-page portfolio captures in `screenshots/` were refreshed by the passing regression suite.

The local Lighthouse 13.5.0 audit used a production server, warmed image conversion and fresh browser navigations with simulated desktop/mobile conditions. Scores are lab measurements, not field Core Web Vitals:

| Measure | Pre-polish desktop | Motion desktop | Pre-polish mobile | Motion mobile |
| --- | ---: | ---: | ---: | ---: |
| Performance | 100 | 100 | 95 | 96 |
| Accessibility / best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 |
| Largest contentful paint | 0.7 s | 0.6 s | 2.8 s | 2.8 s |
| Total blocking time | 0 ms | 0 ms | 40 ms | 20 ms |
| Cumulative layout shift | 0.007 | 0.007 | 0.017 | 0.017 |

Complete [desktop](qa/lighthouse-desktop.html) and [mobile](qa/lighthouse-mobile.html) reports are retained, alongside the [pre-polish desktop](qa/motion/before-lighthouse-desktop.json) and [pre-polish mobile](qa/motion/before-lighthouse-mobile.json) JSON baselines. The small timing differences across runs are normal lab variation; the score and layout-shift comparisons are the meaningful performance gate here.

Desktop WebKit and phone profiles were emulated on Windows. No physical iPhone/Android or native macOS Safari device was tested. No deployment or remote push is covered by this local QA record.

## Creator/contact audit — 29 September 2026

Verified on 29 September 2026 against the local **production build** at `http://localhost:3204`, including the creator/contact integration. The Lighthouse measurements below were taken on 28 September, before the icon and creator updates; they were not repeated for this integration.

This is a fictional **Concept Project**. The studio, five project studies, locations, dates, plans, editorial articles and AI-generated photographs are conceptual content. The enquiry is a local demonstration.

## Build and checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed; no ESLint errors |
| `npm run typecheck` | Passed; no TypeScript errors |
| `npm run build` | Passed; Next.js production build completed |
| `npm test` | Earlier integration run passed 14 browser tests, 0 failures, 0 skipped, 0 flaky; not rerun for this audit |
| `npm run test:creator-config` | Passed again; 2 tests covering null/configured portfolio URLs and encoded contact context |
| `npm run test:creator` | Passed; 15 checks across five browser/device profiles |
| Creator layout comparison | Passed; 0 sampled core layout/style changes across 48 page/width combinations |
| `npm run test:icons` | Earlier icon verification passed 10 checks across five profiles; both icon tests also passed in the earlier main Chrome suite |
| Full-page screenshot post-test step | Earlier integration run passed; the current audit refreshed creator/footer review captures separately |
| `npm audit` | Earlier project verification reported 0 known vulnerabilities; not repeated for the creator integration |

Build ID for the 29 September creator audit: `-nyTNM0MDxMtKSnsHkU78`.

Environment: Windows, Node.js 24.13.0, Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, Tailwind 4.3.3, installed Google Chrome through Playwright. The earlier main browser suite completed in 52.3 seconds; its retained machine-readable results are in [browser-results.json](qa/browser-results.json). The [icon consistency audit](ICON-CONSISTENCY-QA.md) records the earlier symbol matrix and visual comparison. The [creator integration record](CREATOR-INTEGRATION.md) explains the contact layer. This audit reran lint, type checking, production build, configuration tests, the creator browser matrix and creator visual/layout review.

## Routes and content

The browser suite opened all fourteen content routes, checked an HTTP 200 response, one primary heading, a page title, and successfully decoded photographs. No browser console errors or uncaught page errors were detected during that route sweep.

- Home, Projects, Studio, Services, Journal and Contact.
- Five individual projects: Coastal House, Courtyard Residence, Gallery Hotel, North Light Apartment and Urban Pavilion.
- Three individual journal articles: The Shape of Daylight, Materials That Acquire Character and The Quiet Threshold.

Unknown project, article and general routes returned HTTP 404 with the designed missing-page interface. Project studies include concept facts, three image views, materials, an original diagrammatic plan, a contextual enquiry link and next-project navigation.

## Interaction checks

- All five project filter states produced the expected results: all five studies, two residential, one hospitality, one interior and one commercial.
- Project cards, next-project navigation and journal links worked. Direct filter query parameters also selected the expected category.
- All four discipline query values preselected the enquiry category. A project-specific enquiry showed the originating study.
- Required-field and invalid-email validation displayed an error, focused the first invalid field and preserved already entered values.
- A completed enquiry displayed: “Demo enquiry complete. No information has been sent or saved.” The test observed no non-GET/HEAD network requests and no local or session storage entries.
- Keyboard navigation reached and completed every enquiry field. The skip link received focus and moved to the main content anchor.
- The mobile menu opened, closed on selection, and closed on Escape with focus returned to its toggle.
- Reduced-motion emulation removed the image transition duration.

## Creator and real freelance contact

The audit found an existing creator system. Every requested capability was already present; no application, configuration, component, style or motion changes were required in this audit. Documentation describing the portfolio as unset was corrected, and QA records/captures were refreshed.

| Requested capability | Audit result |
| --- | --- |
| Central creator configuration | Present in `config/creator.ts`; real details are imported by components |
| Name and professional title | Alson Chua; Independent Web & App Developer |
| Concept status | Independent Concept Project |
| Creator/contact section | Shared footer, near the bottom of every page |
| Location and availability | Malaysia/worldwide location and freelance availability displayed |
| View Portfolio | Exact configured live portfolio URL, safe external link and SVG arrow |
| Start a Project | Native disclosure offering both WhatsApp and Email |
| Email and WhatsApp | Configured addresses and encoded ATELIER NORTH context |
| LinkedIn and GitHub | Configured profile URLs, safe external navigation and SVG arrows |
| Fictional studio CTA | Original `/contact` path preserved and distinct from creator contact |

The original studio footer now leads into a separate creator colophon with **Independent Concept Project**, **Designed & developed by Alson Chua**, his professional title, Malaysia/worldwide location and freelance availability. It is present on all routes through the shared footer; the creator suite explicitly checks eight representative content routes and the designed 404 page.

**Start a Project** opens a native disclosure with both WhatsApp and Email. Tests verify the exact configured destinations, properly encoded project-specific message/subject/body, LinkedIn and GitHub links, external-link attributes, SVG icons and future tracking identifiers. The studio CTA still leads to the fictional enquiry demonstration. Personal information is centralized in `config/creator.ts`, including the author metadata.

`creator.portfolioUrl` now points to `https://alson-portfolio-nine.vercel.app/`, and the creator section shows **View Portfolio** with the existing SVG arrow. Two configuration tests still verify the conditional behavior for both an absent URL and a configured URL, plus contact generation after profile/project changes. The served production homepage includes the exact portfolio destination, while the studio's original `/contact` CTA remains separate.

The dedicated creator matrix was rerun after the portfolio link was enabled and passed **15 checks** across Windows Chrome, Windows Edge, WebKit desktop, iPhone WebKit emulation and Android Chrome emulation. Each profile checks **375, 390, 430, 768, 1024 and 1440px**. Controls meet the 44px minimum height, contact text is unclipped, no horizontal overflow is detected, keyboard/touch disclosure operation and visible focus pass, and Axe reports zero creator-section violations. The matrix completed in 51.3 seconds with no failures, skips or flaky results: [browser-matrix.json](qa/creator/browser-matrix.json).

The portfolio, GitHub and WhatsApp destinations returned HTTP 200 during this audit. LinkedIn returned HTTP 999 to an automated request, so its exact configured URL and link markup were verified but external profile availability was not confirmed. The email `mailto:` destination and encoded ATELIER NORTH WhatsApp message were checked locally; no message was sent. A source scan found no banned emoji or Unicode arrow interface literals in the application, components or creator configuration.

Before/after core layout measurements cover eight page types at those six widths. Header, primary/editorial headings, editorial images and original footer blocks retain their sampled geometry (within 0.5px), typography, color and spacing: [core-layout-differences.json](qa/creator/core-layout-differences.json) contains zero differences.

Open/closed creator sheets were visually reviewed at every requested width: [375px](qa/creator/review-375.png), [390px](qa/creator/review-390.png), [430px](qa/creator/review-430.png), [768px](qa/creator/review-768.png), [1024px](qa/creator/review-1024.png), [1440px](qa/creator/review-1440.png). Surrounding footer captures are available for [mobile](qa/creator/footer-390.png) and [desktop](qa/creator/footer-1440.png).

## Responsive and visual review

Every content route was checked at **360, 390, 768, 1024, 1440 and 1920 pixels**. None exceeded the viewport by more than the one-pixel rounding allowance. Desktop project introduction widths were also checked to guard against narrow text columns.

Visual review sheets were generated and inspected for all six widths, covering the home opening, projects index, project concept section, studio philosophy, service detail, journal index, article text and contact form. The review confirmed aligned rules, coherent heading wraps, readable text, resolved image crops and the intended mobile stacking.

Review sheets: [360px](qa/responsive-360.png), [390px](qa/responsive-390.png), [768px](qa/responsive-768.png), [1024px](qa/responsive-1024.png), [1440px](qa/responsive-1440.png), [1920px](qa/responsive-1920.png).

## Images and accessibility

All fifteen source photographs are stored locally as optimized WebP files. Next.js provides responsive image variants, preferring AVIF where supported. The image endpoint returned HTTP 200, an image content type and a nonempty image body; Lighthouse network records confirmed AVIF responses. All page photographs reported completed loading with a nonzero natural width after scrolling through each route.

Priority is restricted to opening imagery, with a high fetch priority on the homepage hero. Lower images load lazily. Reserved aspect ratios prevent large layout shifts. Fonts are local, so the site does not depend on a remote font service. See [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md) for image generation records.

Axe scanned eight representative page types and reported **zero automated accessibility violations**. Keyboard enquiry completion, skip navigation, menu Escape behavior, visible focus and reduced motion were checked separately. These checks do not establish complete screen-reader compatibility or certification.

## Lighthouse lab audit

Lighthouse 13.5.0 audited the homepage using the production server, a fresh browser navigation and simulated network/CPU conditions. The script first primed the server's image conversion cache; this is a warm image-server measurement. Dedicated local Chrome profiles were used. This is a local lab result, not field traffic or a physical-device result.

| Metric | Desktop | Mobile |
| --- | ---: | ---: |
| Performance | 100 | 96 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First contentful paint | 0.3 s | 1.4 s |
| Largest contentful paint | 0.5 s | 2.8 s |
| Total blocking time | 0 ms | 20 ms |
| Cumulative layout shift | 0.007 | 0.017 |
| Speed index | 0.3 s | 1.4 s |

Desktop used a 1440 × 900 viewport at device scale 1. Mobile used a 412 × 823 viewport at device scale 1.75. Reports were recorded at 08:47 UTC on 28 September 2026.

View the [desktop HTML report](qa/lighthouse-desktop.html) and [mobile HTML report](qa/lighthouse-mobile.html). Their complete JSON records are also saved in `qa/`. Mobile LCP was 2.8 seconds in this run; field Core Web Vitals have not been measured.

## Portfolio deliverables

The five requested full-page production captures are saved in [screenshots/](screenshots/README.md):

| Capture | File |
| --- | --- |
| Homepage | [homepage-desktop.png](screenshots/homepage-desktop.png) |
| Projects grid | [projects-grid.png](screenshots/projects-grid.png) |
| Individual project | [coastal-house-detail.png](screenshots/coastal-house-detail.png) |
| Mobile homepage | [homepage-mobile.png](screenshots/homepage-mobile.png) |
| Contact | [contact-desktop.png](screenshots/contact-desktop.png) |

Two additional opening crops, `homepage-cover.png` and `mobile-cover.png`, are available for portfolio previews. The [case study](CASE-STUDY.md) covers the requested industry, customer, visual, grid, image, project, mobile and technical decisions.

## Workspace isolation and remaining limits

This audit inspected and modified only the independent `atelier-architecture` project. It has its own dependencies, configuration and QA commands. No sibling portfolio project was modified or included in the checks.

The branch is `backup`, tracking `origin/backup`, and origin is `https://github.com/yiz1118/atelier-architecture.git`. A live `git ls-remote` check before the audit commit showed both remote `backup` and `master` at `d4b691a8f7af66aad3ce178e979a560a5b96ffa0`. Local portfolio activation commit `4f7c13f` was therefore not on either remote branch. This audit does not push commits; use `git status -sb` and `git log` to inspect the final local commit/ahead state.

GitHub's deployment API showed Vercel deployment `6732591816`, environment `Production`, state `success`, for that initial commit. This confirms existing Vercel integration history. The current Vercel production-branch setting could not be verified from the checkout; no local `.vercel/project.json` or `vercel.json` is present. With Git deployment enabled, pushes to the configured production branch trigger production deployment; other branches normally receive previews. See [Vercel Git deployment documentation](https://vercel.com/docs/git). Pushing `backup` alone must not be described as a confirmed production update.

This audit did not verify a deployed ATELIER NORTH site, a physical device, native macOS/iOS Safari or Firefox. WebKit engine and device-emulation checks run on Windows. No email provider, backend, analytics collector, persistent studio enquiry storage or real studio credentials are configured. For a deployed version, configure `NEXT_PUBLIC_SITE_URL` with the public origin and repeat checks on that environment.
