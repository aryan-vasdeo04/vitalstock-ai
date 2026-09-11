# VitalStock AI — Hospital Operations Intelligence

A Next.js app with a landing page, admin login gate, and the full hospital operations ML dashboard
(inventory stockout risk, bed capacity, medicine clustering & expiry risk, cost impact).

**The chatbot is OFF by default.** Everything else — all 3 ML models, K-Means clustering, the ROI
calculator, Command Center — runs entirely in the browser and costs nothing to host or run, forever,
on Vercel's free tier.

This has already been verified locally: `npm install` and `npm run build` both succeed, and the
production server serves all pages (`/`, `/login`, `/dashboard`, `/api/chat`) correctly.

## App structure

- `pages/index.js` — **Landing page**: explains the project, links to login
- `pages/login.js` — **Admin login**: hardcoded credentials (see below), stores a session flag
- `pages/dashboard.js` — **The dashboard itself**: checks the session flag on load, redirects to
  `/login` if not authenticated
- `components/StockoutRiskDashboard.jsx` — the full dashboard (Inventory, Bed Capacity, Medicine
  Clusters & Workbench, Cost & Impact)
- `pages/api/chat.js` — serverless proxy for the (currently disabled) chatbot

### Login credentials (hardcoded, for this demo)

- Email: `abc@gmail.com`
- Password: `Group1`

Any other email/password combination is rejected with a clear error message. This is intentionally
simple (client-side check, session stored in `sessionStorage`) — fine for a course demo, **not**
meant to be real authentication security for production use with sensitive data.

## 1. Run it locally first (optional but recommended)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on the overview page, click through to `/login`, sign in
with the credentials above, and reach the dashboard.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: VitalStock AI dashboard"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't — github.com → New repository.)

## 3. Deploy on Vercel (free, chatbot off)

1. Go to https://vercel.com and sign in (GitHub login is easiest)
2. Click **Add New → Project**, then select your GitHub repo
3. Vercel auto-detects Next.js — leave the default build settings as-is
4. Click **Deploy** — no environment variables needed for this step
5. Vercel gives you a live URL like `https://your-project.vercel.app`

That's the whole deployment. Free, permanent, no card, no chatbot risk.

## 4. Turning the chatbot on later (optional, when you're ready)

1. Get a free API key at https://console.anthropic.com/settings/keys — new accounts get a one-time
   ~$5 trial credit, no card required (phone verification only). Once you use it up, further calls
   cost real money, so consider setting a spend/usage limit in the Console under Billing.
2. In Vercel → your project → **Settings → Environment Variables**, add both:
   - `ANTHROPIC_API_KEY` = your real key
   - `NEXT_PUBLIC_CHAT_ENABLED` = `true`
3. Go to **Deployments** and redeploy (or just push any small change to trigger one)
4. The chat bubble now appears bottom-right and works

You can flip `NEXT_PUBLIC_CHAT_ENABLED` back to `false` (or delete it) at any time to turn the
chatbot back off without touching any code.

## Known non-blocking note

`npm audit` flags some advisories in Next.js 14.2.x related to Server Actions, Middleware, and Image
Optimization — none of which this project uses (it's a Pages Router app with one simple API route
and no image optimization, middleware, or server actions), so these don't apply to how this app is
actually built. Upgrading to Next.js 15/16 would clear the audit warnings but risks breaking-change
work this project doesn't need for a course deployment.
