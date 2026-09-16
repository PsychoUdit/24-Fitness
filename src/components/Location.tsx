import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import InstagramIcon from './InstagramIcon.tsx'
import { siteConfig } from '../config/siteConfig'

function waLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Location() {
  return (
    <section id="location" className="section">
      <div className="container">
        <p className="section-kicker">Visit</p>
        <h2 className="section-title" data-reveal>
          Where to find us
        </h2>
        <div className="location-grid" data-reveal>
          <div className="location-card">
            <h3>Address</h3>
            <div className="location-line">
              <MapPin size={18} />
              <span>{siteConfig.contact.address}</span>
            </div>
            <div className="location-actions">
              <a href={siteConfig.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                Get directions
              </a>
              {siteConfig.contact.instagramUrl && (
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <InstagramIcon size={15} />
                  Instagram
                </a>
              )}
            </div>
          </div>

          <div className="location-card">
            <h3>Hours &amp; contact</h3>
            <div className="location-line">
              <Clock size={18} />
              <span>{siteConfig.hours.floor}</span>
            </div>
            <div className="location-line" style={{ fontSize: '0.85em', opacity: 0.8 }}>
              <span style={{ marginLeft: 26 }}>Staff: {siteConfig.hours.staff}</span>
            </div>
            <div className="location-line">
              <Phone size={18} />
              <a href={`tel:${siteConfig.contact.phoneTel}`} style={{ color: 'inherit' }}>
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
            <div className="location-line">
              <MessageCircle size={18} />
              <a href={waLink('Hi 24 Fitness, I have a quick question.')} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
