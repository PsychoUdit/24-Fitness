import { site } from '../config/site.ts'

export default function Classes() {
  return (
    <section id="classes" className="section">
      <div className="container">
        <p className="section-kicker">Classes</p>
        <h2 className="section-title" data-reveal>
          What you can train
        </h2>
        <p className="section-subtitle" data-reveal>
          {site.classes.note}.
        </p>
        <div className="card-grid" data-reveal>
          {site.classes.items.map((cls) => (
            <div className="card" key={cls.name}>
              <h3 className="card-title">{cls.name}</h3>
              <p className="card-desc">{cls.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}