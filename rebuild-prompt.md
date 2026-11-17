# Prompt til gengivelse af casper.dev

Kopier alt nedenfor og giv det til den anden AI-model.

---

Byg et **1:1 identisk statisk portfolio-websted** ("casper.dev") med en mørk terminal/hacker-æstetik. Brug kun ren HTML, CSS og JavaScript — ingen frameworks, ingen build step, ingen pakker, ingen lokale billeder. Opret præcis fire filer i rodmappen:

- `index.html` — alt indhold og struktur
- `style.css` — al styling
- `script.js` — alle interaktioner
- `cv.json` — data til de to tidslinjer

## 1. Tekniske rammer

- HTML5, `lang="en"`, 2-mellemrums indentation, semantiske elementer (`header`, `main`, `section`, `article`, `footer`).
- I `<head>`: `<meta charset="utf-8">`, viewport, description, Open Graph (`og:title`, `og:description`, `og:type`), `twitter:card`, JSON-LD `Person`, Google Fonts, `<link rel="stylesheet" href="style.css">` og `<script src="script.js" defer></script>` (defer skal bevares).
- Google Fonts via CDN: `DM Mono` vægte 400;500 og `Space Grotesk` vægte 400;500;600;700.
- Én ekstern Unsplash-url til portrait/om-billedet (se nedenfor). Ingen andre assets.
- Siden kan åbnes direkte fra disk, men `cv.json` hentes med `fetch()` — CV-sektionerne viser derfor en fejlbesked hvis mappen ikke serveres over HTTP. Gengiv den adfærd.

## 2. Design tokens (`:root`)

```css
--ink: #f4f1e8;
--muted: #a6a79f;
--acid: #c8f31d;
--orange: #ff7548;
--night: #101411;
--panel: #171d18;
--ink-rgb: 244, 241, 232;
--acid-rgb: 200, 243, 29;
--orange-rgb: 255, 117, 72;
--night-rgb: 16, 20, 17;
--panel-rgb: 23, 29, 24;
--line: rgba(var(--ink-rgb), 0.18);
--grid-line: rgba(var(--acid-rgb), 0.045);
--speed-fast: 0.2s;
--speed-reveal: 0.7s;
--mono: 'DM Mono', monospace;
--sans: 'Space Grotesk', sans-serif;
```

Brug tokens overalt — ingen hard-kodede farver.

## 3. Globalt udseende

- `body`: `background-color: var(--night)` plus 32×32 px gitter lavet af to `linear-gradient`-linjer i `--grid-line`; font `--sans`; `overflow-x: hidden`; `margin: 0`.
- `body::before`: fixed, `inset: 0`, `pointer-events: none`, `z-index: -1`, to radial-glows: `rgba(var(--orange-rgb), .08)` ved 75% 10% (30% radius) og `rgba(var(--acid-rgb), .06)` ved 12% 70% (28% radius).
- `.scanlines`: fixed, `inset: 0`, `z-index: 10`, `opacity: .04`, `background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, var(--ink) 4px)`.
- `.shell`: `width: min(1120px, calc(100% - 40px)); margin-inline: auto`.
- Elementer der "taler terminal" bruger `--mono`: `.brand`, `.site-nav a`, `.eyebrow`, `.hero-meta`, `.terminal-card`, `.section-number`, `.card-index`, `.card-link`, `.about-signature`, `.site-footer`.
- `.accent { color: var(--acid) }`, `.prompt` og `.terminal-prompt { color: var(--orange) }`.
- `html { scroll-behavior: smooth }`.

## 4. Indhold (gengiv den engelske tekst ordret)

**Metadata / JSON-LD:** title `root@casper:~$ whoami`, description "A hacker-style portfolio for Casper, a web communication researcher exploring AI governance, responsible AI, and cybersecurity." JSON-LD: `Person`, navn `Casper Spur`, `jobTitle: "Web Communication Master's Student"`, `email: "casper@casperspur.com"`, `knowsAbout: ["AI governance", "AI ethics", "Cybersecurity", "Web communication"]`.

**Skip link + header:**
- `<a class="skip-link" href="#top">skip to content</a>`, derefter `<div class="scanlines" aria-hidden="true"></div>`.
- `.site-header`: brand-link til `#top` med `aria-label="Casper home"`, indhold `<span class="brand-mark">&gt;_</span><span>casper<span class="accent">.dev</span></span>`.
- `.menu-toggle` (button, `aria-expanded="false"`, `aria-controls="site-nav"`): `<span>menu</span><span class="menu-icon" aria-hidden="true">[=]</span>`.
- `<nav id="site-nav" class="site-nav" aria-label="Main navigation">` med links: `./about`→#about, `./interests`→#interests, `./experience`→#journey, `./education`→#education, `./connect`→#contact.

