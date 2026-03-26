/* =============================================================
   SILKY OJHA — PORTFOLIO SCRIPTS
   Features:
   - Navbar scroll shadow
   - Hamburger mobile menu toggle
   - Active nav link on scroll (Intersection Observer)
   - Fade-up animation on scroll (Intersection Observer)
   - Smooth scroll on nav clicks
   ============================================================= */

/* ── 1. NAVBAR: add .scrolled class on scroll ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ── 2. HAMBURGER MENU TOGGLE ────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked (mobile UX)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ── 3. ACTIVE NAV LINK ON SCROLL ────────────── */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link[data-section]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  },
  {
    // Trigger when section is ~25% in view, accounting for navbar height
    rootMargin: `-${68}px 0px -55% 0px`,
    threshold: 0,
  }
);

sections.forEach(section => sectionObserver.observe(section));


/* ── 4. FADE-UP ANIMATION ON SCROLL ──────────── */
const fadeTargets = document.querySelectorAll('.fade-up, .fade-up-delay');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once animated, stop observing to save resources
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08,
  }
);

fadeTargets.forEach(el => fadeObserver.observe(el));


/* ── 5. SMOOTH SCROLL (fallback for older browsers) ── */
// Modern browsers handle this via CSS scroll-behavior: smooth,
// but this ensures nav link clicks always smooth-scroll correctly.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
