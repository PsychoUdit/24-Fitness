export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">24</span>
              <span className="logo-sub">FITNESS</span>
            </div>
            <p>
              Transform your body, transform your life. Join the 24 Fitness community
              and unlock your full potential.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="YouTube">▶️</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#classes">Classes</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Classes</h4>
            <ul>
              <li><a href="#classes">HIIT Training</a></li>
              <li><a href="#classes">Power Yoga</a></li>
              <li><a href="#classes">Spin Cycle</a></li>
              <li><a href="#classes">Boxing Fitness</a></li>
              <li><a href="#classes">Zumba Dance</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul>
              <li>123 Fitness Blvd, NY</li>
              <li>+1 (555) 123-4567</li>
              <li>info@24fitness.com</li>
              <li>Open 24/7</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 24 Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
