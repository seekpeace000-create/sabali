# Sabali — marketing site + interactive demo

A deployable front-end for Sabali: the marketing site plus a clickable, in-browser
ERP demo. Use this to show people what Sabali is and collect interest. It is **not**
the production ERP yet (see "What this is NOT" below).

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This creates a `dist/` folder of static files you can host anywhere.
Preview the built version with `npm run preview`.

## Publish it (pick one — all have free tiers)

**Vercel or Netlify (easiest):**
1. Push this folder to a GitHub repo.
2. In Vercel/Netlify, "Import" the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
4. Deploy. You get a live URL in ~1 minute, plus a spot to connect your own domain.

**Cloudflare Pages / GitHub Pages / any static host:**
- Run `npm run build` and upload the contents of `dist/`.

## What this IS

- The full marketing site (hero, features, pricing, footer).
- A working, interactive ERP demo running entirely in the browser:
  sales orders draw down inventory and raise invoices, purchase orders restock,
  the dashboard and reports recompute live.
- A simulated sign-up + "provisioning" animation.

## What this is NOT (yet)

This is a front-end prototype. Before charging customers and storing real business
data, you still need:

- A **backend + database** so data persists (right now it resets on refresh).
- Real **authentication** (login, password reset, roles).
- **Multi-tenancy** — your "an environment per customer" model. The sign-up flow here
  only *simulates* provisioning.
- **Subscription billing** (e.g. Stripe) to actually collect the monthly fee.
- Backups, monitoring, and security hardening.

Treat the live site as a way to validate demand and gather sign-ups while the
production system above gets built.

## Where the code lives

- `src/App.jsx` — the entire app (marketing + demo ERP). Edit copy, pricing,
  and sample data here.
- `index.html` — page title and meta description (good for SEO/social previews).