**Hero (`<main id="top">` → `<section class="hero shell">`):**
- `.hero-copy.reveal`: eyebrow `<span class="prompt">$</span> ./explore --topic ai_governance`; h1 `Building in the<br><span class="accent">in-between.</span>`; intro "I’m Casper — a web communication master’s student turning sharp questions into useful things. Exploring the edges of AI governance, responsible AI, and cybersecurity."; actions: `.button.button-primary` "run about.sh ↘" → #about og `.text-link` "ping me →" → #contact (pile have `aria-hidden="true"`).
- `.terminal-card.reveal` med `aria-label="Terminal status"`:
  - `.terminal-bar`: tre `.terminal-dot`, derefter `.terminal-label` `guest@casper-lab: ~`.
  - `.terminal-body`: `guest@casper-lab:~$ whoami` → output `web_communication_student`; `guest@casper-lab:~$ cat mission.txt` → output `.muted` "make complex things feel possible."; sidste linje `guest@casper-lab:~$ <span id="typing-line"></span><span class="cursor" aria-hidden="true">▋</span>`.
  - `.terminal-stamp`: `STATUS: <span>ONLINE</span>`.
- `.hero-meta.reveal`: `lat 55.6761° N`, `long 12.5683° E`, `available for good problems`.

**Om (`<section id="about" class="section shell about-section">`):**
- `.section-heading.reveal`: `.section-number` `01`, eyebrow `/etc/profile`, h2 `Not your average<br><span class="accent">about me.</span>`.
- `.about-grid`: `.about-image.reveal` med billedet `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1100&q=85`, alt "Close-up of a server rack with blue lights", `loading="lazy"`, `decoding="async"`.
- `.about-copy.reveal`: `.lead` "I like the moment when a black box opens up and the logic inside starts to make sense."; afsnit "My master’s in web communication sits beside an interdisciplinary background in IT support, digital communication, entrepreneurship and process improvement — coordinating across functions, finding where the process breaks, and fixing it."; afsnit "Curiosity is my operating system. I learn by pulling things apart, asking better questions, and building tiny experiments until the signal appears — now pointed at AI governance, responsible AI and cybersecurity, and at how that knowledge gets communicated in hospitals, companies and boardrooms."; `.about-signature`: `<span class="accent">$</span> cat /home/casper/values.txt <span class="signature-line"></span>`.

**Interesser (`<section id="interests" class="section interests-section">` → `.shell`):**
- Heading `02`, eyebrow `processes running`, h2 `Current<br><span class="accent">obsessions.</span>`.
- Tre `.interest-card.reveal`-artikler i `.interest-grid`, hver med `.card-index`, `.card-icon`, `<h3>`, `<p>` og `.card-link` "inspect interest ↗" → #contact:
  1. `01 / 03`, `◈`, "Cybersecurity", "Finding the gap before someone else does. The human layer behind the technical one."
  2. `02 / 03`, `◎`, "Artificial<br>intelligence", "Governance before deployment — asking what makes machines trustworthy, ethical and accountable before they ship."
  3. `03 / 03`, `⌁`, "Vibe coding", "Fast loops, messy sketches, and following the good idea when it suddenly shows up. Building things that feel possible."

**Erfaring (`<section id="journey" class="section shell">`):**
- Heading `03`, eyebrow `/history --verbose`, h2 `Selected<br><span class="accent">work.</span>`.
- `<div class="timeline" id="experience-list" aria-busy="true">` — udfyldes af JS fra `cv.json`.

**Uddannelse (`<section id="education" class="section education-section">` → `.shell`):**
- Heading `04`, eyebrow `/history --academic`, h2 `How I<br><span class="accent">learned.</span>`.
- `<div class="timeline" id="education-list" aria-busy="true">` — udfyldes af JS fra `cv.json`.

**Kontakt (`<section id="contact" class="section contact-section shell">`):**
- `.contact-panel.reveal`: venstre side eyebrow `<span class="prompt">$</span> open_connection --secure` og h2 `Let’s make<br><span class="accent">something interesting.</span>`.
- `.contact-side`: "Have a strange problem, a sharp idea, or a rabbit hole worth exploring? Hospital-based thesis collaborations and AI governance work are very much welcome."; `.contact-phone` med `<a href="tel:+4525365295">+45 25 36 52 95</a>`; `<button class="button button-primary copy-email" type="button" data-email="casper@casperspur.com">copy email <span aria-hidden="true">⧉</span></button>`; `<span class="copy-feedback" role="status" aria-live="polite"></span>`.

