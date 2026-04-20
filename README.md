# Gowtham Sai Kumar — Portfolio
### "Terminal Elegance" Design · SQL Developer & MERN Learner

---

## 🗂 Project Structure

```
gowtham-portfolio/
│
├── index.html                 ← Main entry point (open this in browser)
│
├── css/
│   ├── variables.css          ← Design tokens (colors, fonts, spacing)
│   ├── base.css               ← Reset, body, scroll, keyframes, reveal
│   ├── components.css         ← Cursor, loader, nav, hero, CTA buttons, back-to-top
│   └── sections.css           ← About, Skills, Projects, Dashboard, Experience,
│                                 Education, Contact, Footer, Responsive
│
├── js/
│   ├── main.js                ← Entry point — imports & boots all modules
│   ├── loader.js              ← Page loader animation + custom cursor
│   ├── animations.js          ← Typing effect, scroll reveals, counters, skill bars
│   ├── charts.js              ← Chart.js setup (About, Projects, Dashboard charts)
│   ├── dashboard.js           ← Patient data generation, table render, search/filter
│   └── ui.js                  ← Theme toggle, nav scroll-spy, ripple, 3D card tilt,
│                                 back-to-top, contact form, scrollTo helper
│
└── assets/
    ├── images/                ← Add your profile photo, project screenshots here
    └── fonts/                 ← (Optional) Self-hosted fonts
```

---

## 🚀 How to Run Locally

### Option 1 — VS Code Live Server (Recommended)
1. Open the `gowtham-portfolio/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Runs at `http://127.0.0.1:5500`

### Option 2 — Python HTTP Server
```bash
cd gowtham-portfolio
python -m http.server 3000
# Open http://localhost:3000
```

### Option 3 — Node.js serve
```bash
npx serve gowtham-portfolio
```

> ⚠️ **Important:** The JS uses ES Modules (`type="module"`).  
> You **must** serve through a local server — double-clicking `index.html` won't work.

---

## 📦 Dependencies (CDN — no install needed)

| Library | Source |
|---|---|
| Chart.js 4.4.0 | cdnjs.cloudflare.com |
| Fraunces, DM Sans, JetBrains Mono | Google Fonts |

---

## 🎨 Design Tokens

Edit `css/variables.css` to retheme the entire site:

```css
--teal:  #00c8a0;   /* Primary accent */
--gold:  #e8b84b;   /* Secondary accent */
--rose:  #ff6b7a;   /* Danger/highlight */
--blue:  #5b9cf6;   /* Info */
--ink:   #08090f;   /* Background */
--cream: #f0ede6;   /* Text */
```

---

## ✏️ Customisation Checklist

- [ ] Replace email in Contact section (`index.html`) with your real address
- [ ] Add your photo to `assets/images/` and reference it in About section
- [ ] Update GitHub/LinkedIn URLs if needed
- [ ] Update project links once hosted on GitHub Pages / Vercel
- [ ] Add resume PDF link to a CTA button

---

## 🌐 Deployment (Free)

**GitHub Pages:**
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Deploy from branch `main` / root
3. Access at `https://yourusername.github.io/gowtham-portfolio`

**Vercel (drag & drop):**
1. Visit vercel.com → New Project → drag the folder
2. Done — instant HTTPS URL

---

## 📝 License
Personal portfolio project — © 2025 Gowtham Sai Kumar
