import { Star, Quote, ArrowRight, Award } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

interface SocialProofProps {
  onOpenModal: () => void
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function SocialProof({ onOpenModal }: SocialProofProps) {
  const { socialProof } = siteConfig

  return (
    <section className="section-social-proof" id="community">
      <div className="container">
        <div className="instagram-banner">
          <div className="instagram-banner-content">
            <div className="instagram-badge">
              <InstagramIcon size={20} />
              <span>Official Instagram</span>
            </div>
            <h3>{socialProof.instagramTitle}</h3>
            <p>
              Follow <strong>@{siteConfig.contact.instagramHandle}</strong> for {socialProof.instagramDesc.toLowerCase().replace('follow ', '')}
            </p>
          </div>
          <div className="instagram-banner-action">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <InstagramIcon size={18} />
              <span>View @{siteConfig.contact.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="section-header text-center">
          <span className="section-tag">{socialProof.tag}</span>
          <h2>{socialProof.title}</h2>
          <div className="rating-summary">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="star-filled" />
              ))}
            </div>
            <span>
              <strong>{socialProof.ratingValue} / 5.0</strong> based on {socialProof.reviewCount}
            </span>
          </div>
        </div>

        <div className="testimonials-grid">
          {socialProof.testimonials.map((item, idx) => (
            <div key={idx} className="testimonial-card">
              <Quote size={28} className="testimonial-quote-icon" />
              <p className="testimonial-text">"{item.quote}"</p>
              <div className="testimonial-footer">
                <div className="testimonial-author">
                  <h4>{item.name}</h4>
                  <span className="testimonial-achievement">{item.achievement}</span>
                </div>
                <span className="testimonial-tag">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="social-proof-cta-strip">
          <div className="cta-strip-text">
            <Award size={24} className="cta-strip-icon" />
            <div>
              <strong>Ready to see the gym in person?</strong>
              <p>Try any machine, take any class — completely free for your first visit.</p>
            </div>
          </div>
          <button className="btn-primary-lead btn-inline" onClick={onOpenModal}>
            <span>Claim Free 1-Day Pass</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
