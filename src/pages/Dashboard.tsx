import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

const trainingHistory = [
  { date: 'Jul 10, 2026', type: 'HIIT', duration: '45 min', trainer: 'Alex' },
  { date: 'Jul 8, 2026', type: 'Strength', duration: '60 min', trainer: 'Jordan' },
  { date: 'Jul 6, 2026', type: 'Spin', duration: '45 min', trainer: 'Sam' },
  { date: 'Jul 4, 2026', type: 'Yoga', duration: '60 min', trainer: 'Taylor' },
]

export default function Dashboard() {
  const { user, logout } = useAuth0()

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="container dashboard-header-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">24</span>
            <span className="logo-sub">FITNESS</span>
          </Link>

          <div className="dashboard-header-right">
            <Link to="/" className="dashboard-home-link">Home</Link>
            <button
              className="btn btn-outline btn-small"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="container dashboard-main">
        <div className="dashboard-greeting">
          <div className="dashboard-avatar">
            {user?.given_name?.charAt(0)?.toUpperCase() || 'M'}
          </div>
          <div>
            <h1 className="dashboard-welcome">
              Welcome back{user?.given_name ? `, ${user.given_name}` : ''}
            </h1>
            <p className="dashboard-subtitle">
              {user?.email && <>{user.email} &middot; </>}
              Member since July 2026
            </p>
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <p className="card-label">Membership</p>
            <p className="card-value card-value-accent">Standard</p>
            <p className="card-meta">Active plan</p>
          </div>
          <div className="dashboard-card">
            <p className="card-label">Visits This Month</p>
            <p className="card-value">14</p>
            <p className="card-meta card-meta-green">+3 from last month</p>
          </div>
          <div className="dashboard-card">
            <p className="card-label">Member Status</p>
            <p className="card-value card-value-green">Active</p>
            <p className="card-meta">Paid through Aug 12, 2026</p>
          </div>
        </div>

        <section>
          <h2 className="dashboard-section-title">Training History</h2>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th>Duration</th>
                  <th>Trainer</th>
                </tr>
              </thead>
              <tbody>
                {trainingHistory.map((session, i) => (
                  <tr key={i}>
                    <td>{session.date}</td>
                    <td>{session.type}</td>
                    <td className="table-muted">{session.duration}</td>
                    <td className="table-muted">{session.trainer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
