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

## Environment variables

The app uses Auth0 for login. Set these in your `.env.local` file (or
in the Vercel dashboard):

```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

The `.env.local` file is not committed to git.
