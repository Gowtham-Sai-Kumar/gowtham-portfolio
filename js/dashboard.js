/* ============================================================
   dashboard.js — Patient data, table rendering, search/filter
============================================================ */

/* ── DUMMY DATA GENERATION ──────────────────────────────── */
const firstN    = ['Ravi','Priya','Arjun','Sneha','Kiran','Divya','Suresh','Meena','Vikram','Ananya','Rahul','Lakshmi','Anil','Pooja','Sanjay'];
const lastN     = ['Kumar','Reddy','Sharma','Rao','Singh','Naidu','Patel','Iyer','Nair','Chandra'];
const clinicList  = ['Hyd Central','Secunderabad','Banjara Hills','Jubilee Hills','Kukatpally'];
const treatList   = ['Homeopathy','Hair Care','Skin Care','Dental','Nutrition'];
const statusList  = ['Active','Completed','Missed','Pending'];

const rnd     = a => a[Math.floor(Math.random() * a.length)];
const rndDate = d => {
  const dt = new Date();
  dt.setDate(dt.getDate() - Math.floor(Math.random() * d));
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const dashData = Array.from({ length: 80 }, (_, i) => ({
  id:        'P' + (10001 + i),
  name:      rnd(firstN) + ' ' + rnd(lastN),
  clinic:    rnd(clinicList),
  treatment: rnd(treatList),
  lastVisit: rndDate(180),
  status:    rnd(statusList)
}));

let dashFiltered = [...dashData];

/* ── STATUS BADGE ───────────────────────────────────────── */
function statusBadge(s) {
  const m = { Active: 's', Completed: 's', Missed: 'e', Pending: 'w' };
  return `<span class="dbadge ${m[s] || 's'}">${s}</span>`;
}

/* ── RENDER TABLE ───────────────────────────────────────── */
export function renderDashTable() {
  const el = document.getElementById('dashTableBody');
  if (!el) return;
  el.innerHTML = dashFiltered.slice(0, 12).map(p => `
    <tr>
      <td style="font-family:var(--mono);font-size:10px">${p.id}</td>
      <td style="font-weight:500;color:var(--cream)">${p.name}</td>
      <td>${p.clinic}</td>
      <td>${p.treatment}</td>
      <td style="font-family:var(--mono);font-size:10px">${p.lastVisit}</td>
      <td>${statusBadge(p.status)}</td>
    </tr>`).join('');
}

/* ── FILTER ─────────────────────────────────────────────── */
export function filterDash() {
  const q  = (document.getElementById('dashSearch')?.value || '').toLowerCase();
  const st = document.getElementById('dashFilter')?.value || '';
  dashFiltered = dashData.filter(p =>
    (!q  || p.name.toLowerCase().includes(q)) &&
    (!st || p.status === st)
  );
  renderDashTable();
}

/* ── INIT ────────────────────────────────────────────────── */
export function initDashboard() {
  renderDashTable();

  document.getElementById('dashSearch')?.addEventListener('input', filterDash);
  document.getElementById('dashFilter')?.addEventListener('change', filterDash);
}
