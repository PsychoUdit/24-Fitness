import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.tsx'
import Hero from '../components/Hero.tsx'
import About from '../components/About.tsx'
import Classes from '../components/Classes.tsx'
import Schedule from '../components/Schedule.tsx'
import Pricing from '../components/Pricing.tsx'
import Contact from '../components/Contact.tsx'
import Footer from '../components/Footer.tsx'

export default function Home() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogin={() => loginWithRedirect()}
        onLogout={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        onDashboard={() => navigate('/dashboard')}
      />
      <Hero />
      <About />
      <Classes />
      <Schedule />
      <Pricing />
      <Contact />
      <Footer />
    </>
  )
}
