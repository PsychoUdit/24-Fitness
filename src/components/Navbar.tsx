import { useState, useEffect } from 'react'

interface NavbarProps {
  isAuthenticated: boolean
  onLogin: () => void
  onLogout: () => void
  onDashboard: () => void
}

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#classes', label: 'Classes' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ isAuthenticated, onLogin, onLogout, onDashboard }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <span className="logo-text">24</span>
          <span className="logo-sub">FITNESS</span>
        </a>

        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-auth">
            {isAuthenticated ? (
              <>
                <button className="btn btn-primary nav-cta" onClick={onDashboard}>
                  Dashboard
                </button>
                <button className="btn btn-outline nav-cta" onClick={onLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <button className="btn btn-primary nav-cta" onClick={onLogin}>
                Sign In
              </button>
            )}
          </li>
        </ul>

        {isAuthenticated ? (
          <div className="nav-right">
            <button className="btn btn-primary nav-cta nav-desktop-only" onClick={onDashboard}>
              Dashboard
            </button>
            <button className="nav-icon-btn" onClick={onLogout} title="Sign Out">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <button className="btn btn-primary nav-cta nav-desktop-only" onClick={onLogin}>
            Join Now
          </button>
        )}

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
