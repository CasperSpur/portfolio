const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const typingLine = document.querySelector('#typing-line');
const command = './build-something-weird';
let characterIndex = 0;

function typeCommand() {
  if (characterIndex < command.length) {
    typingLine.textContent += command[characterIndex];
    characterIndex += 1;
    window.setTimeout(typeCommand, 75);
  }
}

window.setTimeout(typeCommand, 800);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#year').textContent = new Date().getFullYear();

const copyButton = document.querySelector('.copy-email');
const copyFeedback = document.querySelector('.copy-feedback');

copyButton.addEventListener('click', async () => {
  const email = copyButton.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = 'copied to clipboard.';
  } catch {
    copyFeedback.textContent = email;
  }
});