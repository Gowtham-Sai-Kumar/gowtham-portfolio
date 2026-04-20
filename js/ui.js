/* ============================================================
   ui.js — Theme toggle, nav scroll-spy, ripple, 3D card tilt,
            back-to-top, contact form, smooth scrollTo helper
============================================================ */
import { rebuildCharts } from './charts.js';

/* ── SMOOTH SCROLL HELPER ─────────────────────────────── */
export function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}
// Expose globally so inline onclick="scrollTo(...)" works
window.scrollTo = scrollTo;

/* ── THEME TOGGLE ────────────────────────────────────────── */
export function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
    btn.textContent = dark ? '🌙' : '☀';
    rebuildCharts();
  });
}

/* ── NAV SCROLL-SPY & ACTIVE STATE ──────────────────────── */
export function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
      const top    = sec.offsetTop - 90;
      const bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  });
}

/* ── BACK TO TOP ─────────────────────────────────────────── */
export function initBackToTop() {
  window.addEventListener('scroll', () => {
    document.getElementById('btt')?.classList.toggle('show', window.scrollY > 400);
  });
}

/* ── RIPPLE EFFECT ───────────────────────────────────────── */
export function initRipple() {
  document.querySelectorAll('.cta-primary, .btn-hire').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r    = document.createElement('span');
      r.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const sz   = Math.max(rect.width, rect.height) * 2;
      r.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - rect.left - sz / 2}px;top:${e.clientY - rect.top - sz / 2}px`;
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });
}

/* ── 3D CARD TILT ────────────────────────────────────────── */
export function initCardTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform      = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      card.style.transformStyle = 'preserve-3d';
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', handleContact);
}

function handleContact(e) {
  e.preventDefault();
  const btn = document.getElementById('contactBtn');
  btn.textContent = 'Sending...';
  btn.disabled    = true;
  setTimeout(() => {
    btn.textContent = '✓ Sent!';
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled    = false;
      document.getElementById('formSuccess').style.display = 'none';
    }, 4000);
  }, 1000);
}
// Expose for legacy inline attribute usage (onsubmit="handleContact(event)")
window.handleContact = handleContact;
