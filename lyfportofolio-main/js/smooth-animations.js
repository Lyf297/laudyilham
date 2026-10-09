const revealSelector = [
  '.site-header .brand',
  '.site-header .nav-links > li',
  '.site-header .nav-toggle',
  '.hero-topline',
  '.hero-copy > .hero-badge',
  '.hero-copy > h2',
  '.hero-copy > h1',
  '.hero-copy > p',
  '.hero-meta > span',
  '.hero-actions > a',
  '.hero-socials > a',
  '.portrait-card',
  '.stat-card',
  '#about .section-heading > *',
  '.about-profile',
  '.about-profile > *',
  '.about-profile li',
  '.category-card',
  '.about-copy',
  '.about-copy > *',
  '#services .section-heading > *',
  '.service-card',
  '.service-card > *',
  '#skill .section-heading > *',
  '.skill-card',
  '.skill-card > *',
  '#experience .section-heading > *',
  '.experience-card',
  '.experience-card > *',
  '#projects-section .intro > *',
  '#projects-grid .card',
  '#projects-grid .card > .thumb',
  '#projects-grid .card-content > *',
  '#projects-grid .card-heading > *',
  '#projects-grid .card .meta > *',
  '#contact-section .header > *',
  '#contactForm > .input-group',
  '#contactForm > .input-group > *',
  '#contactForm > button',
  '#contactForm > button > *',
  '.site-footer > *'
].join(',');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

  const observeRevealElements = (root) => {
    if (root.nodeType !== Node.ELEMENT_NODE) return;

    const elements = [];
    if (root.matches(revealSelector)) elements.push(root);
    elements.push(...root.querySelectorAll(revealSelector));

    elements.forEach(element => {
      if (element.hasAttribute('data-reveal')) return;

      element.setAttribute('data-reveal', '');
      const siblings = Array.from(element.parentElement.children)
        .filter(sibling => sibling.matches(revealSelector));
      const delay = Math.min(siblings.indexOf(element), 4) * 70;
      element.style.setProperty('--reveal-delay', `${delay}ms`);
      revealObserver.observe(element);
    });
  };

  observeRevealElements(document.body);

  const revealMutationObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(observeRevealElements);
    });
  });
  revealMutationObserver.observe(document.body, { childList: true, subtree: true });
}

// Active state untuk menu navigasi
const navLinks = document.querySelectorAll('.nav-links a');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

const setMenuOpen = (isOpen) => {
  navMenu.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
};

navToggle.addEventListener('click', () => {
  setMenuOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});

const setActiveNav = (id) => {
  navLinks.forEach(link => {
    const linkTarget = link.getAttribute('href');
    const isActive = linkTarget === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (targetId) {
      setActiveNav(targetId);
    }
    setMenuOpen(false);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

if (location.hash) {
  const hashTarget = location.hash.replace('#', '');
  if (hashTarget) setActiveNav(hashTarget);
} else {
  setActiveNav('hero');
}
