import { useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { site } from '../config/site.ts'

const timeSlots = ['No preference', 'Morning', 'Afternoon', 'Evening']

export default function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('No preference')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const message = [
      `Hi ${site.brand.name}! I'd like ${site.trial.confirmed ? 'a free trial class' : 'to know more about the gym'}.`,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Preferred time: ${time}`,
    ].join('\n')
    const url = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="trial" className="section lead-section">
      <div className="container">
        <p className="section-kicker">Start here</p>
        <h2 className="section-title" data-reveal>
          {site.trial.confirmed ? site.trial.ctaLabel : 'Talk to the gym on WhatsApp'}
        </h2>

        <div className="lead-wrap" data-reveal>
          {sent ? (
            <div className="form-success">
              <h3>Opening WhatsApp…</h3>
              <p>
                If WhatsApp didn't open, tap the button below and send the message yourself. {site.leads.replyNote}.
              </p>
              <a
                href={`https://wa.me/${site.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} />
                Open WhatsApp
              </a>
              <div className="what-next">
                <h4>What happens next</h4>
                <ol>
                  <li>Your WhatsApp opens with a message pre-filled to the gym.</li>
                  <li>The gym sees your name, number and preferred time directly.</li>
                  <li>No account is created, nothing is stored on this site.</li>
                </ol>
              </div>
            </div>
          ) : (
            <>
              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="lead-name">Name</label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lead-phone">Phone</label>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="lead-time">Preferred time</label>
                  <select id="lead-time" value={time} onChange={(e) => setTime(e.target.value)}>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  {site.trial.ctaLabel}
                </button>
              </form>
              <p className="lead-note">
                Submitting opens WhatsApp with a pre-filled message to the gym — nothing is stored on this site.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}