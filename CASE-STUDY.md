# ATELIER NORTH — Case Study

## Industry

Architecture, interior design and luxury property. The work is aimed at clients making considered decisions about private residences, hospitality spaces and public-facing commercial places.

## Concept Project

ATELIER NORTH is an original, fictional architecture and interiors studio. Its five projects, dates, locations, descriptions, layouts and AI-generated imagery are concept content. The website labels this status in the header, project pages, form and footer.

## Design problem

Architecture is difficult to judge through lists of services alone. A potential client needs to understand the studio's taste, range and process before sharing a project. The website therefore gives work and visual judgment the first impression, then provides a clear route to a qualified enquiry.

## Target customer

Private clients planning a substantial home, hospitality owners shaping a guest experience, and organizations commissioning purposeful commercial or cultural environments. They value proportion, material integrity and a deliberate process over visual novelty.

## Visual philosophy

The design treats the site like an architectural monograph. Warm paper tones, quiet typography, thin rules and measured whitespace support the photographs. Headlines speak in a confident but restrained voice. The "Concept Project" label remains visible without competing with the work.

Manrope carries the headings and body copy; IBM Plex Mono gives captions and project facts a precise register. Both are served locally. A small serif accent in the opening headline adds an editorial note without spreading across the interface.

## Grid system

The desktop composition uses twelve columns within a maximum 1600px content width and 64px side gutters. Tablet moves to an eight-column reading rhythm with 32px gutters; mobile uses four conceptual columns and 20px gutters. Large images span the grid while captions and metadata follow fixed alignment lines. The project gallery alternates broad views with smaller offset images to slow the scroll.

## Image strategy

Fifteen original images were generated with the built-in image generation tool: a context view, spatial view and material detail for each fictional project. Subsequent views used their project's first image as a visual reference to keep geometry and materials consistent. All source assets are local WebP files, typically 124–463 KB. Next.js serves responsive optimized variants, preferring AVIF with a WebP fallback, reserves image space and loads images below the opening viewport lazily. The homepage hero receives priority and an explicit high-priority fetch hint. `ASSET-PROVENANCE.md` records the production source IDs.

## Project presentation

The index filters by discipline. Each project then moves from a full contextual view to concept text, spatial and material imagery, a material palette, a clearly marked diagrammatic plan, project facts and a related enquiry link. The concepts are described as studies, never as commissioned or completed buildings.

## Mobile approach

Mobile retains large images, direct headlines and ruled alignment. The navigation becomes a focused menu; project grids and editorial spreads resolve into single-column sequences. Text remains outside images, and image crops remain legible. The same enquiry path is available without additional steps.

## Technical implementation

The site is a standalone Next.js App Router application with React, TypeScript and Tailwind. Typed local content powers project and journal routes. Known detail pages are pre-rendered; unknown slugs use a designed 404 page. Small client components handle the menu, project filters, image loading transition and local-only form validation. The form deliberately sends and stores nothing, then says so in its confirmation. The site includes semantic content, visible focus styles, alt text, reduced-motion support and page-specific metadata.

A separate creator colophon sits beneath the studio footer. It names Alson Chua, explains the independent concept status and provides real freelance contact through email, WhatsApp and professional profiles. A native disclosure offers both contact choices without adding client JavaScript. One typed configuration supplies personal details and contextual messages; a portfolio link appears only when a URL is configured. The existing studio enquiry and fictional content retain their own purpose.

## What This Demonstrates

- A distinct visual direction for an image-led, high-end industry.
- A cohesive content system across seven page types and multiple case studies.
- Careful image generation, selection, optimization and responsive delivery.
- Conversion design that respects the concept nature of the work.
- Frontend craft across desktop, tablet and mobile with accessible interaction states.
