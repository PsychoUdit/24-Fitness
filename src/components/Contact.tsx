export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Ready to start your fitness journey? Reach out to us today.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Visit Us</h4>
                <p>123 Fitness Boulevard,<br />New York, NY 10001</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email Us</h4>
                <p>info@24fitness.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <h4>Open Hours</h4>
                <p>24/7 — Every day of the year</p>
              </div>
            </div>
          </div>

          <iframe
            src="https://tally.so/embed/ZjKvO0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="400"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Contact form"
          />
        </div>
      </div>
    </section>
  )
}
