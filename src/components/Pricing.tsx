import { Check, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

function waLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Pricing() {
  const { plans } = siteConfig.pricing

  return (
    <section id="pricing" className="section">
      <div className="container">
        <p className="section-kicker">{siteConfig.pricing.tag}</p>
        <h2 className="section-title" data-reveal>
          {siteConfig.pricing.title}
        </h2>
        <p className="section-subtitle" data-reveal>
          {siteConfig.pricing.subtitle}
        </p>

        {plans.length > 0 ? (
          <div className="card-grid pricing-grid" data-reveal>
            {plans.map((plan) => (
              <div className={`card plan-card ${plan.popular ? 'plan-popular' : ''}`} key={plan.name}>
                {plan.popular && <div className="plan-popular-badge">Most Popular</div>}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-price">
                  {plan.price} <span className="plan-period">{plan.period}</span>
                </p>
                <p className="plan-tagline">{plan.tagline}</p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#trial" className="btn btn-primary">
                  {siteConfig.trial.ctaLabel}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="pricing-neutral" data-reveal>
            <p>
              Membership prices and current plans — message us on WhatsApp and we'll tell you exactly what's
              available right now.
            </p>
            <a
              href={waLink('Hi 24 Fitness, want to know your membership plans and prices.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              Ask about prices on WhatsApp
            </a>
          </div>
        )}

        <p className="pricing-guarantee" data-reveal>
          {siteConfig.pricing.guarantee}
        </p>
      </div>
    </section>
  )
}
