import { site } from '../config/site.ts'

const points = [
  {
    label: 'Where',
    text: 'Sampat Vihar, near Zodiac Mall, Scheme No. 140, Pipliyahana, Indore.',
  },
  {
    label: 'Reviews',
    text: `Rated ~${site.rating}/5 across Google & Justdial.`,
  },
  {
    label: 'No login',
    text: 'You message us on WhatsApp. No app, no portal, no account to keep track of.',
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-kicker">About</p>
        <h2 className="section-title" data-reveal>
          A neighbourhood gym in Pipliyahana
        </h2>
        <p className="section-subtitle" data-reveal>
          Independent, locally run, and right on your route home — not a chain. The simplest way to start is not a
          phone call with a sales desk. It's a WhatsApp message.
        </p>
        <div className="about-list" data-reveal>
          {points.map((point) => (
            <div className="about-item" key={point.label}>
              <strong>{point.label}</strong>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}