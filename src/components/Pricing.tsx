const plans = [
  {
    name: 'Basic',
    price: '29',
    period: '/month',
    features: [
      'Gym access 5am-10pm',
      'Basic equipment',
      'Locker room access',
      'Free Wi-Fi',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '49',
    period: '/month',
    features: [
      '24/7 gym access',
      'All equipment',
      'Group classes',
      'Locker & shower',
      '1 free PT session',
      'Sauna access',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '79',
    period: '/month',
    features: [
      '24/7 unlimited access',
      'All equipment & classes',
      '8 PT sessions/month',
      'Locker, shower & sauna',
      'Nutrition plan',
      'Free guest pass',
      'Priority booking',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <h2 className="section-title">Choose Your Plan</h2>
        <p className="section-subtitle">
          Flexible membership options designed to fit your lifestyle and budget.
        </p>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}
            >
              {plan.highlighted && <span className="popular-badge">Most Popular</span>}
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price">${plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-dark'}`}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
