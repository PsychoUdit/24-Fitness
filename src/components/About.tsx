export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">Why Choose 24 Fitness?</h2>
        <p className="section-subtitle">
          We're more than just a gym — we're a community dedicated to helping you achieve your fitness goals.
        </p>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🏋️</div>
            <h3>State-of-the-Art Equipment</h3>
            <p>Premium machines and free weights from top brands, regularly maintained and upgraded.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">👨‍🏫</div>
            <h3>Expert Trainers</h3>
            <p>Certified professionals with years of experience to guide you every step of the way.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🕐</div>
            <h3>Open 24/7</h3>
            <p>Train whenever you want — we're always open, every day of the year.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🧘</div>
            <h3>Diverse Classes</h3>
            <p>From yoga to HIIT, Zumba to spin — find the class that fits your vibe.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🅿️</div>
            <h3>Free Parking</h3>
            <p>Ample parking space with 24/7 access for all our members.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🧴</div>
            <h3>Premium Amenities</h3>
            <p>Locker rooms, showers, sauna, and towel service included with every membership.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
