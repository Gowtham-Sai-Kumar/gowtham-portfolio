/* ============================================================
   main.js — Entry point: imports & boots all modules
   Load order: loader → cursor → animations → charts → dashboard → ui
============================================================ */
import { initLoader, initCursor }                       from './loader.js';
import { initTyping, initScrollReveal, initCounters, initSkillBars } from './animations.js';
import { initChartObserver }                            from './charts.js';
import { initDashboard }                                from './dashboard.js';
import { initTheme, initNavSpy, initBackToTop, initRipple, initCardTilt, initContactForm } from './ui.js';

/* Boot */
initLoader();
initCursor();
initTyping();
initScrollReveal();
initCounters();
initSkillBars();
initChartObserver();
initDashboard();
initTheme();
initNavSpy();
initBackToTop();
initRipple();
initCardTilt();
initContactForm();