**Footer:** `© <span id="year"></span> casper.dev` · `built with curiosity + caffeine` · `<a href="#top">back to top ↑</a>`.

## 5. CSS-layout (gengiv disse værdier)

- `.site-header`: samme bredde som `.shell`, `min-height: 78px`, flex, space-between, `border-bottom: 1px solid var(--line)`.
- `.brand`: flex, `gap: 10px`, `font-size: 15px`, `font-weight: 500`, ingen underline. `.brand-mark`: acid, `20px`.
- `.site-nav`: `display: none` (mobil), `gap: 28px`; links muted `12px`, hover acid. `.menu-toggle`: transparent, muted, `12px var(--mono)`, `padding: 10px 0`, cursor pointer; `.menu-icon` acid, `margin-left: 6px`.
- `.site-nav.is-open`: `display:flex; position:absolute; top:78px; left/right:20px; flex-direction:column; gap:0; padding:10px 20px; background:var(--panel); border:1px solid var(--line); z-index:5`; links `padding:14px 0; border-bottom:1px solid var(--line)`, sidste uden kant.
- `.hero`: `min-height:670px`, `padding:94px 0 42px`, grid, `align-content:center`, position relative. `.eyebrow`: muted, `11px`, `letter-spacing:.08em`, uppercase, `margin:0 0 20px`.
- `h1`: `max-width:720px; font-size:clamp(3.5rem, 15vw, 8rem); letter-spacing:-.07em; line-height:.88; margin-bottom:30px; font-weight:600`. `.hero-intro`: max-width 430px, muted, 16px, line-height 1.65.
- `.hero-actions`: flex, wrap, `gap:26px`, `margin-top:34px`. `.button`: inline-flex, `gap:16px`, `border:1px solid var(--acid)`, `padding:13px 16px`, `12px var(--mono)`, cursor pointer, transitions på bg/color/box-shadow/transform (0.2s). `.button-primary`: baggrund acid, farve night; hover: gennemsigtig baggrund, acid tekst, `box-shadow:4px 4px 0 var(--orange)`, `transform:translate(-2px,-2px)`. `.text-link`: ink, `12px var(--mono)`, `text-underline-offset:5px`; span orange med `margin-left:6px`.
- `.terminal-card`: `width:min(100%,420px); margin:72px 0 0 auto; background:rgba(var(--night-rgb),.86); border:1px solid var(--line); box-shadow:12px 12px 0 rgba(var(--acid-rgb),.08); font-size:11px`. `.terminal-bar`: flex, `gap:6px`, border-bottom, `padding:12px 14px`, muted. `.terminal-dot`: 7×7, `border:1px solid var(--orange)`, rund; 2. dot acid, 3. muted. `.terminal-label`: `margin-left:8px; font-size:10px`. `.terminal-body`: `min-height:170px; padding:22px 18px 12px; line-height:1.9`; `p { margin:0 }`. `.terminal-output`: acid, `padding-left:22px`; `.muted`: muted. `.cursor`: acid, `animation:blink 1s steps(2) infinite`. `.terminal-stamp`: border-top, `padding:10px 14px`, muted, `9px`, `letter-spacing:.08em`; span acid.
- `.hero-meta`: flex, wrap, `gap:14px 28px`, `margin-top:80px`, muted, `9px`, uppercase, `letter-spacing:.1em`; sidste span acid.
- `.section { padding:110px 0 }`. `.section-heading`: grid `42px 1fr`, `gap:18px`, `margin-bottom:52px`. `.section-number`: orange, `12px`, `padding-top:10px`, `border-top:1px solid var(--orange)`. `h2`: `clamp(2.8rem, 10vw, 5.5rem)`, `letter-spacing:-.07em`, `line-height:.9`, `font-weight:600`, `margin-bottom:0`.
- `.about-grid`: grid, `gap:34px`. `.about-image`: `aspect-ratio:4/3`, overflow hidden, `border:1px solid var(--line)`. `img`: 100%/100%, `object-fit:cover`, `filter:saturate(.5) contrast(1.1)`. `.about-copy`: muted, max-width 470px, `14px`, line-height 1.75; `.lead`: ink, `22px`, line-height 1.25. `.about-signature`: flex, `gap:10px`, align center, ink, `10px`, `margin-top:32px`; `.signature-line`: `1px × 80px`, acid.
- `.interests-section` og `.education-section`: `background:rgba(var(--panel-rgb),.78)`, border top/bottom `1px solid var(--line)`. `.interest-grid`: grid, `gap:12px`. `.interest-card`: `min-height:335px`, `padding:24px`, relative, border, flex column, transition border-color/transform; hover: acid border + `translateY(-5px)`. `.card-index`: orange, `10px`. `.card-icon`: acid, `36px`, `margin:42px 0 20px`. `h3`: `27px`, line-height .95, `letter-spacing:-.05em`, `margin-bottom:18px`. `p`: muted, `13px`, line-height 1.55, max-width 270px. `.card-link`: ink, `10px`, `margin-top:auto`, span orange `margin-left:8px`; hover acid.
- `.timeline`: grid. `.timeline-item`: grid `150px 1fr`, `gap:24px`, `align-items:start`, `padding:26px 0`, border-bottom. `.timeline-period`: mono, orange, `11px`, `padding-top:6px`. `.timeline-role`: acid, `10px`, uppercase, `letter-spacing:.08em`, `margin:0 0 8px`. `h3`: `22px`, `letter-spacing:-.02em`, `margin:0 0 4px`. `.timeline-meta`: muted, `10px var(--mono)`, `letter-spacing:.06em`, `margin:0 0 8px`. `.timeline-item > div > p`: muted, `13px`, line-height 1.6. `.timeline-highlights`: muted, `13px`, line-height 1.6, `margin:10px 0 0`, `padding-left:18px`; `li::marker` acid. `.cv-message`: muted, `11px var(--mono)`, line-height 1.7, `padding:20px 0`, border-bottom.
- `.contact-section`: `padding-top:120px; padding-bottom:86px`. `.contact-panel`: grid, `gap:40px`, `border-top:1px solid var(--acid)`, `padding-top:22px`. `.contact-side`: max-width 340px, muted, `14px`, line-height 1.6. `.contact-phone`: `margin:14px 0 0`, link inherit/ingen underline. `.copy-email`: `margin-top:16px`. `.copy-feedback`: block, `min-height:20px`, acid, `10px var(--mono)`, `margin-top:10px`.
- `.site-footer`: flex, wrap, space-between, `gap:12px`, `padding:20px 0 28px`, border-top, muted, `9px`, uppercase, `letter-spacing:.06em`; links ink → hover acid.
- `.reveal`: `opacity:0; transform:translateY(18px); transition: opacity .7s ease, transform .7s ease`. `.reveal.visible`: `opacity:1; transform:none`. `@keyframes blink { 50% { opacity:0 } }`.
- `.skip-link`: absolute, `left:16px; top:-60px`, `z-index:100`, acid baggrund, night tekst, `padding:10px 14px`, `12px var(--mono)`, transition top; `:focus` → `top:12px`. `:focus-visible { outline:2px solid var(--acid); outline-offset:2px }`.

