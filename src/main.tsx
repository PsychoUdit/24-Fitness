import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const root = document.getElementById('root')!

if (!domain || !clientId) {
  createRoot(root).render(
    <StrictMode>
      <div className="auth-error">
        Auth0 is not configured. Please set `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID`.
      </div>
    </StrictMode>,
  )
} else {
  createRoot(root).render(
    <StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          ...(audience ? { audience } : {}),
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>,
  )
}
