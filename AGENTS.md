# AGENTS.md

Instructions for AI coding agents working in this repository. Read this before editing.

## Project overview

- Static, single-page portfolio for Casper Spur (`casper.dev`) with a dark
  terminal / "hacker" aesthetic (grid, scanlines, acid-green accents).
- Pure vanilla HTML, CSS and JavaScript. No build step, no package manager,
  no framework, no dependencies.
- Core files:
  - `index.html` — all page content and structure.
  - `style.css` — all styling, in the numbered sections listed in the comment
    block at the top of the file.
  - `script.js` — interaction layer: menu, typing, reveal, year, copy-email, CV.
  - `cv.json` — single source of truth for the Journey and Education timelines.
- Reference docs (context, not rules): `handoff.md` (repo snapshot, may go stale),
  `newideas.md` (Danish ideas list), `rebuild-prompt.md` (detailed 1:1 spec in
  Danish). This file is authoritative when they disagree.
- External assets are CDN-only: Google Fonts (DM Mono, Space Grotesk) and one
  Unsplash image. Keep them as remote URLs; there is no local asset pipeline.
- Preview: serve the folder over HTTP (e.g. `python -m http.server 8000`).
  Opening `index.html` directly shows layout, but `fetch('cv.json')` is blocked
  on `file://`, so both timelines will show an error message.

## Rules of engagement

- Preserve existing uncommitted work; never revert or overwrite changes you
  did not make.
- Do not commit, stage or push unless explicitly asked.
- Personal details (name, email, phone, job history, links) are authoritative —
  ask before changing them. The education entries in `cv.json` still contain
  placeholders; flag them rather than inventing details.

## HTML

- Use 2-space indentation and semantic elements (`header`, `main`, `section`,
  `article`, `footer`).
- Keep the navigation anchors: `#top`, `#about`, `#interests`, `#journey`,
  `#education`, `#contact`.
- Preserve accessibility attributes: skip link, `aria-label`, `aria-expanded`,
  `aria-controls`, `aria-live="polite"`, `role="status"`, `aria-busy` on the
  timelines, `aria-hidden` on decorative elements, and image `alt` text.
- `script.js` is loaded with `defer` in `<head>` — keep it that way.

## CSS

- Follow the numbered section layout in `style.css`; update the contents comment
  when adding or reordering sections.
- Reuse design tokens in `:root`. Use `var(--ink)`, `var(--acid)`, etc. for solid
  colors and the paired `*-rgb` tokens for alpha, e.g.
  `rgba(var(--acid-rgb), 0.08)`. No hard-coded colors.
- Use lowercase hyphenated class names (`terminal-card`, `button-primary`,
  `is-open`).
- Mobile-first: base styles, then `@media (min-width: 700px)`,
  `(min-width: 1000px)`, one `(max-width: 699px)` override, then
  `prefers-reduced-motion`.
- Preserve the `.reveal` / `.visible` animation contract used by `script.js`.

## JavaScript

- Keep the constants block at the top (`TYPING_SPEED_MS`, `TYPING_START_DELAY_MS`,
  `REVEAL_THRESHOLD`, `TYPED_COMMAND`, `CV_DATA_URL`, `CV_SECTIONS`).
- One `init*` function per concern; call them at the bottom of the file.
- Use `byId` / `createNode` helpers and guard clauses (`if (!element) return;`)
  so each init is safe when its markup is absent.
- `initCv()` reads `cv.json`; section-to-data mapping lives in `CV_SECTIONS`.
  Dynamically rendered items must be registered with `observeReveal()`.
- Keep everything framework-free in a single file; no modules or bundler.

## Verification

- `node --check script.js`
- Serve over HTTP and confirm both timelines render and `aria-busy` ends as `false`.
- Check the reduced-motion path (typing shows immediately, no reveal transitions).
