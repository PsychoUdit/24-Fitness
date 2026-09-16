import { siteConfig } from '../config/siteConfig'

export default function Testimonials() {
  const { items } = siteConfig.testimonials

  return (
    <section id="reviews" className="section">
      <div className="container">
        <p className="section-kicker">{siteConfig.socialProof.tag}</p>
        <h2 className="section-title" data-reveal>
          {siteConfig.socialProof.title}
        </h2>
        <p className="section-subtitle" data-reveal>
          {siteConfig.socialProof.ratingValue}/5.0 based on {siteConfig.socialProof.reviewCount}
        </p>

        {items.length > 0 ? (
          <div className="card-grid" data-reveal>
            {items.map((item, i) => (
              <figure className="card testimonial" key={i}>
                <blockquote>"{item.quote}"</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span className="testimonial-achievement" style={{ display: 'block', fontSize: '0.85em', opacity: 0.7 }}>
                    {item.achievement}
                  </span>
                  {item.tag && (
                    <span className="testimonial-tag" style={{ display: 'inline-block', marginTop: '0.3rem', fontSize: '0.75rem', padding: '0.15em 0.5em', borderRadius: '4px', background: 'var(--accent-subtle, rgba(255,46,46,0.15))', color: 'var(--accent, #ff2e2e)' }}>
                      {item.tag}
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="section-subtitle" data-reveal style={{ marginBottom: 0 }}>
            Member reviews coming soon. Check our Google &amp; Justdial rating:{' '}
            <strong style={{ color: 'var(--text-strong)' }}>~{siteConfig.rating}/5</strong>.
          </p>
        )}
      </div>
    </section>
  )
}
