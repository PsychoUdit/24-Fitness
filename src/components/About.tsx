import { siteConfig } from '../config/siteConfig'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-kicker">{siteConfig.about.tag}</p>
        <h2 className="section-title" data-reveal>
          {siteConfig.about.title}
        </h2>
        <p className="section-subtitle" data-reveal>
          {siteConfig.about.subtitle}
        </p>
        <div className="about-list" data-reveal>
          {siteConfig.about.benefits.map((point) => (
            <div className="about-item" key={point.id}>
              <strong>{point.title}</strong>
              <p>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
