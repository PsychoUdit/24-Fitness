# 24-Fitness

A Gym Website

This project is a Vite + React app. Quick deployment steps for Vercel are below.

## Deploy to Vercel (recommended)

1. Install the Vercel CLI (optional):

```
npm i -g vercel
```

2. Log in and deploy from the project root:

```
vercel login
vercel --prod
```

Vercel will run `npm run build` (which calls `tsc && vite build`) and publish the `dist` folder.

Alternatively, connect your Git provider in the Vercel dashboard and pick this repository — Vercel will detect the project and use the `build` script.
