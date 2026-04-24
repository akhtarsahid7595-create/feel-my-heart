/* ── @emotional_energy ── main.js ── */

/* ══════════════════════
   NAV SCROLL EFFECT
   ══════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ══════════════════════
   INTERSECTION OBSERVER — SCROLL REVEAL
   ══════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within a grid
      const el = entry.target;
      const parent = el.parentElement;
      const siblings = parent ? [...parent.querySelectorAll('.reveal-item')] : [el];
      const idx = siblings.indexOf(el);
      const delay = Math.min(idx * 150, 450);

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-item').forEach(el => {
  revealObserver.observe(el);
});

/* ══════════════════════
   COUNT-UP ANIMATION (Pain hook number)
   ══════════════════════ */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  let current = 0;
  const duration = 1400;
  const stepTime = 16;
  const steps = Math.ceil(duration / stepTime);
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, stepTime);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

/* ══════════════════════
   STAR FILL ANIMATION (Testimonials)
   ══════════════════════ */
const starObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stars = entry.target;
      stars.style.opacity = '0';
      stars.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        stars.style.opacity = '1';
      }, 200);
      starObserver.unobserve(stars);
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('.stars').forEach(el => starObserver.observe(el));

/* ══════════════════════
   SCRIPT PREVIEW TABS
   ══════════════════════ */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.script-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `tab-content-${tab}`) {
        content.classList.add('active');
      }
    });
  });
});

/* ══════════════════════
   3D TILT ON MOCKUPS
   ══════════════════════ */
function setupTilt(el) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 5;
    const rotY = dx * 5;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    el.style.transition = 'transform 0.5s var(--ease-out)';
    setTimeout(() => { el.style.transition = ''; }, 500);
  });
}

document.querySelectorAll('.mockup-wrapper').forEach(el => setupTilt(el));

/* ══════════════════════
   RIPPLE EFFECT ON BUTTONS
   ══════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ══════════════════════
   SMOOTH ANCHOR SCROLL
   ══════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

