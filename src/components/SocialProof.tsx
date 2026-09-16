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

const testimonials = [
  {
    name: 'Vikram Singh',
    achievement: 'Lost 12 kg in 4 months',
    rating: 5,
    quote:
      'The 24/7 access is a game changer for my night shift schedule. The trainers actually guide your form instead of pushing unnecessary personal training packages.',
    tag: 'Strength & Conditioning',
  },
  {
    name: 'Pooja Mehta',
    achievement: 'Regular for 1.5 years',
    rating: 5,
    quote:
      'Best equipment in the area. Very clean environment, great ventilation, and the crowd is respectful. Started with the 1-day free trial and never left.',
    tag: 'Fat Loss & HIIT',
  },
  {
    name: 'Aman Verma',
    achievement: 'Gained 7 kg lean muscle',
    rating: 5,
    quote:
      'Top-notch heavy dumbbells and squat racks. If you are serious about lifting or bodybuilding, this is the only gym worth your time here.',
    tag: 'Hypertrophy & Powerlifting',
  },
]

export default function SocialProof({ onOpenModal }: SocialProofProps) {
  return (
    <section className="section-social-proof" id="community">
      <div className="container">
        {/* Instagram Audience Callout */}
        <div className="instagram-banner">
          <div className="instagram-banner-content">
            <div className="instagram-badge">
              <InstagramIcon size={20} />
              <span>Official Instagram</span>
            </div>
            <h3>Join 240+ Members in Our Fitness Community</h3>
            <p>
              Follow <strong>@{siteConfig.instagramHandle}</strong> for daily workout clips, member
              transformations, and motivation.
            </p>
          </div>
          <div className="instagram-banner-action">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <InstagramIcon size={18} />
              <span>View @{siteConfig.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-tag">Real Member Stories</span>
          <h2>Loved by Serious Lifters & Beginners Alike</h2>
          <div className="rating-summary">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="star-filled" />
              ))}
            </div>
            <span>
              <strong>4.9 / 5.0</strong> based on 180+ member reviews
            </span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
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

        {/* Mid-page conversion nudge */}
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
