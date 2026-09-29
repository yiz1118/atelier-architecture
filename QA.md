# ATELIER NORTH — QA record

Verified on 29 September 2026 against the local **production build** at `http://localhost:3204`, including the creator/contact integration. The Lighthouse measurements below were taken on 28 September, before the icon and creator updates; they were not repeated for this integration.

This is a fictional **Concept Project**. The studio, five project studies, locations, dates, plans, editorial articles and AI-generated photographs are conceptual content. The enquiry is a local demonstration.

## Build and checks

| Check | Result |
| --- | --- |
| `npm run lint` | Passed; no ESLint errors |
| `npm run typecheck` | Passed; no TypeScript errors |
| `npm run build` | Passed; Next.js production build completed |
| `npm test` | Passed; 14 browser tests, 0 failures, 0 skipped, 0 flaky |
| Creator configuration post-test | Passed; 2 tests covering null/configured portfolio URLs and encoded contact context |
| `npm run test:creator` | Passed; 15 checks across five browser/device profiles |
| Creator layout comparison | Passed; 0 sampled core layout/style changes across 48 page/width combinations |
| `npm run test:icons` | Earlier icon verification passed 10 checks across five profiles; both icon tests also pass in the current main Chrome suite |
| Screenshot post-test step | Passed; full-page captures and cover crops saved |
| `npm audit` | Earlier project verification reported 0 known vulnerabilities; not repeated for the creator integration |

Build ID: `qC5tNcMYkToK3JbGlNCh0`.

Environment: Windows, Node.js 24.13.0, Next.js 16.3.6, React 19.3.0, TypeScript 6.0.3, Tailwind 4.3.3, installed Google Chrome through Playwright. The final main browser suite completed in 52.3 seconds. Machine-readable results are in [browser-results.json](qa/browser-results.json). The [icon consistency audit](ICON-CONSISTENCY-QA.md) records the earlier symbol matrix and visual comparison. The [creator integration record](CREATOR-INTEGRATION.md) explains the new contact layer and its verification.

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

The original studio footer now leads into a separate creator colophon with **Independent Concept Project**, **Designed & developed by Alson Chua**, his professional title, Malaysia/worldwide location and freelance availability. It is present on all routes through the shared footer; the creator suite explicitly checks eight representative content routes and the designed 404 page.

**Start a Project** opens a native disclosure with both WhatsApp and Email. Tests verify the exact configured destinations, properly encoded project-specific message/subject/body, LinkedIn and GitHub links, external-link attributes, SVG icons and future tracking identifiers. The studio CTA still leads to the fictional enquiry demonstration. Personal information is centralized in `config/creator.ts`, including the author metadata.

With `creator.portfolioUrl: null`, no portfolio link is rendered. Two configuration tests verify both that absent state and the automatic appearance of a configured URL, plus contact generation after profile/project changes.

The dedicated creator matrix passed **15 checks** across Windows Chrome, Windows Edge, WebKit desktop, iPhone WebKit emulation and Android Chrome emulation. Each profile checks **375, 390, 430, 768, 1024 and 1440px**. Controls meet the 44px minimum height, contact text is unclipped, no horizontal overflow is detected, keyboard/touch disclosure operation and visible focus pass, and Axe reports zero creator-section violations. The matrix completed in 56.2 seconds with no failures, skips or flaky results: [browser-matrix.json](qa/creator/browser-matrix.json).

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

This numbered project is an independent application with its own dependencies, configuration and QA commands. The parent portfolio's TypeScript and ESLint exclusions were updated only for this project's directory. Verification confirmed that the parent compiler includes zero files from this project and that its linter ignores this project's source path.

Broad parent checks remain independently failing because other numbered projects are included by the parent's configuration and produce unrelated generated-file/module errors. Those sibling applications were not modified. The passing results above apply to this standalone architecture site.

The site has not been deployed or tested on a physical device, native macOS/iOS Safari or Firefox. WebKit engine and device-emulation checks run on Windows. Real creator destinations and prefilled text have been validated locally without sending email or WhatsApp messages or checking third-party account availability. No email provider, backend, analytics collector, persistent studio enquiry storage or real studio credentials are configured. Before any future deployment, configure `NEXT_PUBLIC_SITE_URL` with the public origin and repeat checks on that deployed environment.
