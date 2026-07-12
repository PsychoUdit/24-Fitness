import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

if (!domain || !clientId) {
  // Demo mode: render the app without Auth0 so the UI is visible for demos.
  // In production, set `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` as env vars.
  console.warn('Auth0 not configured — running in demo mode (no auth).')
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience,
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>,
  )
}
