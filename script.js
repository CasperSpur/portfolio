/**
 * casper.dev — interaction layer.
 * Each `init*` function wires up one concern:
 *   1. Mobile menu   2. Terminal typing   3. Scroll reveal
 *   4. Footer year   5. Copy email   6. CV data
 */

const TYPING_SPEED_MS = 75;
const TYPING_START_DELAY_MS = 800;
const REVEAL_THRESHOLD = 0.12;
const TYPED_COMMAND = './thesis --topic ai_governance';
const CV_DATA_URL = 'cv.json';
const CV_SECTIONS = [
  { containerId: 'experience-list', key: 'experience', organizationKey: 'company', titleKey: 'role' },
  { containerId: 'education-list', key: 'education', organizationKey: 'institution', titleKey: 'degree' }
];

const prefersReducedMotion = typeof window.matchMedia === 'function'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const byId = (id) => document.getElementById(id);

const createNode = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

/* 1. Mobile menu — open/close the dropdown nav, close on link click. */
function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = byId('site-nav');

  if (!menuToggle || !siteNav) return;

  const setMenuState = (isOpen) => {
    siteNav.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  };

  menuToggle.addEventListener('click', () => {
    setMenuState(!siteNav.classList.contains('is-open'));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700 && siteNav.classList.contains('is-open')) {
      setMenuState(false);
    }
  });
}

/* 2. Terminal typing — types the command once, respecting reduced motion. */
function initTyping() {
  const typingLine = byId('typing-line');

  if (!typingLine) return;

  // Re-check at start-up so a preference changed after load is respected.
  const reduceMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : prefersReducedMotion;

  if (reduceMotion) {
    typingLine.textContent = TYPED_COMMAND;
    return;
  }

  let characterIndex = 0;

  const typeNextCharacter = () => {
    if (characterIndex >= TYPED_COMMAND.length) return;

    typingLine.textContent += TYPED_COMMAND[characterIndex];
    characterIndex += 1;
    window.setTimeout(typeNextCharacter, TYPING_SPEED_MS);
  };

  window.setTimeout(typeNextCharacter, TYPING_START_DELAY_MS);
}

/* 3. Scroll reveal — fade sections in the first time they enter the viewport. */
let revealObserver = null;

function observeReveal(element) {
  if (revealObserver) {
    revealObserver.observe(element);
  } else {
    element.classList.add('visible');
  }
}

function initReveal() {
  const revealables = document.querySelectorAll('.reveal');

  if (!revealables.length) return;

  if (!('IntersectionObserver' in window)) {
    revealables.forEach((element) => element.classList.add('visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: REVEAL_THRESHOLD });

  revealables.forEach((element) => revealObserver.observe(element));
}

/* 4. Footer year — keep the copyright current without editing the HTML. */
function initYear() {
  const year = byId('year');

  if (!year) return;

  year.textContent = new Date().getFullYear();
}

/* 5. Copy email — clipboard button with graceful feedback on success and failure. */
function initCopyEmail() {
  const copyButton = document.querySelector('.copy-email');
  const copyFeedback = document.querySelector('.copy-feedback');

  if (!copyButton || !copyFeedback) return;

  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyFeedback.textContent = 'copied to clipboard.';
    } catch {
      copyFeedback.textContent = email;
    }
  });
}

/* 6. CV data — build timeline entries from cv.json (single source of truth). */
function renderCvEntry(entry, config) {
  const item = createNode('article', 'timeline-item reveal');
  const content = createNode('div');

  content.appendChild(createNode('h3', '', entry[config.organizationKey] || '—'));
  content.appendChild(createNode('p', 'timeline-role', entry[config.titleKey] || '—'));

  if (entry.location) {
    content.appendChild(createNode('p', 'timeline-meta', entry.location));
  }

  if (entry.description) {
    content.appendChild(createNode('p', '', entry.description));
  }

  if (Array.isArray(entry.highlights) && entry.highlights.length) {
    const highlights = createNode('ul', 'timeline-highlights');
    entry.highlights.forEach((highlight) => {
      highlights.appendChild(createNode('li', '', highlight));
    });
    content.appendChild(highlights);
  }

  item.append(createNode('span', 'timeline-period', entry.period || '—'), content);
  observeReveal(item);
  return item;
}

function renderCvSection(container, entries, config) {
  container.replaceChildren();

  const validEntries = Array.isArray(entries)
    ? entries.filter((entry) => entry && typeof entry === 'object')
    : [];

  if (!validEntries.length) {
    container.appendChild(createNode('p', 'cv-message', 'No entries yet — add some to cv.json.'));
    return;
  }

  validEntries.forEach((entry) => {
    container.appendChild(renderCvEntry(entry, config));
  });
}

async function initCv() {
  const sections = CV_SECTIONS
    .map((config) => ({ ...config, container: byId(config.containerId) }))
    .filter((section) => section.container);

  if (!sections.length) return;

  try {
    const response = await fetch(CV_DATA_URL, { cache: 'no-cache' });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    sections.forEach(({ container, key, organizationKey, titleKey }) => {
      renderCvSection(container, data[key], { organizationKey, titleKey });
    });
  } catch (error) {
    console.error('Could not load cv.json', error);
    sections.forEach(({ container }) => {
      container.replaceChildren();
      container.appendChild(createNode('p', 'cv-message', 'Could not load cv.json — serve this folder over HTTP to see CV entries.'));
    });
  } finally {
    sections.forEach(({ container }) => container.setAttribute('aria-busy', 'false'));
  }
}

initMenu();
initTyping();
initReveal();
initYear();
initCopyEmail();
initCv();
