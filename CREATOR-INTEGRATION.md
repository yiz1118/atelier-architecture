# ATELIER NORTH — Creator integration

Implemented and verified on 29 September 2026 against the local production preview at `http://localhost:3204`.

## Presentation and placement

A warm-paper colophon follows the original dark studio footer on every route, including the designed 404 page. It uses the site's existing fonts, colors, grid gutters, thin rules and SVG arrow component. Its three desktop columns identify the independent concept, credit the creator and invite a freelance conversation. Tablet uses a two-column arrangement beneath the concept label; mobile stacks the same content with restrained type sizes.

The original header, navigation, page content, photographs, animation rules and studio footer content retain their existing presentation. The studio's **Discuss a project** link still leads to `/contact`, whose form is a local concept demonstration. The creator's **Start a Project** control offers real contact with Alson Chua.

## Central configuration

`config/creator.ts` is the only implementation source for the creator's name, title, email, location, availability, LinkedIn, GitHub, WhatsApp number/URL and portfolio URL. Components and author metadata import it. The same file contains `conceptProject.name` and `conceptProject.year` for the creator label and message context.

`creatorContactLinks()` derives both contact URLs from that configuration and URL-encodes their text. The WhatsApp message identifies the ATELIER NORTH concept project and asks to discuss a website/app project. The email subject is **Project Inquiry — ATELIER NORTH**, with a short prefilled introduction in the body.

## Contact behavior

**Start a Project** is a native `details`/`summary` disclosure. Activating it reveals WhatsApp and Email together, with a visible phone number and email address. It works with pointer, touch and keyboard without an extra client component. The summary is at least 54px tall; contact rows are at least 68px tall. Profile and portfolio links have a minimum 44px height.

WhatsApp, LinkedIn, GitHub and View Portfolio open in a new tab with `rel="noopener noreferrer"`. Email uses `mailto:` and the visitor's configured email client. All interface arrows use the existing decorative, `currentColor` SVG component. Focus remains visible, and the email can wrap without clipping.

## Portfolio destination

`creator.portfolioUrl` is set to `https://alson-portfolio-nine.vercel.app/`. The creator section therefore shows **View Portfolio**, linking from this concept website to the live main portfolio.

If the address changes, edit that single value in `config/creator.ts`, then run `npm run build` and restart the production server. A configuration test renders the actual component with both a null URL and a configured URL to verify the conditional link behavior.

## Tracking preparation

The creator section has `data-analytics-project="ATELIER NORTH"`. Controls expose the following `data-analytics-event` values; no analytics package or collector was added.

| Interaction | Identifier |
| --- | --- |
| Start a Project disclosure activation | `creator_start_project` |
| Email | `creator_email` |
| WhatsApp | `creator_whatsapp` |
| LinkedIn | `creator_linkedin` |
| GitHub | `creator_github` |
| View Portfolio | `creator_portfolio` |

A future click listener can read the closest event attribute and the enclosing project attribute. The disclosure activation identifier covers both opening and closing; a future handler can check the resulting `details.open` state if only opening should count.

## Verification

- Lint, TypeScript checking and the production build pass.
- The earlier integration run passed the complete 14-test browser suite and refreshed five portfolio captures and two cover crops. This audit reran the two creator configuration tests successfully.
- The dedicated creator matrix passes 15 checks across Windows Chrome, Windows Edge, WebKit desktop, iPhone WebKit emulation and Android Chrome emulation.
- Each profile checks 375, 390, 430, 768, 1024 and 1440px layouts, keyboard or touch activation, focus, control height, unclipped contact text, horizontal overflow and automated accessibility. The creator section reports zero Axe violations.
- Creator status and credit are checked on eight representative content routes plus the designed 404 page. Link destinations, encoded messages, external-link attributes and tracking identifiers are checked without sending a message.
- Before/after metrics for eight page types at six widths show zero changes to sampled core geometry, typography, color and spacing, using a 0.5px geometry tolerance. The sampled elements include the header, page headings, editorial images and original studio footer blocks.
- Creator review sheets at all six requested widths were generated and visually inspected. Desktop and mobile captures include the surrounding studio footer.

Evidence is in `qa/creator/browser-matrix.json`, `qa/creator/before-layout.json`, `qa/creator/after-layout.json` and `qa/creator/core-layout-differences.json`. The paired review images are `qa/creator/review-{width}.png`; creator-only open/closed images and full footer captures are saved in the same directory.

Commands: `npm test`, `npm run test:creator`, `npm run test:creator-config` and, against a running production server, `node scripts/creator-review.mjs`.

The browser matrix runs on Windows with browser engines and device emulation. Physical iPhone, Android and macOS testing was not performed. The portfolio, GitHub and WhatsApp destinations returned HTTP 200 during the audit; LinkedIn returned HTTP 999 to an automated request, leaving external profile availability unconfirmed. Contact destinations and prefilled content were checked without sending email or WhatsApp messages. Runtime verification used the local production preview; the pending local commits are not yet on GitHub. See `QA.md` for remote and Vercel evidence.

## Files

Implementation: `config/creator.ts`, `components/creator-section.tsx`, `components/site-footer.tsx`, `app/globals.css`, `app/layout.tsx`.

Verification and commands: `tests/creator.spec.ts`, `tests/creator-config.unit.ts`, `playwright.creator.config.ts`, `scripts/creator-review.mjs`, `package.json`.

Documentation: `README.md`, `QA.md`, `CASE-STUDY.md`, this record. Review evidence is saved in `qa/creator/`; the regular browser suite refreshes captures in `screenshots/`.
