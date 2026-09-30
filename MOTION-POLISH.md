# ATELIER NORTH — motion polish

Motion review and implementation: 30 September 2026. This work is scoped to the independent ATELIER NORTH concept website.

## Direction and audit

The existing architectural grid, photographs, typography, color palette, content and navigation destinations are retained. Motion introduces selected views at the same measured pace as the project presentation. Body copy, captions, factual content, plans, form fields and footer credit remain immediately readable.

| Finding | Implementation |
| --- | --- |
| Image entrances were tied to loading, often finishing before the image entered view | One-time viewport reveals that wait for the image to load |
| Wide architectural views had the same entrance as smaller thumbnails | A stone-colored vertical mask for the homepage feature, main project gallery view and studio courtyard; smaller views use a fade and gentle scale |
| Section headings appeared abruptly | A short fade and 16px rise on selected editorial headings, with an 80ms offset where the section label provides the reading anchor |
| Link gaps and service/button padding moved on hover | SVG arrow and text transforms keep link bounds and neighboring columns fixed |
| The mobile menu animated its height | Immediate overlay visibility with a short fade, small translation and restrained link staggering |
| Navigation/filter active states felt static | Thin underline transforms retain the original positions and widths |

Opening photographs display immediately. The primary heading moves 12px over 600ms while remaining fully opaque. The page has no loading screen or animation gate. Scroll-linked parallax and continuous decorative motion were omitted to keep the architecture still and the native scroll responsive.

## Motion system

| Moment | Timing / distance |
| --- | --- |
| Opening heading | 600ms; 12px rise; no opacity change |
| Selected section headings | 700ms; 16px rise; optional 80ms offset |
| Project/editorial photographs | 780ms; scale 1.028 to 1; opacity 0 to 1 |
| Selected large desktop views | 900ms; stone mask retracts upward with the image settling beneath it |
| Images at 700px and below | 700ms fade/scale; mask removed |
| Project pairs | At most 80ms offset between the two images |
| Link, filter, service and button feedback | Usually 200ms; arrow travel 3px; service heading travel 4px |
| Mobile menu | 160ms fade; 220ms translation; link offsets of 0–80ms |
| Creator contact choices | 180ms; 4px rise; existing native disclosure |

Automatic entrances use `cubic-bezier(.22, .68, .12, 1)`. Animations use transforms and opacity. Image aspect ratios and all existing layout dimensions are retained. `will-change` is restricted to image reveals while they are entering and is released when they finish. Completed heading and menu animations do not retain a transform layer.

## Implementation and accessibility

`components/reveal.tsx` renders the original semantic heading or element with motion metadata, so it adds no grid wrapper. `components/editorial-image.tsx` supports `settle`, `mask` and `none`, with a short optional delay. Priority images default to `none`.

`components/motion-controller.tsx` uses one IntersectionObserver and a scoped MutationObserver. Content is visible in the server output. Only selected elements below the initial viewport are prepared for animation after hydration. Elements reveal once, loaded images trigger their pending entrance, and filtered project nodes can register as they are inserted. Fast scrolling and jump links release already-passed content. Observers and listeners are removed on route changes/unmount.

Reduced-motion mode removes automatic entrances, image scaling, masks and decorative arrow movement. Changing the preference while a page is open immediately releases waiting elements. Keyboard focus exposes linked imagery immediately. Hover feedback is limited to devices with a fine pointer; touch does not depend on hover. Menu selection and active filter state update immediately, with no delayed navigation.

The creator section keeps Start a Project, Email, WhatsApp, LinkedIn, GitHub and the configured View Portfolio link. Studio enquiry remains separate. Icons continue to use the existing SVG system. No new animation dependency, analytics package, content claim or business integration was introduced.

## Reproduce the review

Build and start the production preview on port 3204, then run:

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test:motion
node scripts/motion-review.mjs
node scripts/motion-capture.mjs
npm run audit:performance
```

The dedicated motion suite uses installed Chrome, Edge and Playwright WebKit, including iPhone and Android emulation. Install WebKit with `npx playwright install webkit` if it is absent. Responsive visits use separate tabs so document replacement does not generate unrelated Next.js prefetch cancellation errors. Console and page errors are monitored throughout each active visit; no application errors are filtered out.

`scripts/motion-review.mjs` compares fourteen routes at 375, 390, 430, 768, 1024 and 1440px with the saved pre-polish baseline. It checks sampled heading, header, image, original footer and creator geometry within 0.5px, as well as fonts, colors, spacing and main content text. Reduced motion removes transient transforms from the comparison.

`scripts/motion-capture.mjs` walks the desktop and mobile homepage, checks the mobile menu route, and captures the desktop feature at 120ms, 500ms and completion. These review frames pause browser animations only inside the capture script. The deployed application is unaffected.

Evidence is stored in `qa/motion/`. See `QA.md` for the completed test counts and before/after Lighthouse measurements. Browser emulation establishes engine compatibility; it does not establish physical iPhone/Android or native macOS Safari verification.
