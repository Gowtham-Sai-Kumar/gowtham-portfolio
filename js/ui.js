import { rebuildCharts } from './charts.js';

export function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}
window.scrollToSection = scrollToSection;

window.scrollToTop = function() {
  window.scroll({ top: 0, behavior: 'smooth' });
};

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

export function initBackToTop() {
  window.addEventListener('scroll', () => {
    document.getElementById('btt')?.classList.toggle('show', window.scrollY > 400);
  });
}

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

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn        = document.getElementById('contactBtn');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg   = document.getElementById('formError');

    btn.textContent = 'Sending...';
    btn.disabled    = true;
    if (errorMsg) errorMsg.style.display = 'none';

    try {
      const res = await fetch('https://formspree.io/f/xreryqgk', {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent = '✓ Sent!';
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.disabled    = false;
          if (successMsg) successMsg.style.display = 'none';
        }, 4000);
      } else {
        throw new Error('Server error');
      }

    } catch (err) {
      btn.textContent = 'Send Message →';
      btn.disabled    = false;
      if (errorMsg) errorMsg.style.display = 'block';
    }
  });
}