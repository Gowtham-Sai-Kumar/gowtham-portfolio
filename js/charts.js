/* ============================================================
   charts.js — Chart.js initialisation for About, Projects & Dashboard
   Depends on: Chart.js loaded globally via CDN
============================================================ */

Chart.defaults.color       = '#7a7d9a';
Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

const chartInstances = {};

/* ── BUILD ALL CHARTS ───────────────────────────────────── */
export function buildCharts() {

  /* About mini line chart */
  const actx = document.getElementById('aboutChart');
  if (actx && !chartInstances.about) {
    chartInstances.about = new Chart(actx, {
      type: 'line',
      data: {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [{
          data: [980, 1100, 1050, 1280, 1420, 1680],
          borderColor: '#00c8a0',
          backgroundColor: 'rgba(0,200,160,0.08)',
          borderWidth: 2, fill: true, tension: .4, pointRadius: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  /* Project card bar chart */
  const pctx = document.getElementById('projChart1');
  if (pctx && !chartInstances.proj) {
    chartInstances.proj = new Chart(pctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          data: [820, 940, 890, 1100, 1050, 1240, 1380],
          backgroundColor: 'rgba(0,200,160,0.7)',
          borderRadius: 3, borderWidth: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { display: false }, y: { display: false } }
      }
    });
  }

  /* Dashboard bar chart */
  const dbctx = document.getElementById('dashBarChart');
  if (dbctx && !chartInstances.dashBar) {
    chartInstances.dashBar = new Chart(dbctx, {
      type: 'bar',
      data: {
        labels: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
        datasets: [
          {
            label: 'Visits',
            data: [980,1120,1050,1340,1280,1490,1320,1580,1420,1680,1540,1820],
            backgroundColor: 'rgba(0,200,160,.65)', borderRadius: 3, borderWidth: 0
          },
          {
            label: 'Unique',
            data: [820,940,890,1100,1050,1240,1090,1320,1180,1400,1290,1520],
            backgroundColor: 'rgba(91,156,246,.45)', borderRadius: 3, borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 8, font: { size: 10 } } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 } } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 9 } } }
        }
      }
    });
  }

  /* Dashboard donut chart */
  const ddctx = document.getElementById('dashDonut');
  if (ddctx && !chartInstances.dashDonut) {
    chartInstances.dashDonut = new Chart(ddctx, {
      type: 'doughnut',
      data: {
        labels: ['Homeopathy', 'Hair Care', 'Skin Care', 'Dental', 'Nutrition'],
        datasets: [{
          data: [38, 25, 18, 12, 7],
          backgroundColor: [
            'rgba(0,200,160,.8)', 'rgba(91,156,246,.8)',
            'rgba(232,184,75,.8)', 'rgba(255,107,122,.8)', 'rgba(68,70,94,.8)'
          ],
          borderWidth: 0, hoverOffset: 6
        }]
      },
      options: {
        responsive: false, cutout: '65%',
        plugins: { legend: { display: false } }
      }
    });
  }
}

/* ── REBUILD (used on theme toggle) ────────────────────── */
export function rebuildCharts() {
  Object.values(chartInstances).forEach(c => c.destroy());
  Object.keys(chartInstances).forEach(k => delete chartInstances[k]);
  setTimeout(buildCharts, 100);
}

/* ── OBSERVE SECTIONS TO TRIGGER BUILD ─────────────────── */
export function initChartObserver() {
  const chartObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) buildCharts(); });
  }, { threshold: .1 });

  ['about', 'projects', 'dashboard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) chartObs.observe(el);
  });
}
