import { useState, useEffect, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { gymState } from '../utils/gymState'
import type { GymMember, GymSuggestion, WorkoutLog } from '../utils/gymState'

export default function Dashboard() {
  const { user, logout } = useAuth0()
  
  // Resolve current active member email/details
  const activeEmail = user?.email || 'alex.jones@example.com'
  const activeName = user?.name || user?.given_name || 'Alex Jones'

  // View state
  const [role, setRole] = useState<'member' | 'owner'>('member')
  const [memberTab, setMemberTab] = useState<'overview' | 'log' | 'metrics' | 'feedback'>('overview')
  const [ownerTab, setOwnerTab] = useState<'analytics' | 'members' | 'suggestions'>('analytics')

  // Lists state loaded from localStorage
  const [members, setMembers] = useState<GymMember[]>([])
  const [suggestions, setSuggestions] = useState<GymSuggestion[]>([])
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([])

  // Refresh lists helper
  const refreshData = () => {
    setMembers(gymState.getMembers())
    setSuggestions(gymState.getSuggestions())
    setWorkouts(gymState.getWorkouts())
  }

  // Ensure current member is registered in state on load
  useEffect(() => {
    gymState.initialize()
    const existing = gymState.getMemberByEmail(activeEmail)
    if (!existing) {
      gymState.upsertMember({
        email: activeEmail,
        name: activeName,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        membership: 'Standard',
        status: 'Active',
        visitsThisMonth: 0,
        targetWorkoutsPerWeek: 4,
        currentWeight: 160,
        height: 68,
      })
    }
    refreshData()
  }, [activeEmail, activeName])

  // Current logged in member data
  const currentMember = useMemo(() => {
    return members.find(m => m.email.toLowerCase() === activeEmail.toLowerCase()) || null
  }, [members, activeEmail])

  // Workouts logged by current user
  const memberWorkouts = useMemo(() => {
    return workouts.filter(w => w.memberEmail.toLowerCase() === activeEmail.toLowerCase())
  }, [workouts, activeEmail])

  // Suggestions submitted by current user
  const memberSuggestions = useMemo(() => {
    return suggestions.filter(s => s.memberEmail.toLowerCase() === activeEmail.toLowerCase())
  }, [suggestions, activeEmail])

  // --- MEMBER PORTAL ACTIONS ---
  
  // Log Workout
  const [workoutType, setWorkoutType] = useState('Strength')
  const [workoutDuration, setWorkoutDuration] = useState('45')
  const [workoutCalories, setWorkoutCalories] = useState('350')
  const [workoutNotes, setWorkoutNotes] = useState('')

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault()
    if (!workoutDuration || isNaN(Number(workoutDuration))) return
    
    gymState.addWorkout({
      memberEmail: activeEmail,
      date: new Date().toISOString().split('T')[0],
      type: workoutType,
      duration: Number(workoutDuration),
      calories: Number(workoutCalories) || 0,
      notes: workoutNotes,
    })
    
    // reset form
    setWorkoutDuration('45')
    setWorkoutCalories('350')
    setWorkoutNotes('')
    refreshData()
  }

  // Submit Feedback
  const [suggestionCategory, setSuggestionCategory] = useState<'Class Request' | 'Equipment' | 'Facility Issue' | 'Other'>('Class Request')
  const [suggestionDesc, setSuggestionDesc] = useState('')

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!suggestionDesc.trim()) return

    gymState.addSuggestion({
      memberEmail: activeEmail,
      memberName: activeName,
      category: suggestionCategory,
      description: suggestionDesc,
      status: 'Pending',
    })

    setSuggestionDesc('')
    refreshData()
  }

  // Update Goals & Metrics
  const [weeklyGoal, setWeeklyGoal] = useState('4')
  const [currentWeightInput, setCurrentWeightInput] = useState('160')
  const [heightInput, setHeightInput] = useState('68')

  useEffect(() => {
    if (currentMember) {
      setWeeklyGoal(String(currentMember.targetWorkoutsPerWeek))
      setCurrentWeightInput(String(currentMember.currentWeight))
      setHeightInput(String(currentMember.height))
    }
  }, [currentMember])

  const handleUpdateMetrics = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMember) return

    gymState.upsertMember({
      ...currentMember,
      targetWorkoutsPerWeek: Number(weeklyGoal) || 3,
      currentWeight: Number(currentWeightInput) || 160,
      height: Number(heightInput) || 68,
    })
    refreshData()
    alert('Metrics updated successfully!')
  }

  // Calculate BMI
  const bmi = useMemo(() => {
    if (!currentMember || !currentMember.height || !currentMember.currentWeight) return 0
    // BMI = (weight in lbs * 703) / (height in inches)^2
    return parseFloat(((currentMember.currentWeight * 703) / Math.pow(currentMember.height, 2)).toFixed(1))
  }, [currentMember])

  const bmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: '#f59e0b' }
    if (val < 25) return { label: 'Normal Weight', color: '#22c55e' }
    if (val < 30) return { label: 'Overweight', color: '#f59e0b' }
    return { label: 'Obese', color: '#ef4444' }
  }

  // Weekly Goal Calculation
  const workoutsThisWeekCount = useMemo(() => {
    // Count workouts in past 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return memberWorkouts.filter(w => new Date(w.date) >= sevenDaysAgo).length
  }, [memberWorkouts])

  // --- OWNER PORTAL ACTIONS ---
  
  // Register New Member
  const [newMemName, setNewMemName] = useState('')
  const [newMemEmail, setNewMemEmail] = useState('')
  const [newMemPlan, setNewMemPlan] = useState<'Basic' | 'Standard' | 'Premium'>('Standard')

  const handleRegisterMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemName || !newMemEmail) return

    if (gymState.getMemberByEmail(newMemEmail)) {
      alert('A member with this email already exists!')
      return
    }

    gymState.upsertMember({
      email: newMemEmail,
      name: newMemName,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      membership: newMemPlan,
      status: 'Active',
      visitsThisMonth: 0,
      targetWorkoutsPerWeek: 3,
      currentWeight: 170,
      height: 68,
    })

    setNewMemName('')
    setNewMemEmail('')
    refreshData()
  }

  // Toggle member status (Active/Suspended)
  const handleToggleStatus = (email: string) => {
    const mem = gymState.getMemberByEmail(email)
    if (mem) {
      mem.status = mem.status === 'Active' ? 'Suspended' : 'Active'
      gymState.upsertMember(mem)
      refreshData()
    }
  }

  // Change member plan tier
  const handleChangePlan = (email: string, plan: 'Basic' | 'Standard' | 'Premium') => {
    const mem = gymState.getMemberByEmail(email)
    if (mem) {
      mem.membership = plan
      gymState.upsertMember(mem)
      refreshData()
    }
  }

  // Change suggestion review status
  const handleSuggestionStatusChange = (id: string, status: GymSuggestion['status']) => {
    gymState.updateSuggestionStatus(id, status)
    refreshData()
  }

  // Analytics Computations
  const analytics = useMemo(() => {
    const activeCount = members.filter(m => m.status === 'Active').length
    const suspendedCount = members.filter(m => m.status === 'Suspended').length
    
    // Calculate average visits this month
    const totalVisits = members.reduce((acc, curr) => acc + curr.visitsThisMonth, 0)
    const avgVisits = members.length ? parseFloat((totalVisits / members.length).toFixed(1)) : 0
    
    // Count pending or in-progress suggestions
    const unresolvedSuggestions = suggestions.filter(s => s.status !== 'Resolved').length

    // Workout type popularity mapping
    const activityCounts: Record<string, number> = {}
    workouts.forEach(w => {
      activityCounts[w.type] = (activityCounts[w.type] || 0) + 1
    })

    return {
      activeCount,
      suspendedCount,
      avgVisits,
      unresolvedSuggestions,
      activityCounts,
    }
  }, [members, suggestions, workouts])

  // Get max activity count for scaling the chart
  const maxActivityCount = useMemo(() => {
    const counts = Object.values(analytics.activityCounts)
    return counts.length ? Math.max(...counts) : 1
  }, [analytics.activityCounts])

  return (
    <div className="dashboard-page">
      {/* HEADER NAVBAR */}
      <header className="dashboard-header">
        <div className="container dashboard-header-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">24</span>
            <span className="logo-sub">FITNESS</span>
          </Link>

          {/* VIEW SWITCHER / ROLE TOGGLE */}
          <div className="dashboard-role-switcher">
            <button
              className={`role-btn ${role === 'member' ? 'active' : ''}`}
              onClick={() => setRole('member')}
            >
              Member View
            </button>
            <button
              className={`role-btn ${role === 'owner' ? 'active' : ''}`}
              onClick={() => setRole('owner')}
            >
              Owner Console
            </button>
          </div>

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
        {/* WELCOME / GREETING CONTAINER */}
        <div className="dashboard-greeting" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="dashboard-avatar">
              {role === 'member'
                ? (currentMember?.name.charAt(0).toUpperCase() || 'M')
                : 'O'}
            </div>
            <div>
              <h1 className="dashboard-welcome">
                {role === 'member'
                  ? `Welcome, ${currentMember?.name || activeName}`
                  : 'Gym Management Console'}
              </h1>
              <p className="dashboard-subtitle">
                {role === 'member'
                  ? `${currentMember?.email} • Membership Tier: ${currentMember?.membership || 'Standard'}`
                  : 'Monitor memberships, examine activities, and handle member suggestions.'}
              </p>
            </div>
          </div>

          <div className="nav-desktop-only">
            <span className="badge badge-resolved" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              System: {role === 'member' ? 'Client Portal' : 'Administrator'}
            </span>
          </div>
        </div>

        {/* ========================================================
            1. MEMBER PORTAL LAYOUT
            ======================================================== */}
        {role === 'member' && (
          <>
            {/* Member Tab Bar */}
            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${memberTab === 'overview' ? 'active' : ''}`}
                onClick={() => setMemberTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-btn ${memberTab === 'log' ? 'active' : ''}`}
                onClick={() => setMemberTab('log')}
              >
                Workout Log
              </button>
              <button
                className={`tab-btn ${memberTab === 'metrics' ? 'active' : ''}`}
                onClick={() => setMemberTab('metrics')}
              >
                Goals & Metrics
              </button>
              <button
                className={`tab-btn ${memberTab === 'feedback' ? 'active' : ''}`}
                onClick={() => setMemberTab('feedback')}
              >
                Feedback & Requests
              </button>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {memberTab === 'overview' && (
              <div>
                <div className="dashboard-cards">
                  <div className="dashboard-card">
                    <p className="card-label">Weekly Goals</p>
                    <p className="card-value card-value-accent">
                      {workoutsThisWeekCount} / {currentMember?.targetWorkoutsPerWeek || 3}
                    </p>
                    <p className="card-meta">Workouts in last 7 days</p>
                    <div className="progress-container">
                      <div className="progress-bar-track">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${Math.min(
                              100,
                              ((workoutsThisWeekCount) / (currentMember?.targetWorkoutsPerWeek || 3)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-card">
                    <p className="card-label">Visits This Month</p>
                    <p className="card-value">{currentMember?.visitsThisMonth || 0}</p>
                    <p className="card-meta">Check-ins compiled locally</p>
                  </div>

                  <div className="dashboard-card">
                    <p className="card-label">BMI & Weight</p>
                    <p className="card-value card-value-green">
                      {bmi ? `${bmi}` : '--'}
                    </p>
                    <p className="card-meta">
                      {currentMember?.currentWeight || '--'} lbs &middot; {
                        bmi ? bmiCategory(bmi).label : 'Update in Metrics'
                      }
                    </p>
                  </div>
                </div>

                <div className="dashboard-cols-3">
                  {/* Left Column: Recent Activities */}
                  <div>
                    <h2 className="dashboard-section-title">My Recent Workouts</h2>
                    {memberWorkouts.length === 0 ? (
                      <div className="dashboard-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                        No workouts logged yet. Navigate to the <strong>Workout Log</strong> tab to record your training!
                      </div>
                    ) : (
                      <div className="activity-list">
                        {memberWorkouts.slice(0, 5).map((workout) => (
                          <div key={workout.id} className="activity-item">
                            <div className="activity-header">
                              <span className="suggestion-title">{workout.type} Workout</span>
                              <span className="badge badge-in-progress">{workout.duration} Mins</span>
                            </div>
                            {workout.notes && <p className="suggestion-desc">{workout.notes}</p>}
                            <div className="activity-footer">
                              <span>Date: {workout.date}</span>
                              <span>Est. Burn: {workout.calories} kcal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Dynamic Perks */}
                  <div>
                    <h2 className="dashboard-section-title">Membership Perks</h2>
                    <div className="dashboard-card">
                      <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '10px' }}>
                        {currentMember?.membership} Plan Benefits:
                      </h3>
                      <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.8' }}>
                        {currentMember?.membership === 'Basic' && (
                          <>
                            <li>Gym access 5am - 10pm</li>
                            <li>Locker room access</li>
                            <li>Basic training gear</li>
                            <li style={{ color: '#555', textDecoration: 'line-through' }}>Group classes (Excluded)</li>
                          </>
                        )}
                        {currentMember?.membership === 'Standard' && (
                          <>
                            <li>24/7 gym access</li>
                            <li>Full locker & shower access</li>
                            <li>All group fitness classes</li>
                            <li>1 free PT session / month</li>
                            <li>Sauna room access</li>
                          </>
                        )}
                        {currentMember?.membership === 'Premium' && (
                          <>
                            <li>24/7 unlimited premium access</li>
                            <li>All group fitness classes</li>
                            <li>8 PT sessions / month included</li>
                            <li>Sauna & massage room access</li>
                            <li>Tailored nutrition plans</li>
                            <li>Priority locker reservations</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: WORKOUT LOG */}
            {memberTab === 'log' && (
              <div>
                <h2 className="dashboard-section-title">Log a New Activity</h2>
                <div className="dashboard-form-container">
                  <form onSubmit={handleLogWorkout} className="dashboard-form">
                    <div className="form-row">
                      <label>Activity Type</label>
                      <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                        <option value="Strength">Strength Training</option>
                        <option value="HIIT">HIIT Interval</option>
                        <option value="Yoga">Power Yoga</option>
                        <option value="Spin">Spin Cycle</option>
                        <option value="Boxing">Boxing Fitness</option>
                        <option value="Zumba">Zumba Dance</option>
                        <option value="Cardio">General Cardio</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-row">
                      <label>Duration (minutes)</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={workoutDuration}
                        onChange={(e) => setWorkoutDuration(e.target.value)}
                      />
                    </div>

                    <div className="form-row">
                      <label>Est. Calories Burned</label>
                      <input
                        type="number"
                        min="0"
                        value={workoutCalories}
                        onChange={(e) => setWorkoutCalories(e.target.value)}
                      />
                    </div>

                    <div className="form-row" style={{ flexGrow: 2 }}>
                      <label>Quick Workout Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Legs and Core focus, new PR on squats!"
                        value={workoutNotes}
                        onChange={(e) => setWorkoutNotes(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-submit">
                      Save Log
                    </button>
                  </form>
                </div>

                <h2 className="dashboard-section-title">Workout History</h2>
                {memberWorkouts.length === 0 ? (
                  <div className="dashboard-card" style={{ textAlign: 'center', padding: '24px', color: '#666' }}>
                    No workouts logged. Let's record your first training above!
                  </div>
                ) : (
                  <div className="dashboard-table-wrapper">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Workout Type</th>
                          <th>Duration</th>
                          <th>Calories</th>
                          <th>Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberWorkouts.map((w) => (
                          <tr key={w.id}>
                            <td>{w.date}</td>
                            <td style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{w.type}</td>
                            <td>{w.duration} min</td>
                            <td className="table-muted">{w.calories} kcal</td>
                            <td className="table-muted">{w.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: GOALS & METRICS */}
            {memberTab === 'metrics' && (
              <div className="dashboard-cols">
                <div>
                  <h2 className="dashboard-section-title">Update Your Goal Settings</h2>
                  <div className="dashboard-form-container">
                    <form onSubmit={handleUpdateMetrics} className="dashboard-form full-width">
                      <div className="form-row">
                        <label>Target Workouts per Week</label>
                        <input
                          type="number"
                          min="1"
                          max="7"
                          value={weeklyGoal}
                          onChange={(e) => setWeeklyGoal(e.target.value)}
                        />
                      </div>

                      <div className="form-row">
                        <label>Current Weight (lbs)</label>
                        <input
                          type="number"
                          min="30"
                          value={currentWeightInput}
                          onChange={(e) => setCurrentWeightInput(e.target.value)}
                        />
                      </div>

                      <div className="form-row">
                        <label>Height (inches)</label>
                        <input
                          type="number"
                          min="20"
                          value={heightInput}
                          onChange={(e) => setHeightInput(e.target.value)}
                        />
                        <span style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                          Example: 5ft 8in = 68 inches
                        </span>
                      </div>

                      <button type="submit" className="btn btn-primary btn-submit" style={{ marginTop: '10px' }}>
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>

                <div>
                  <h2 className="dashboard-section-title">Body Composition Status</h2>
                  <div className="dashboard-card" style={{ height: 'calc(100% - 37px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <p className="card-label">Current Calculated BMI</p>
                      <h3 style={{ fontSize: '3rem', fontWeight: 900, color: bmi ? bmiCategory(bmi).color : '#555' }}>
                        {bmi ? bmi : '--'}
                      </h3>
                      {bmi ? (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: bmiCategory(bmi).color + '22',
                            color: bmiCategory(bmi).color,
                            fontSize: '0.9rem',
                            padding: '6px 14px',
                            marginTop: '8px'
                          }}
                        >
                          {bmiCategory(bmi).label}
                        </span>
                      ) : null}
                    </div>

                    <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '20px', fontSize: '0.85rem', color: '#888' }}>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>BMI Categories:</strong>
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Underweight: &lt; 18.5</span>
                        <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Orange</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>Normal weight: 18.5 – 24.9</span>
                        <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Green</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Overweight & Obese: &ge; 25</span>
                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Red</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FEEDBACK & REQUESTS */}
            {memberTab === 'feedback' && (
              <div>
                <h2 className="dashboard-section-title">Submit a Request or Suggestion</h2>
                <p className="dashboard-subtitle" style={{ marginLeft: 0, textAlign: 'left', marginBottom: '20px' }}>
                  Have equipment you'd like to see added, class schedule requests, or facility complaints? Tell the owner directly, and track the status of your suggestion right here.
                </p>

                <div className="dashboard-form-container">
                  <form onSubmit={handleFeedbackSubmit} className="dashboard-form">
                    <div className="form-row">
                      <label>Request Category</label>
                      <select
                        value={suggestionCategory}
                        onChange={(e) => setSuggestionCategory(e.target.value as any)}
                      >
                        <option value="Class Request">Class Schedule / Style Request</option>
                        <option value="Equipment">Equipment Additions / Upgrades</option>
                        <option value="Facility Issue">Facility Maintenance / Complaints</option>
                        <option value="Other">Other Suggestion</option>
                      </select>
                    </div>

                    <div className="form-row" style={{ flexGrow: 3 }}>
                      <label>Suggestion Details</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Please add a Friday morning 7am spin class, or buy a secondary pull-up bar."
                        value={suggestionDesc}
                        onChange={(e) => setSuggestionDesc(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-submit">
                      Submit Suggestion
                    </button>
                  </form>
                </div>

                <h2 className="dashboard-section-title">My Suggestion History</h2>
                {memberSuggestions.length === 0 ? (
                  <div className="dashboard-card" style={{ textAlign: 'center', padding: '24px', color: '#666' }}>
                    No suggestions submitted. Help the gym improve by adding one above!
                  </div>
                ) : (
                  <div className="suggestion-list">
                    {memberSuggestions.map((s) => (
                      <div key={s.id} className="suggestion-item">
                        <div className="suggestion-header">
                          <span className="suggestion-title">{s.category}</span>
                          <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`}>
                            {s.status}
                          </span>
                        </div>
                        <p className="suggestion-desc">{s.description}</p>
                        <div className="suggestion-footer">
                          <span>Submitted: {s.date}</span>
                          <span>Reference ID: {s.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ========================================================
            2. OWNER PORTAL LAYOUT
            ======================================================== */}
        {role === 'owner' && (
          <>
            {/* Owner Tab Bar */}
            <div className="dashboard-tabs">
              <button
                className={`tab-btn ${ownerTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setOwnerTab('analytics')}
              >
                Owner Analytics
              </button>
              <button
                className={`tab-btn ${ownerTab === 'members' ? 'active' : ''}`}
                onClick={() => setOwnerTab('members')}
              >
                Member Directory
              </button>
              <button
                className={`tab-btn ${ownerTab === 'suggestions' ? 'active' : ''}`}
                onClick={() => setOwnerTab('suggestions')}
              >
                Needs & Suggestions ({analytics.unresolvedSuggestions})
              </button>
            </div>

            {/* OWNER TAB: ANALYTICS */}
            {ownerTab === 'analytics' && (
              <div>
                <div className="owner-stats-grid">
                  <div className="dashboard-card">
                    <p className="card-label">Active Members</p>
                    <p className="card-value card-value-accent">{analytics.activeCount}</p>
                    <p className="card-meta">Authorized & check-in ready</p>
                  </div>

                  <div className="dashboard-card">
                    <p className="card-label">Suspended Members</p>
                    <p className="card-value" style={{ color: '#ef4444' }}>{analytics.suspendedCount}</p>
                    <p className="card-meta">Access restricted temporarily</p>
                  </div>

                  <div className="dashboard-card">
                    <p className="card-label">Avg Visits / Member</p>
                    <p className="card-value card-value-green">{analytics.avgVisits}</p>
                    <p className="card-meta">Registered sessions this month</p>
                  </div>

                  <div className="dashboard-card">
                    <p className="card-label">Pending / Unresolved Requests</p>
                    <p className="card-value" style={{ color: '#f59e0b' }}>{analytics.unresolvedSuggestions}</p>
                    <p className="card-meta">Awaiting review or action</p>
                  </div>
                </div>

                <div className="dashboard-cols">
                  {/* Workout Popularity Chart */}
                  <div className="chart-container">
                    <h3>Popular Workouts Logged by Members</h3>
                    <p className="dashboard-subtitle" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '24px', fontSize: '0.85rem' }}>
                      Shows activity preferences compiled from all workout logs. Use this data to schedules classes and purchase equipment.
                    </p>

                    <div className="chart-bars">
                      {['Strength', 'HIIT', 'Yoga', 'Spin', 'Boxing', 'Zumba'].map((activity) => {
                        const count = analytics.activityCounts[activity] || 0
                        const pct = (count / maxActivityCount) * 100
                        return (
                          <div key={activity} className="chart-bar-wrapper">
                            <div className="chart-bar" style={{ height: `${Math.max(5, pct)}%` }}>
                              <span className="chart-bar-value">{count}</span>
                            </div>
                            <span className="chart-bar-label">{activity}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color" style={{ background: 'var(--gradient)' }} />
                        <span>Workouts logged</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Summary Cards */}
                  <div className="chart-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3>Dynamic Member Feedback Breakdown</h3>
                      <p className="dashboard-subtitle" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '20px', fontSize: '0.85rem' }}>
                        Current status count of suggestions submitted by the members.
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a1a', borderRadius: '8px' }}>
                          <span>Awaiting Review (Pending)</span>
                          <span className="badge badge-pending">
                            {suggestions.filter(s => s.status === 'Pending').length}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a1a', borderRadius: '8px' }}>
                          <span>Under Investigation</span>
                          <span className="badge badge-under-review">
                            {suggestions.filter(s => s.status === 'Under Review').length}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a1a', borderRadius: '8px' }}>
                          <span>Approved / Scheduled</span>
                          <span className="badge badge-in-progress">
                            {suggestions.filter(s => s.status === 'In Progress').length}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a1a', borderRadius: '8px' }}>
                          <span>Completed / Resolved</span>
                          <span className="badge badge-resolved">
                            {suggestions.filter(s => s.status === 'Resolved').length}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', padding: '10px', marginTop: '16px', fontSize: '0.8rem' }}
                      onClick={() => setOwnerTab('suggestions')}
                    >
                      Review All Suggestions &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* OWNER TAB: MEMBERS DIRECTORY */}
            {ownerTab === 'members' && (
              <div>
                <h2 className="dashboard-section-title">Register a New Gym Member</h2>
                <div className="dashboard-form-container">
                  <form onSubmit={handleRegisterMember} className="dashboard-form">
                    <div className="form-row">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={newMemName}
                        onChange={(e) => setNewMemName(e.target.value)}
                      />
                    </div>

                    <div className="form-row">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@example.com"
                        value={newMemEmail}
                        onChange={(e) => setNewMemEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-row">
                      <label>Membership Tier</label>
                      <select
                        value={newMemPlan}
                        onChange={(e) => setNewMemPlan(e.target.value as any)}
                      >
                        <option value="Basic">Basic ($29/mo)</option>
                        <option value="Standard">Standard ($49/mo)</option>
                        <option value="Premium">Premium ($79/mo)</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-submit">
                      Add Member
                    </button>
                  </form>
                </div>

                <h2 className="dashboard-section-title">Active Member Roster</h2>
                <div className="dashboard-table-wrapper">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th>Plan Level</th>
                        <th>Visits (Month)</th>
                        <th>Status</th>
                        <th>Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((mem) => (
                        <tr key={mem.email}>
                          <td style={{ fontWeight: 'bold' }}>{mem.name}</td>
                          <td>{mem.email}</td>
                          <td className="table-muted">{mem.joinDate}</td>
                          <td>
                            <select
                              value={mem.membership}
                              className="suggestion-action-select"
                              onChange={(e) => handleChangePlan(mem.email, e.target.value as any)}
                            >
                              <option value="Basic">Basic</option>
                              <option value="Standard">Standard</option>
                              <option value="Premium">Premium</option>
                            </select>
                          </td>
                          <td style={{ textAlign: 'center' }}>{mem.visitsThisMonth}</td>
                          <td>
                            <span className={`badge badge-${mem.status.toLowerCase()}`}>
                              {mem.status}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                className={`btn btn-action-small ${mem.status === 'Active' ? 'btn-dark' : 'btn-primary'}`}
                                onClick={() => handleToggleStatus(mem.email)}
                              >
                                {mem.status === 'Active' ? 'Suspend' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* OWNER TAB: SUGGESTIONS TRACKER */}
            {ownerTab === 'suggestions' && (
              <div>
                <h2 className="dashboard-section-title">Review Member Feedback & Requests</h2>
                <p className="dashboard-subtitle" style={{ marginLeft: 0, textAlign: 'left', marginBottom: '20px' }}>
                  Track what members need to feel supported. Review their equipment requests, scheduling questions, and facility reports. Mark status updates so they can see progress from their Member Portal.
                </p>

                {suggestions.length === 0 ? (
                  <div className="dashboard-card" style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
                    No feedback has been submitted by gym members yet.
                  </div>
                ) : (
                  <div className="suggestion-list">
                    {suggestions.map((s) => (
                      <div key={s.id} className="suggestion-item">
                        <div className="suggestion-header">
                          <div>
                            <span className="suggestion-title">{s.category}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginLeft: '12px' }}>
                              Submitted by {s.memberName} ({s.memberEmail})
                            </span>
                          </div>
                          <div>
                            <select
                              value={s.status}
                              className="suggestion-action-select"
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              onChange={(e) => handleSuggestionStatusChange(s.id, e.target.value as any)}
                            >
                              <option value="Pending">Pending Review</option>
                              <option value="Under Review">Under Review</option>
                              <option value="In Progress">Scheduled / In Progress</option>
                              <option value="Resolved">Resolved / Completed</option>
                            </select>
                          </div>
                        </div>
                        <p className="suggestion-desc">{s.description}</p>
                        <div className="suggestion-footer">
                          <span>Date Submitted: {s.date}</span>
                          <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            Status Badge:
                            <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`}>
                              {s.status}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
