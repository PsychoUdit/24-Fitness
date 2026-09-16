import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import InstagramIcon from './InstagramIcon.tsx'
import { site } from '../config/site.ts'

function waLink(message: string) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Location() {
  const hoursOpen = site.hours.confirmed && site.hours.label
  const hoursText = hoursOpen ? site.hours.label : 'Opening hours — ask on WhatsApp'

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
              <span>{site.contact.address}</span>
            </div>
            <div className="location-actions">
              <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                Get directions
              </a>
              {site.contact.instagramUrl && (
                <a
                  href={site.contact.instagramUrl}
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
              <span>{hoursText}</span>
            </div>
            <div className="location-line">
              <Phone size={18} />
              <a href={`tel:${site.contact.phoneTel}`} style={{ color: 'inherit' }}>
                {site.contact.phoneDisplay}
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