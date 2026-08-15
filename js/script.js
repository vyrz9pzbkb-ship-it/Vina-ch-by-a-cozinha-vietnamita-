document.addEventListener('DOMContentLoaded', () => {

  /* ===== Footer year ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Header scroll state ===== */
  const header = document.getElementById('header');
  const toggleHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });

  /* ===== Mobile nav toggle ===== */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ===== Active nav link on scroll ===== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const highlightNav = () => {
    let currentId = sections[0] ? sections[0].id : '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ===== Menu category tabs ===== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const categories = document.querySelectorAll('.menu-category');

  const showCategory = (target) => {
    categories.forEach(cat => cat.classList.toggle('active', cat.id === target));
    tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === target));
  };

  showCategory(tabButtons[0]?.dataset.target);

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => showCategory(btn.dataset.target));
  });

  /* ===== Fade-in on scroll (IntersectionObserver) ===== */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ===== Floating tapioca bubbles in hero ===== */
  const bubbleLayer = document.querySelector('.bubbles');
  if (bubbleLayer) {
    const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    const BUBBLE_COUNT = isSmallScreen ? 16 : 26;
    const swayVariants = ['sway-1', 'sway-2', 'sway-3'];

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const bubble = document.createElement('span');
      bubble.className = `bubble ${swayVariants[i % swayVariants.length]}`;

      const size = 5 + Math.random() * 20;
      const left = Math.random() * 100;
      const duration = 14 + Math.random() * 14; // slow, varied ascent
      const delay = -Math.random() * (duration + 12); // negative delay: some bubbles start mid-flight so bubbles aren't all synced at load

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;

      bubbleLayer.appendChild(bubble);
    }
  }

});
