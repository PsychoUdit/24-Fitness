import { site } from '../config/site.ts'

export default function Testimonials() {
  const { confirmed, items } = site.testimonials

  return (
    <section id="reviews" className="section">
      <div className="container">
        <p className="section-kicker">Reviews</p>
        <h2 className="section-title" data-reveal>
          What members say
        </h2>

        {confirmed && items.length > 0 ? (
          <div className="card-grid" data-reveal>
            {items.map((item, i) => (
              <figure className="card testimonial" key={i}>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="section-subtitle" data-reveal style={{ marginBottom: 0 }}>
            {site.testimonials.emptyNote}. You can already check our Google &amp; Justdial rating:{' '}
            <strong style={{ color: 'var(--text-strong)' }}>~{site.rating}/5</strong>.
          </p>
        )}
      </div>
    </section>
  )
}