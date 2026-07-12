const classesData = [
  {
    title: 'HIIT Training',
    desc: 'High-intensity interval training to burn maximum calories in minimum time.',
    level: 'All Levels',
    duration: '45 min',
    image: '🔥',
  },
  {
    title: 'Power Yoga',
    desc: 'Build flexibility, strength, and balance with our dynamic yoga sessions.',
    level: 'Beginner+',
    duration: '60 min',
    image: '🧘',
  },
  {
    title: 'Spin Cycle',
    desc: 'High-energy indoor cycling with motivating music and expert instructors.',
    level: 'All Levels',
    duration: '45 min',
    image: '🚴',
  },
  {
    title: 'Boxing Fitness',
    desc: 'Pound away stress and build cardio with boxing-inspired workouts.',
    level: 'Intermediate',
    duration: '50 min',
    image: '🥊',
  },
  {
    title: 'Strength Training',
    desc: 'Build muscle and increase strength with guided resistance training.',
    level: 'All Levels',
    duration: '60 min',
    image: '💪',
  },
  {
    title: 'Zumba Dance',
    desc: 'Dance your way to fitness with fun, high-energy latin-inspired moves.',
    level: 'Beginner',
    duration: '50 min',
    image: '💃',
  },
]

export default function Classes() {
  return (
    <section id="classes" className="classes-section">
      <div className="container">
        <h2 className="section-title">Our Classes</h2>
        <p className="section-subtitle">
          Choose from a wide variety of classes designed for all fitness levels.
        </p>

        <div className="classes-grid">
          {classesData.map((cls) => (
            <div key={cls.title} className="class-card">
              <div className="class-icon">{cls.image}</div>
              <h3 className="class-title">{cls.title}</h3>
              <p className="class-desc">{cls.desc}</p>
              <div className="class-meta">
                <span>{cls.level}</span>
                <span>{cls.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