## 6. Responsive

- `@media (min-width:700px)`: header `min-height:90px`; `.menu-toggle` skjules; `.site-nav { display:flex }`; hero `padding-top:120px; min-height:800px`; terminal-card `margin-top:80px`; `.about-grid` kolonner `1.1fr .9fr`, `gap:70px`, align center; `.interest-grid` 3 kolonner; `.contact-panel` 2 kolonner, `align-items:end`, `.contact-side { justify-self:end }`; `.section-heading { margin-bottom:70px }`.
- `@media (min-width:1000px)`: `.hero-copy { padding-left:8% }`; `.terminal-card { margin-right:7% }`; `.hero-meta { margin-top:-30px }`; `.about-image { aspect-ratio:1.2/1 }`.
- `@media (max-width:699px)`: `.timeline-item { grid-template-columns:1fr; gap:6px }`.
- `@media (prefers-reduced-motion:reduce)`: `html { scroll-behavior:auto }`, `.reveal { transition:none }`, `.cursor { animation:none }`.

## 7. JavaScript (én fil, init-funktion per concern, framework-frit)

Konstanter: `TYPING_SPEED_MS = 75`, `TYPING_START_DELAY_MS = 800`, `REVEAL_THRESHOLD = 0.12`, `TYPED_COMMAND = './thesis --topic ai_governance'`, `CV_DATA_URL = 'cv.json'`. `prefersReducedMotion` via `matchMedia`. Hjælpere: `byId(id)` og `createNode(tag, className, text)`.

