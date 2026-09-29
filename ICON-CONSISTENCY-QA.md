# Interface icon consistency audit

Verified on 29 September 2026 against the ATELIER NORTH local production build `q0JNhoMHhqTS82C6FjcFO` at `http://localhost:3204`.

## Root cause and scope

The source audit found **21 Unicode interface arrow sites** in 12 TSX files: 19 diagonal arrows (`↗`) and two left arrows (`←`). Their glyphs were rendered by the local platform font, so Apple devices could select a color emoji representation. The audit found no icon library, emoji variation selector, or arrow-bearing CSS `content` rule. The mobile menu was already drawn with CSS lines; it is now the same custom SVG family. The enquiry select used a browser-native chevron, which is now an SVG to keep the visible icon consistent.

Arithmetic plus signs, form-required asterisks, the copyright symbol and the message placeholder ellipsis remain text because they are typography or content rather than interface icons. No Unicode UI arrow intentionally remains.

## Implementation

All action arrows use the reusable [icon components](components/icons.tsx): `ArrowUpRightIcon` and `ArrowLeftIcon`. `MenuIcon` draws two SVG rules that rotate into a close mark using the existing timing. `ChevronDownIcon` sits over the native enquiry select without intercepting pointer input. The icons use `stroke="currentColor"`, `fill="none"`, transparent backgrounds, `aria-hidden="true"` and `focusable="false"`; their containing links and controls provide the accessible names.

The edit was limited to:

- [app/globals.css](app/globals.css) for icon sizing, menu hit area and select presentation.
- [components/icons.tsx](components/icons.tsx), plus the existing header, footer, project card, section intro and contact form components.
- The home, project detail, studio, services, journal, article and 404 TSX pages that had text arrows.
- [tests/icons.spec.ts](tests/icons.spec.ts), [playwright.icons.config.ts](playwright.icons.config.ts), and [scripts/icon-visual-review.mjs](scripts/icon-visual-review.mjs) for verification.
- Package scripts, README and QA documentation.

No new icon library was installed. The site fonts, palette, photography, page structure, copy and motion timing are unchanged. The dropdown retains its original 48px control height. The mobile menu button remains in the 74px header and has a 44px minimum hit area.

## Browser and viewport checks

`npm run test:icons` passed **10/10 checks** with zero skipped or flaky results across:

| Profile | Engine and device mode | Result |
| --- | --- | --- |
| Windows Chrome | Installed Chrome, desktop | Passed |
| Windows Edge | Installed Edge, desktop | Passed |
| Desktop Safari equivalent | Playwright WebKit 26.6, desktop | Passed |
| iPhone Safari equivalent | Playwright WebKit 26.6, iPhone 13 emulation | Passed |
| Android Chrome equivalent | Installed Chrome, Pixel 7 emulation | Passed |

Each profile visited the 14 content routes and the 404 page at **375, 390, 430, 768, 1024 and 1440 pixels**. The checks found no UI arrow text, emoji variation selectors or arrow-bearing pseudo-elements in rendered content; SVGs inherited the surrounding color, had no colored background, and did not introduce horizontal overflow. They also checked menu touch size, menu open/close, mobile navigation, select interaction, light and dark icon colors, project-card hover and reduced motion. The raw results are in [browser-matrix.json](qa/icon-consistency/browser-matrix.json).

The regular production suite passed **11/11 tests**. Lint, type checking and production build passed after the icon update.

## Before and after review

The original production build was captured before the edit. The same pages and widths were captured after it. Six paired review sheets show links, cards, services, footer, menu, back/next navigation, studio capabilities, dropdown and submit controls:

[375px](qa/icon-consistency/comparison-375.png) · [390px](qa/icon-consistency/comparison-390.png) · [430px](qa/icon-consistency/comparison-430.png) · [768px](qa/icon-consistency/comparison-768.png) · [1024px](qa/icon-consistency/comparison-1024.png) · [1440px](qa/icon-consistency/comparison-1440.png).

A focused [iPhone WebKit and Android Chrome comparison](qa/icon-consistency/mobile-engines.png) shows the rendered card arrow, mobile close mark, dropdown and submit arrow in both engines.

The captured layout data covers every route at each width. It found no change above 0.5px in the monitored page geometry except the intended 2px taller mobile menu hit area. All font and color readings matched. The native dropdown was first observed to become 1.4px shorter during the fix; its height was explicitly restored to 48px before final verification. The detailed measurements are in [layout-differences.json](qa/icon-consistency/layout-differences.json).

WebKit and Android modes are browser emulations running on Windows. This verifies rendering in those engines and device profiles, but does not claim a test on a physical iPhone, Mac or Android handset.
