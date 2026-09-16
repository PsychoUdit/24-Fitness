import { MessageCircle } from 'lucide-react'
import InstagramIcon from './InstagramIcon.tsx'
import { siteConfig } from '../config/siteConfig'

const footerLinks = [
  { href: '#classes', label: 'Classes' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#home" className="brand">
          <span className="brand-24">24</span>
          <span className="brand-name">{siteConfig.brand.name.toUpperCase()}</span>
        </a>

        <nav className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="social-row">
          {siteConfig.contact.instagramUrl && (
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          )}
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} {siteConfig.footer.copyrightName} · {siteConfig.footer.madeIn}
        </p>
      </div>
    </footer>
  )
}
