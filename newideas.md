# Projektopsummering og idéer til casper.dev

## Hvad projektet er

En statisk, single-page portfolio til **Casper Spur** (`casper.dev`) med terminal-/hacker-æstetik: mørk baggrund med grid og scanlines, syregrøn accent, monospace-label og store "kommando-agtige" overskrifter.

Strukturen er fem dele:

- **Hero** – `$ whoami`, `cat mission.txt` og en terminal der selv skriver en kommando.
- **About** – baggrund i webkommunikation, IT-support, procesforbedring mv. med et Unsplash-serverbillede.
- **Interests** – tre kort: cybersecurity, AI, vibe coding.
- **Journey + Education** – to tidlinjer der bygges dynamisk fra `cv.json`.
- **Contact** – telefonnummer og "copy email"-knap.

Teknisk er det ren vanilla HTML/CSS/JS uden build-step. `script.js` har seks små `init*`-funktioner (menu, typing, reveal, år, copy-email, CV-load), og `style.css` følger en nummereret 13-sektions struktur med design tokens i `:root`. Det er gennemført mobile-first og har allerede `prefers-reduced-motion`, skip-link, ARIA-attributter og `aria-busy` på tidlinjerne.

**Én ting springer i øjnene:** `cv.json` indeholder stadig `Example University`, `Example College` og `PLACEHOLDER`-tekster i uddannelsesdelen.

---

## 5 idéer til at udvide

1. **Projektsection (`./projects`)**
   Du skriver "vibe coding", men der vises ingen faktiske byg. Tilføj en sektion med 3 projekter som terminal-kort (status, stack, link til repo/demo). Kan data-drives fra en `projects.json` præcis som CV'en — passer perfekt ind i nuværende mønster.

2. **Noter / skrifter (`./notes`)**
   En let "blog-lite" med korte noter om AI governance, responsible AI og cybersecurity. Styrker din faglige profil og giver de tre interesse-kort et rigtigt sted at "inspect interest" i stedet for bare at hoppe til kontakt.

3. **Interaktiv terminal som navigation**
   Gør terminal-kortet i hero'en til en rigtig input-linje: `help`, `ls`, `cd about`, `open projects`, `ping casper`. Meget on-brand, overraskende og kan falde graceful tilbage til den nuværende typing-animation ved reduced motion.

4. **"Currently"-statuspanel**
   Et lille `now`-widget: hvad du bygger, læser og undersøger lige nu, læst fra en lille JSON-fil. Giver siden liv uden at du skal redigere HTML, og binder godt sammen med "available for good problems" i hero'en.

5. **Print-venlig CV / download-knap**
   Et `@media print`-stylesheet + en `download cv`-knap der kalder `window.print()`. Gør det nemt at dele din profil med hospitaler/arbejdsgivere — præcis den målgruppe du nævner i kontaktteksten.

---

## 5 idéer til at forbedre

1. **Udfyld `cv.json` før publicering**
   Erstat `Example University`/`Example College` og alle `PLACEHOLDER`-linjer med rigtige oplysninger, og fjern `_note`-feltet. Det er den største troværdighedsrisiko lige nu.

2. **Fiks "open index.html"-løftet**
   `initCv()` bruger `fetch('cv.json')`, som bliver blokeret på `file://`. Så når man følger AGENTS.md og bare åbner filen, er begge tidlinjer tomme med en fejlmeddelelse. Løsning: indlejr CV-data som fallback i `script.js`, eller dokumentér tydeligt at siden skal serves over HTTP.

3. **Favicon + social preview**
   Der er `og:title`/`og:description`, men ingen `og:image` / `twitter:image` og intet favicon. Et lille SVG-`>_`-ikon som favicon og et 1200×630 preview-billede gør en stor forskel ved deling på LinkedIn og i Slack.

4. **Navigationens "sidste 10 %"**
   Aktiv sektion-highlight i menuen (scrollspy), luk mobilmenuen på `Escape` og klik udenfor, og lidt `scroll-margin-top` så ankerlinks ikke gemmer sig bag headeroom. Små detaljer, men de får siden til at føles færdig.

5. **Gør de døde links nyttige**
   Alle tre `inspect interest`-links peger på `#contact`. Send dem videre til de relevante noter/projekter (når de findes), og tilføj et almindeligt `mailto:`-link ved siden af copy-knappen — ikke alle vil have noget i udklipsholderen.
