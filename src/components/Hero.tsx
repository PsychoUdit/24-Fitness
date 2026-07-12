export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-badge">#1 Gym in Town</span>
        <h1 className="hero-title">
          Transform Your <span className="highlight">Body</span>
          <br />
          Transform Your <span className="highlight">Life</span>
        </h1>
        <p className="hero-desc">
          Join 24 Fitness and unlock your full potential with world-class equipment,
          expert trainers, and a community that pushes you to be your best.
        </p>
        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary">Start Your Journey</a>
          <a href="#classes" className="btn btn-outline">Explore Classes</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Active Members</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Expert Trainers</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Open Hours</span>
          </div>
          <div className="stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">Classes Weekly</span>
          </div>
        </div>
      </div>
    </section>
  )
}
