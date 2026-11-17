# Handoff — casper.dev portfolio

## What this is

A static, single-page personal portfolio for **Casper Spur** (`casper.dev`) with a dark
terminal / "hacker" aesthetic: grid + scanlines, acid-green accents, monospace labels and
command-style headings. Pure vanilla HTML/CSS/JS — no build step, no dependencies, no
framework. External assets are CDN only (Google Fonts + one Unsplash image); there is no
local asset pipeline.

## Repo state (at handoff)

- Branch: `main`, in sync with `origin/main` (HEAD `d78aaf4`).
- 7 commits total, all authored by Casper Spur between 2026-10-20 and 2026-11-17.
- Untracked files not yet committed:
  - `newideas.md` — Danish-language project summary + 5 expansion ideas and 5 improvement ideas.
  - `rebuild-prompt.md` — detailed Danish prompt for reproducing the site 1:1 in another AI model (useful as a de facto spec of current markup/CSS/JS/data).
- Tracked files: `index.html`, `style.css`, `script.js`, `cv.json`, `AGENTS.md`, `.gitattributes`.

## Commit summary (newest first)

| Commit | Date | Summary |
| --- | --- | --- |
| `d78aaf4` "added a few files" | 2026-11-17 | Largest change (~1,165 insertions). Added `cv.json`, `AGENTS.md`; added Education section and nav links; turned hardcoded timelines into JS-rendered timelines fed by `cv.json`; rewrote `script.js` into six `init*` functions with constants, guard clauses, reduced-motion support and error states; expanded CSS to the numbered 13-section structure with design tokens; added `loading="lazy"`/`decoding="async"` to the image. |
| `12c6e2e` "opencode playtime" | 2026-11-03 | Added OG/Twitter meta and JSON-LD `Person`; added skip link and focus styles; rewrote content from lorem ipsum/generic copy to Casper's actual profile (web communication, AI governance, responsible AI, cybersecurity); added the Journey/Work section with 5 hardcoded timeline entries; added phone number and contact copy; changed typed command to `./thesis --topic ai_governance`; updated coordinates to Copenhagen; added timeline CSS. |
| `625fd62` "small changes" | 2026-10-20 | Rebranded the scaffold from "Alex"/`alex.dev` to "Casper"/`casper.dev`: title, brand, hero intro, terminal prompts, signature path, email and footer. |
| `22a02e8` "Revert 'second file'" | 2026-10-20 | Removed the empty `second file.html` created in the previous commit. |
| `1aacc15` "second file" | 2026-10-20 | Added an empty `second file.html` (immediately reverted). |
| `3dbcad3` "first prompt" | 2026-10-20 | Initial site scaffold: `index.html`, `style.css`, `script.js` with hero, about, interests and contact sections, mobile menu, terminal typing animation, scroll reveal, footer year, copy-email button. ~197 lines. |
| `a33206d` "Initial commit" | 2026-10-20 | Added `.gitattributes` only. |

**Narrative:** scaffold → rebrand to Casper → content/persona rewrite + extra sections →
refactor into a data-driven, documented, accessible codebase. Commit messages are terse, so
the diffs carry the real context.

## Architecture and conventions

- `index.html` — all content/structure. Keep anchor ids: `#top`, `#about`, `#interests`,
  `#journey`, `#education`, `#contact`. `script.js` is loaded with `defer` in `<head>`.
- `style.css` — all styling, organized in numbered sections listed in the comment block at
  the top. Design tokens (`--ink`, `--acid`, `--orange`, `--night`, `--panel`, etc.) in
  `:root`; no hard-coded colors. Mobile-first base + `@media (min-width: 700px)`,
  `(min-width: 1000px)` and one `(max-width: 699px)` override. Preserve
  `prefers-reduced-motion` handling and the `.reveal` / `.visible` contract.
- `script.js` — single framework-free file. Constants block at top; `byId` helper; one
  `init*` function per concern (menu, typing, reveal, year, copy-email, CV load); guard
  clauses so each init is safe when markup is absent.
  - Typing: 75 ms/char after 800 ms; reduced motion shows text immediately.
  - Reveal: `IntersectionObserver`, threshold `0.12`; `observeReveal()` also handles
    dynamically added CV items.
- `cv.json` — single source of truth for the Journey (experience) and Education timelines.
  Section config lives in `CV_SECTIONS` in `script.js`.
- Accessibility to preserve: skip link, `aria-label`, `aria-expanded`, `aria-controls`,
  `role="status"`, `aria-live="polite"`, `aria-busy` on timelines, image `alt`, and
  `aria-hidden` on decorative elements.
- Full rules live in `AGENTS.md` — read it before editing. Personal details (name, email,
  phone, job history, links) are authoritative; do not invent or change them without asking.

## Known issues / gotchas

1. **`cv.json` still has placeholders** — `Example University`, `Example College` and
   several `PLACEHOLDER` lines in the education array, plus a `_note` field. Biggest
   credibility risk before publishing; needs real details from Casper.
2. **"Open index.html" doesn't fully work** — `initCv()` uses `fetch('cv.json')`, which is
   blocked on `file://`. Following the AGENTS.md preview instruction means both timelines
   show an error message. Fix by embedding a JS fallback or documenting that the folder
   must be served over HTTP.
3. **Dead-end links** — all three "inspect interest" cards point to `#contact`; no projects
   or notes pages exist. Copy-email has no plain `mailto:` alternative.
4. **No favicon / social image** — OG/Twitter description and card type are set, but no
   `og:image`/`twitter:image` and no favicon.
5. **Navigation polish** — no active-section highlight (scrollspy); mobile menu doesn't
   close on Escape/outside click; no `scroll-margin-top` for anchor offsets.
6. Untracked docs (`newideas.md`, `rebuild-prompt.md`) contain useful plans/spec but are not
   in git yet — decide whether to commit, ignore, or fold into `AGENTS.md`.

## How to preview

Open `index.html` in a browser for layout and interactions, **or** serve the folder over
HTTP to see CV timelines, e.g.:

```powershell
python -m http.server 8000
# then visit http://localhost:8000
```

## Suggested next steps

1. Replace `cv.json` education placeholders with real information (ask Casper).
2. Resolve the `file://` vs `fetch()` mismatch (fallback data or serve-over-HTTP note).
3. Commit or deliberately discard the two untracked markdown docs.
4. Optional improvements from `newideas.md`: projects section, notes/blog-lite, interactive
   terminal navigation, "currently" widget, print-friendly CV, favicon/social preview, nav
   polish and useful link targets.

## Reference docs

- `AGENTS.md` — repository rules and conventions (authoritative for editing).
- `newideas.md` — Danish summary + prioritized expansion/improvement ideas.
- `rebuild-prompt.md` — 1:1 reproduction spec (tokens, copy, layout values, JS behavior, `cv.json`).
