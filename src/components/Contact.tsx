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

          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}
