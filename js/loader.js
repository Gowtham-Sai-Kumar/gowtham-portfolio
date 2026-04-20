/* ============================================================
   loader.js — Page loader animation
   cursor.js — Custom animated cursor
============================================================ */

/* ── LOADER ─────────────────────────────────────────────── */
export function initLoader() {
  const loaderMsgs = [
    'Connecting to SQL Server...',
    'Loading patient records...',
    'Rendering dashboard...',
    'Building portfolio...',
    'Ready!'
  ];
  let lmi = 0;
  const lmEl = document.getElementById('loaderMsg');
  const lmT = setInterval(() => {
    lmi++;
    if (lmi < loaderMsgs.length) lmEl.textContent = loaderMsgs[lmi];
  }, 380);

  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(lmT);
      document.getElementById('loader').classList.add('out');
      setTimeout(() => document.getElementById('loader')?.remove(), 600);
    }, 1800);
  });
}

/* ── CURSOR ─────────────────────────────────────────────── */
export function initCursor() {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const cur     = document.getElementById('cur');
  const curRing = document.getElementById('curRing');

  (function animC() {
    if (cur) { cur.style.left = mx + 'px'; cur.style.top = my + 'px'; }
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    if (curRing) { curRing.style.left = rx + 'px'; curRing.style.top = ry + 'px'; }
    requestAnimationFrame(animC);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, .ds-item, .cert-item').forEach(el => {
    el.addEventListener('mouseenter', () => curRing?.classList.add('hovering'));
    el.addEventListener('mouseleave', () => curRing?.classList.remove('hovering'));
  });
}
