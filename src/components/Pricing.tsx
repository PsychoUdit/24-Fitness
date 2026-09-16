import { Check, MessageCircle } from 'lucide-react'
import { site } from '../config/site.ts'

function waLink(message: string) {
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function Pricing() {
  const { confirmed, plans } = site.pricing

  return (
    <section id="pricing" className="section">
      <div className="container">
        <p className="section-kicker">Membership</p>
        <h2 className="section-title" data-reveal>
          Plans &amp; pricing
        </h2>

        {confirmed && plans.length > 0 ? (
          <div className="card-grid pricing-grid" data-reveal>
            {plans.map((plan) => (
              <div className="card plan-card" key={plan.name}>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-price">
                  {plan.price}
                </p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#trial" className="btn btn-primary">
                  {site.trial.ctaLabel}
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
      </div>
    </section>
  )
}