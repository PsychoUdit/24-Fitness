# 24-Fitness — Conversion Landing Page (pilot)

A single-page conversion site for **24 Fitness Gym & Health Center**, Pipliyahana, Indore.
It sits **in front of** the owner's existing CMS (DGymBook) — it does not replace it, and it
touches no member data, no payments, and no access control.

**The job of this page:** turn gym visitors into WhatsApp leads for a free trial class.

---

## Stack

Vite + React + TypeScript. No router, no auth, no 3D, no animation library —
just CSS transitions + one IntersectionObserver for scroll reveals.
Keeping dependencies tiny is what keeps the page under ~2.5s on 4G.

## Run locally

```
npm install
npm run dev
```

## Build & deploy

```
npm run build    # tsc + vite build -> dist/
npm run preview  # serve the production build locally
```

Deployment stays SPA-friendly via the existing SPA rewrites
(`vercel.json` / `netlify.toml`).

## Edit the content

**Everything user-facing lives in one file:** `src/config/site.ts`.

Search it for `TODO:` — those are the four items you must confirm with the gym owner
before the pilot is worth pitching:

1. **Trial offer** (`site.trial`) — is a free trial class real? How many sessions?
2. **Hours** (`site.hours`) — 24/7 or 6am–10pm? Never guess; the two sources conflict.
3. **Pricing** (`site.pricing`) — real plans + prices in INR. Never publish the conflicting numbers.
4. **Lead handling** (`site.leads`) — who actually replies to WhatsApp DMs today?

Until an item is `confirmed: true`, that section renders a safe
"message us on WhatsApp" state instead of invented numbers.

Other editable values: address, phone, WhatsApp number, Instagram URL, rating,
class list, and testimonial slots.

## Environment variables

Copy `.env.example` to `.env.local` if you need to override the WhatsApp number
at build time:

```
VITE_WHATSAPP_NUMBER=916265119262
```

If unset, the number in `src/config/site.ts` is used.

## How leads work (no backend)

The form asks for name, phone, and preferred time. On submit it opens
`https://wa.me/<number>?text=<pre-filled message>` in a new tab.
The owner receives a structured message in his existing WhatsApp. Nothing is
stored by this site.

## Pilot framing

This is a 2–4 week pilot. Success = a measurable lead/conversion rate you can
point to, not "it looks nicer." If the pilot doesn't produce more leads than the
current setup, the pitch stops there.