1. `initMenu()` — toggle `.is-open` på `#site-nav` ved klik på `.menu-toggle`, synkronisér `aria-expanded`; luk menuen når et nav-link klikkes. Guard clauses hvis elementer mangler.
2. `initTyping()` — skriv `TYPED_COMMAND` tegn for tegn i `#typing-line` med 75 ms interval efter 800 ms startforsinkelse. Ved reduced motion: sæt teksten med det samme.
3. `initReveal()` — `IntersectionObserver` (threshold 0.12) tilføjer `.visible` til alle `.reveal` første gang de er i viewport og `unobserve` derefter. Gem observeren i en variabel så dynamisk tilføjede CV-elementer kan observeres via `observeReveal(element)`.
4. `initYear()` — sæt `#year` til `new Date().getFullYear()`.
5. `initCopyEmail()` — klik på `.copy-email` kopierer `data-email` med `navigator.clipboard.writeText`; vis "copied to clipboard." i `.copy-feedback` ved succes, ellers e-mailadressen.
6. `initCv()` — hent `cv.json` med `fetch(..., {cache:'no-cache'})`. To sektioner: `{containerId:'experience-list', key:'experience', organizationKey:'company', titleKey:'role'}` og `{containerId:'education-list', key:'education', organizationKey:'institution', titleKey:'degree'}`. For hver entry byg en `article.timeline-item.reveal` med `.timeline-period` (entry.period), `<h3>` (organization), `<p.timeline-role>` (title), valgfri `.timeline-meta` (location), valgfri `<p>` (description), valgfri `<ul.timeline-highlights>` med `<li>` pr. highlight. Tom/fejl: vis `.cv-message` ("No entries yet — add some to cv.json." / "Could not load cv.json — serve this folder over HTTP to see CV entries."). Sæt altid `aria-busy="false"` i `finally`. Kald alle init-funktioner nederst.

## 8. `cv.json` (gengiv praecis — inkl. placeholder-uddannelserne)

```json
{
  "_note": "Edit the `experience` and `education` arrays below. Replace the placeholder education entries before publishing. Each entry supports: period, company/institution, role/degree, location (optional), description, and highlights (optional array of strings).",
  "experience": [
    { "period": "2022 — 2023", "company": "Lokal-gruppen", "role": "Digital Content & Marketing Intern", "location": "Denmark", "description": "Supported the rollout of approximately 100 local news websites in Denmark; wrote web content and contributed to marketing, Google Analytics and longer-term business strategy.", "highlights": [] },
    { "period": "2021 — 2022", "company": "Focus People", "role": "Respiratory Care Assistant", "location": "Denmark", "description": "Provided round-the-clock respiratory support for a person with ALS, gaining direct exposure to the sensitivity and reliability demands of patient-facing care.", "highlights": [] },
    { "period": "2019 — 2021", "company": "YouSee", "role": "Customer Adviser / Process Consultant", "location": "Denmark", "description": "Helped customers solve service issues and understand their accounts; led the Quality Time process improvement, engaging internal teams and chairing internal meetings.", "highlights": [] },
    { "period": "2017 — 2019", "company": "Stakem.io", "role": "Co-founder", "location": "", "description": "Responsible for technology, server operations and maintenance; contributed to platform feature development and monitored blockchain projects.", "highlights": [] },
    { "period": "2014 — 2020", "company": "Spur CON:TRA", "role": "Founder / Self-employed", "location": "", "description": "Concept development and sales of personalized laser-engraved gifts and sports cards.", "highlights": [] }
  ],
  "education": [
    { "period": "2023 — 2025", "institution": "Example University", "degree": "MSc, Web Communication", "location": "Copenhagen, Denmark", "description": "PLACEHOLDER — replace with a short summary of your master's programme, thesis focus or relevant coursework.", "highlights": ["PLACEHOLDER — add a relevant project or achievement", "PLACEHOLDER — add another highlight"] },
    { "period": "2016 — 2019", "institution": "Example College", "degree": "BSc, Digital Communication", "location": "Copenhagen, Denmark", "description": "PLACEHOLDER — replace with a short summary of your bachelor's programme.", "highlights": [] }
  ]
}
```

## 9. Tilgængelighed og kvalitet

- Behold skip link, `aria-label`, `aria-expanded`, `aria-controls`, `role="status"`, `aria-live="polite"`, `aria-busy` og `alt` på billedet.
- Alle dekorative elementer (`scanlines`, ikoner, pile, cursor) har `aria-hidden="true"`.
- Ingen ekstra sektioner, ingen ekstra tekst, ingen ændring af navne/e-mails/telefon/årstal — gengiv præcis som angivet.
- Output skal være fire færdige filer, klar til at åbne i browseren.
