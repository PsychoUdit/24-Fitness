import { useState, useEffect } from 'react'
import { X, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Clock } from 'lucide-react'
import { buildWhatsAppLeadUrl } from '../config/siteConfig'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlan?: string
  initialClass?: string
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  initialPlan = '',
  initialClass = '',
}: LeadCaptureModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [goal, setGoal] = useState('Fat Loss & Toning')
  const [preferredTime, setPreferredTime] = useState('Evening (5:00 PM - 10:00 PM)')
  const [plan, setPlan] = useState(initialPlan)
  const [error, setError] = useState('')
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setPlan(initialPlan)
      setError('')
      setSubmittedUrl(null)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialPlan])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
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

    const fullPlanDescription = initialClass
      ? `Trial for Class: ${initialClass}`
      : plan || '1-Day Free Trial Pass'

    const waUrl = buildWhatsAppLeadUrl({
      name,
      phone: cleanPhone,
      goal,
      preferredTime,
      plan: fullPlanDescription,
    })

    setSubmittedUrl(waUrl)

    // Attempt to open WhatsApp
    window.open(waUrl, '_blank')
  }

  return (
    <div className="lead-modal-overlay" onClick={onClose}>
      <div className="lead-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="lead-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!submittedUrl ? (
          <>
            <div className="lead-modal-header">
              <span className="badge-promo">⚡ Limited Free Passes</span>
              <h2>Book Your Free 1-Day Trial</h2>
              <p className="lead-modal-subtitle">
                Experience 24-Fitness with zero commitment. Workout, meet the coaches, and try any class.
              </p>
            </div>

            {error && <div className="lead-modal-error">{error}</div>}

            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <label htmlFor="lead-name">Your Full Name *</label>
                <input
                  id="lead-name"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lead-phone">Mobile / WhatsApp Number *</label>
                <div className="phone-input-wrap">
                  <span className="country-code">+91</span>
                  <input
                    id="lead-phone"
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
                  <label htmlFor="lead-goal">Primary Fitness Goal</label>
                  <select
                    id="lead-goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="Fat Loss & Toning">Fat Loss & Toning</option>
                    <option value="Muscle & Strength Building">Muscle & Strength Building</option>
                    <option value="Cardio & Stamina">Cardio & Stamina</option>
                    <option value="General Health & Fitness">General Health & Fitness</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="lead-time">Preferred Visit Time</label>
                  <select
                    id="lead-time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  >
                    <option value="Morning (6:00 AM - 10:00 AM)">Morning (6 - 10 AM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12 - 4 PM)</option>
                    <option value="Evening (5:00 PM - 10:00 PM)">Evening (5 - 10 PM)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn-primary-lead">
                <span>Confirm on WhatsApp</span>
                <ArrowRight size={18} />
              </button>

              <div className="lead-guarantees">
                <div className="guarantee-item">
                  <ShieldCheck size={16} />
                  <span>No payment needed • 100% Free</span>
                </div>
                <div className="guarantee-item">
                  <Clock size={16} />
                  <span>Instant confirmation on WhatsApp</span>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="lead-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="icon-success" />
            </div>
            <h3>Trial Booking Ready!</h3>
            <p>
              We've created your pre-filled trial pass message for the gym team on WhatsApp.
            </p>

            <a
              href={submittedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-direct"
            >
              <MessageSquare size={20} />
              <span>Open in WhatsApp</span>
            </a>

            <button type="button" className="btn-secondary-link" onClick={onClose}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
