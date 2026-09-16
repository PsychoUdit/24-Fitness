import { siteConfig } from '../config/siteConfig'

export default function Classes() {
  return (
    <section id="classes" className="section">
      <div className="container">
        <p className="section-kicker">{siteConfig.classes.tag}</p>
        <h2 className="section-title" data-reveal>
          {siteConfig.classes.title}
        </h2>
        <p className="section-subtitle" data-reveal>
          {siteConfig.classes.note}.
        </p>
        <div className="card-grid" data-reveal>
          {siteConfig.classes.items.map((cls) => (
            <div className="card" key={cls.name}>
              <h3 className="card-title">{cls.name}</h3>
              <p className="card-desc">{cls.desc}</p>
              {(cls.level || cls.duration || cls.intensity) && (
                <div className="card-meta" style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {cls.level && <span className="meta-tag" style={{ fontSize: '0.75rem', padding: '0.15em 0.5em', borderRadius: '4px', background: 'var(--accent-subtle, rgba(255,46,46,0.15))', color: 'var(--accent, #ff2e2e)' }}>{cls.level}</span>}
                  {cls.duration && <span className="meta-tag" style={{ fontSize: '0.75rem', padding: '0.15em 0.5em', borderRadius: '4px', background: 'var(--surface-alt, rgba(255,255,255,0.06))' }}>{cls.duration}</span>}
                  {cls.intensity && <span className="meta-tag" style={{ fontSize: '0.75rem', padding: '0.15em 0.5em', borderRadius: '4px', background: 'var(--surface-alt, rgba(255,255,255,0.06))' }}>{cls.intensity}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
