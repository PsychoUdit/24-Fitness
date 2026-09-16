import { MessageCircle } from 'lucide-react'
import InstagramIcon from './InstagramIcon.tsx'
import { site } from '../config/site.ts'

const footerLinks = [
  { href: '#classes', label: 'Classes' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#location', label: 'Location' },
  { href: '#trial', label: 'Book a trial' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#home" className="brand">
          <span className="brand-24">24</span>
          <span className="brand-name">{site.brand.name.toUpperCase()}</span>
        </a>

        <nav className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="social-row">
          {site.contact.instagramUrl && (
            <a
              href={site.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          )}
          <a
            href={`https://wa.me/${site.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} {site.footer.copyrightName} · {site.footer.madeIn}
        </p>
      </div>
    </footer>
  )
}