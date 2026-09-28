# Forge — Gym Website

A dual-tone, dark-theme gym website. React (Vite) frontend with a live 3D hero
animation (Three.js / react-three-fiber) and letter-reveal animated headline
(Framer Motion), plus a Node/Express backend for the trial-class contact form.

## Design

- **Palette:** ink-navy `#10141A` + graphite `#171D24` surfaces, single brass
  accent `#C9A227` — deliberately not white, not the generic cream/terracotta
  or near-black/neon-green look.
- **Type:** Space Grotesk (display) + Manrope (body).
- **Motion, v2:** the hero 3D rig now responds to your pointer and to scroll
  (parallax tilt + a dollying camera + a drifting particle field), the
  headline reveals as masked lines rather than a letter fade, programs are a
  horizontal scroll-snap carousel (not a static grid), membership cards tilt
  in 3D toward the cursor with a following glow, there's a custom magnetic
  cursor, a scroll-progress bar, and a ticker marquee — built to feel driven
  by interaction rather than a one-shot fade-in template.

## Run it

Two servers: the Vite dev server (frontend) and Express (backend). Open two
terminals.

**Backend**
```bash
cd backend
npm install
npm run dev
# → http://localhost:4000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:4000`
(see `frontend/vite.config.js`), so the contact form works out of the box in
development.

## What's included

```
frontend/
  src/
    components/
      Hero3D.jsx          3D rotating plate-stack — react-three-fiber
      AnimatedHeadline.jsx  letter-by-letter text reveal — framer-motion
      Navbar.jsx, Programs.jsx, Stats.jsx, Trainers.jsx,
      Membership.jsx, ContactForm.jsx, Footer.jsx
    App.jsx / App.css     page assembly + design system (CSS variables)
backend/
  server.js              Express app
  routes/contact.js       POST /api/contact — trial-class request intake
```

## Before going live

- Swap the in-memory `submissions` array in `backend/routes/contact.js` for a
  real database (Postgres/MongoDB) or forward it to email/SMS/CRM.
- Add auth to `GET /api/contact` before deploying — it currently lists all
  submissions with no access control.
- Replace the placeholder gym name, address, phone number, and trainer names
  with the real ones.
- Run `npm run build` in `frontend/` for a production bundle, and put Express
  behind a real host (Render, Railway, a VPS with PM2/Nginx, etc.).
