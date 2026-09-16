import { useState } from 'react'
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { siteConfig, buildWhatsAppLeadUrl } from '../config/siteConfig'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredTime, setPreferredTime] = useState('Evening (5:00 PM - 10:00 PM)')
  const [goal, setGoal] = useState('Fat Loss & Toning')
  const [submitted, setSubmitted] = useState(false)
  const [waLink, setWaLink] = useState('')
  const [error, setError] = useState('')

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter your full name')
      return
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setError('')

    const url = buildWhatsAppLeadUrl({
      name,
      phone: cleanPhone,
      goal,
      preferredTime,
      plan: '1-Day Free Trial Pass (Contact Section)',
    })

    setWaLink(url)
    setSubmitted(true)
    window.open(url, '_blank')
  }

  return (
    <section id="contact" className="section-contact">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Location & Contact</span>
          <h2>Visit the Gym or Claim Your Trial</h2>
          <p className="section-subtitle">
            Walk in anytime during staffed hours or send a quick WhatsApp message to reserve your pass.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Details & Location */}
          <div className="contact-info-panel">
            <h3>Gym Details</h3>
            <p className="info-lead">
              Centrally located with dedicated parking and biometric access for all active members.
            </p>

            <div className="contact-detail-items">
              <div className="detail-item">
                <div className="detail-icon-box">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>{siteConfig.address}</p>
                  <p>{siteConfig.city}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      `${siteConfig.gymName} ${siteConfig.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon-box">
                  <Clock size={20} />
                </div>
                <div>
                  <h4>Facility Hours</h4>
                  <p><strong>Gym Floor:</strong> Open 24/7, 365 Days</p>
                  <p><strong>Staff & Trainers:</strong> Mon – Sat: 6:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon-box">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Direct Call / WhatsApp</h4>
                  <p>{siteConfig.displayPhone}</p>
                  <div className="quick-action-buttons">
                    <a
                      href={`tel:${siteConfig.displayPhone.replace(/\s+/g, '')}`}
                      className="btn btn-outline btn-sm"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp-direct btn-sm"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inline Trial Booking Form (Replaces heavy third-party iframe) */}
          <div className="contact-form-panel">
            {!submitted ? (
              <>
                <div className="form-panel-header">
                  <span className="badge-promo">Instant Free Pass</span>
                  <h3>Book Free 1-Day Trial</h3>
                  <p>Fill in your details to generate your digital guest pass.</p>
                </div>

                {error && <div className="lead-modal-error">{error}</div>}

                <form onSubmit={handleInlineSubmit} className="inline-lead-form">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Amit Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone">Mobile / WhatsApp Number *</label>
                    <div className="phone-input-wrap">
                      <span className="country-code">+91</span>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="9876543210"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-goal">Fitness Goal</label>
                      <select
                        id="contact-goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                      >
                        <option value="Fat Loss & Toning">Fat Loss & Toning</option>
                        <option value="Muscle & Strength Building">Muscle & Strength Building</option>
                        <option value="Cardio & Stamina">Cardio & Stamina</option>
                        <option value="General Health">General Health</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-time">Preferred Visit Time</label>
                      <select
                        id="contact-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                      >
                        <option value="Morning (6:00 AM - 10:00 AM)">Morning (6 - 10 AM)</option>
                        <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12 - 4 PM)</option>
                        <option value="Evening (5:00 PM - 10:00 PM)">Evening (5 - 10 PM)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary-lead w-full">
                    <span>Send Trial Request on WhatsApp</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="form-guarantee-note">
                    <ShieldCheck size={16} />
                    <span>No membership commitment • 100% Free Trial Visit</span>
                  </div>
                </form>
              </>
            ) : (
              <div className="lead-success-state">
                <CheckCircle2 size={48} className="icon-success" />
                <h3>Trial Request Created!</h3>
                <p>
                  Your free trial pass request is ready. If WhatsApp did not open automatically, tap below to send:
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-direct w-full"
                >
                  <MessageSquare size={18} />
                  <span>Open WhatsApp Message</span>
                </a>
                <button
                  type="button"
                  className="btn-secondary-link mt-3"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}