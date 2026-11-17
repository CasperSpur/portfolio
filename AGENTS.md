# AGENTS.md

## Shape & sources

- Static, single-page portfolio for Casper Spur (`casper.dev`) with a dark terminal aesthetic. Vanilla HTML/CSS/JS only: no build step, package manager, framework, or dependencies.
- `index.html` holds all content; `style.css` all styling; `script.js` all interactions; `cv.json` is the only data source for the Journey and Education timelines.
- `handoff.md`, `newideas.md`, and `rebuild-prompt.md` are background docs (Danish ideas / a 1:1 reproduction spec). Treat them as context, not rules; `handoff.md` is a snapshot and may be stale. This file wins on conflict.
- Fonts and the Unsplash image are CDN URLs only; keep them remote — there is no local asset pipeline.

## Non-obvious wiring

- Serve over HTTP (`python -m http.server 8000`); `file://` blocks `fetch('cv.json')`, so both timelines show an error instead of content.
- Nav anchors are `#top`, `#about`, `#interests`, `#journey`, `#education`, `#contact` — `./experience` points to `#journey`. Keep those ids and keep `<script src="script.js" defer>` in `<head>`.
- `CV_SECTIONS` in `script.js` maps `experience-list`/`experience` (`company`, `role`) and `education-list`/`education` (`institution`, `degree`). Any dynamically rendered `.reveal` item must be registered with `observeReveal()`.
- `style.css` uses 13 numbered sections listed in its top comment; update that comment when adding/reordering. Use `:root` tokens; alpha colors use paired `*-rgb` tokens (`rgba(var(--acid-rgb), 0.08)`), not hard-coded colors. Classes are lowercase-hyphenated; HTML uses 2-space indentation.
- Preserve the `.reveal` → `.visible` scroll contract, the single `max-width: 699px` override, the 700px / 1000px min-width order, and all `prefers-reduced-motion` handling.
- Keep `script.js` single-file and framework-free: constants at top, one `init*` per concern, `byId`/`createNode` helpers with guard clauses, inits called at the bottom.

## Do not change casually

- Personal details (name, email, phone, job history, links) are authoritative — ask before changing. `cv.json` education still has `Example University`, `Example College`, and `PLACEHOLDER` text; flag it, never invent replacements.
- Preserve accessibility hooks: skip link, `aria-label`, `aria-expanded`/`aria-controls`, `aria-live="polite"`, `role="status"`, `aria-busy` on both timelines, image `alt`, and `aria-hidden` on decorative elements.

## Verification

- No package scripts, CI, or test suite. Run `node --check script.js`.
- Serve over HTTP and confirm both timelines render and each container ends with `aria-busy="false"`.
- With reduced motion on: typed command appears immediately, reveal transitions and cursor blink are disabled.
