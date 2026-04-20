/* ============================================================
   animations.js — Typing effect, scroll reveals, counters, skill bars
============================================================ */

/* ── TYPING EFFECT ────────────────────────────────────────── */
export function initTyping() {
  const phrases = [
    'optimized SQL queries',
    'SSRS report systems',
    'React dashboards',
    'data-driven solutions',
    'scalable databases'
  ];
  let pi = 0, ci = 0, deleting = false;

  function typeIt() {
    const el = document.getElementById('typeCursor');
    if (!el) return;
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(typeIt, 1600); return; }
      setTimeout(typeIt, 65);
    } else {
      el.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(typeIt, 400); return; }
      setTimeout(typeIt, 35);
    }
  }
  setTimeout(typeIt, 2800);
}

/* ── SCROLL REVEALS ─────────────────────────────────────── */
export function initScrollReveal() {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

/* ── COUNTER ANIMATION ───────────────────────────────────── */
export function initCounters() {
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = +el.getAttribute('data-count');
        let cur      = 0;
        const step   = target / 50;
        const suffixes = { 3: '+', 50: '+', 60: '%', 20: 'h', 5: '' };
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.floor(cur) + (suffixes[target] || '+');
          if (cur >= target) clearInterval(t);
        }, 28);
        co.unobserve(el);
      }
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
}

/* ── SKILL BARS ─────────────────────────────────────────── */
export function initSkillBars() {
  const bo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sb-fill').forEach(bar => { bar.style.width = bar.dataset.w + '%'; });
        bo.unobserve(e.target);
      }
    });
  }, { threshold: .3 });
  document.querySelectorAll('.skill-bars').forEach(el => bo.observe(el));
}
