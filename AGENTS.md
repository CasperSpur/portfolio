\# AGENTS.md



Instructions for AI coding agents working in this repository.



\## Project overview



\- Static, single-page personal portfolio for Casper (casper.dev) with a

&#x20; terminal / "hacker" aesthetic (dark theme, acid-green accents, scanlines).

\- Pure vanilla HTML, CSS, and JavaScript. No build step, no package manager,

&#x20; no framework, no dependencies to install.

\- Files:

&#x20; - `index.html` — all page content and structure (hero, about, interests,

&#x20;   timeline, contact, footer).

&#x20; - `style.css` — all styling, organized into numbered sections listed in the

&#x20;   comment block at the top of the file.

&#x20; - `script.js` — small interaction layer: mobile menu, terminal typing,

&#x20;   scroll reveal, footer year, copy-email button.

\- External assets loaded via CDN: Google Fonts (DM Mono, Space Grotesk) and

&#x20; one Unsplash image. Keep these as remote URLs; there is no local asset

&#x20; pipeline.

\- To preview locally, just open `index.html` in a browser (or serve the

&#x20; folder with any static file server).



\## Code style \& conventions



\### HTML

\- Use 2-space indentation and semantic elements (`header`, `main`, `section`,

&#x20; `article`, `footer`).

\- Keep the `id` anchors that navigation links target (`#top`, `#about`,

&#x20; `#interests`, `#journey`, `#contact`).

\- Preserve accessibility attributes: `aria-label`, `aria-expanded`,

&#x20; `aria-controls`, `role="status"`, the skip link, and `alt` text on images.

\- `script.js` is loaded with `defer` in `<head>` — keep it that way.



\### CSS

\- Follow the numbered section layout in `style.css` and update the contents

&#x20; comment block when adding/reordering sections.

\- Define and reuse design tokens in `:root`; avoid hard-coded colors — use

&#x20; `var(--ink)`, `var(--acid)`, `var(--orange)`, `var(--night)`, etc.

\- Use lowercase hyphenated class names (BEM-like, e.g. `terminal-card`,

&#x20; `button-primary`, `is-open`).

\- Layout is written mobile-first: base styles, then `@media (min-width: 700px)`

&#x20; and `(min-width: 1000px)`, plus a single `(max-width: 699px)` override.

\- Preserve `prefers-reduced-motion` handling and the `.reveal` / `.visible`

&#x20; animation contract used by `script.js`.



\### JavaScript

\- Keep the `init\*` function-per-concern pattern and the constants block at the

&#x20; top for tunable values (typing speed, thresholds, typed command).

\- Use the `byId` helper and guard clauses (`if (!element) return;`) so each

&#x20; init is safe when its markup is absent.

\- Keep everything framework-free in a single file; no modules or bundler.



\### Content

\- Treat personal details (name, email, phone, job history, links) as

&#x20; authoritative — don't invent or change them without asking.

