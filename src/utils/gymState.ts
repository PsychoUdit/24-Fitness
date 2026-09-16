export interface GymMember {
  email: string
  name: string
  joinDate: string
  membership: 'Basic' | 'Standard' | 'Premium'
  status: 'Active' | 'Suspended'
  visitsThisMonth: number
  targetWorkoutsPerWeek: number
  currentWeight: number // in lbs
  height: number // in inches
}

export interface GymSuggestion {
  id: string
  memberEmail: string
  memberName: string
  category: 'Class Request' | 'Equipment' | 'Facility Issue' | 'Other'
  description: string
  status: 'Pending' | 'Under Review' | 'In Progress' | 'Resolved'
  date: string
}

export interface WorkoutLog {
  id: string
  memberEmail: string
  date: string
  type: string
  duration: number // in minutes
  calories: number
  notes: string
}

const DEFAULT_MEMBERS: GymMember[] = [
  {
    email: 'alex.jones@example.com',
    name: 'Alex Jones',
    joinDate: 'Jan 15, 2026',
    membership: 'Premium',
    status: 'Active',
    visitsThisMonth: 18,
    targetWorkoutsPerWeek: 5,
    currentWeight: 182,
    height: 71,
  },
  {
    email: 'sarah.m@example.com',
    name: 'Sarah Miller',
    joinDate: 'Mar 10, 2026',
    membership: 'Standard',
    status: 'Active',
    visitsThisMonth: 12,
    targetWorkoutsPerWeek: 3,
    currentWeight: 145,
    height: 65,
  },
  {
    email: 'jordan.t@example.com',
    name: 'Jordan Taylor',
    joinDate: 'May 22, 2026',
    membership: 'Basic',
    status: 'Active',
    visitsThisMonth: 8,
    targetWorkoutsPerWeek: 2,
    currentWeight: 210,
    height: 73,
  },
  {
    email: 'emily.r@example.com',
    name: 'Emily Davis',
    joinDate: 'Feb 1, 2026',
    membership: 'Standard',
    status: 'Suspended',
    visitsThisMonth: 0,
    targetWorkoutsPerWeek: 4,
    currentWeight: 132,
    height: 64,
  },
  {
    email: 'mike.b@example.com',
    name: 'Michael Brown',
    joinDate: 'Jun 30, 2026',
    membership: 'Premium',
    status: 'Active',
    visitsThisMonth: 15,
    targetWorkoutsPerWeek: 4,
    currentWeight: 195,
    height: 70,
  }
]

const DEFAULT_SUGGESTIONS: GymSuggestion[] = [
  {
    id: 'sug-1',
    memberEmail: 'alex.jones@example.com',
    memberName: 'Alex Jones',
    category: 'Equipment',
    description: 'We need another set of 45lb dumbbells. There is always a wait for them during peak evening hours.',
    status: 'In Progress',
    date: 'Aug 10, 2026',
  },
  {
    id: 'sug-2',
    memberEmail: 'sarah.m@example.com',
    memberName: 'Sarah Miller',
    category: 'Class Request',
    description: 'Could we add a Saturday morning Power Yoga session? The weekday ones conflict with work schedules.',
    status: 'Under Review',
    date: 'Aug 12, 2026',
  },
  {
    id: 'sug-3',
    memberEmail: 'jordan.t@example.com',
    memberName: 'Jordan Taylor',
    category: 'Facility Issue',
    description: 'The water dispenser near the studio is cooling very slowly. Water is warm by 6 PM.',
    status: 'Pending',
    date: 'Aug 15, 2026',
  },
  {
    id: 'sug-4',
    memberEmail: 'mike.b@example.com',
    memberName: 'Michael Brown',
    category: 'Class Request',
    description: 'Advanced boxing sparring drills classes would be awesome.',
    status: 'Resolved',
    date: 'Jul 28, 2026',
  }
]

const DEFAULT_WORKOUTS: WorkoutLog[] = [
  // Historic logs to compile stats
  {
    id: 'work-1',
    memberEmail: 'alex.jones@example.com',
    date: '2026-08-16',
    type: 'Strength',
    duration: 60,
    calories: 450,
    notes: 'Heavy squats and bench press. Feeling strong.',
  },
  {
    id: 'work-2',
    memberEmail: 'alex.jones@example.com',
    date: '2026-08-14',
    type: 'HIIT',
    duration: 45,
    calories: 550,
    notes: 'Sprints and kettlebell swings. Exhausting!',
  },
  {
    id: 'work-3',
    memberEmail: 'sarah.m@example.com',
    date: '2026-08-15',
    type: 'Yoga',
    duration: 60,
    calories: 220,
    notes: 'Focus on breathing and core strength.',
  },
  {
    id: 'work-4',
    memberEmail: 'jordan.t@example.com',
    date: '2026-08-13',
    type: 'Spin',
    duration: 45,
    calories: 400,
    notes: 'Interval cycling session. Kept heart rate high.',
  },
  {
    id: 'work-5',
    memberEmail: 'mike.b@example.com',
    date: '2026-08-16',
    type: 'Boxing',
    duration: 50,
    calories: 480,
    notes: 'Pad work and heavy bag drills.',
  },
  {
    id: 'work-6',
    memberEmail: 'alex.jones@example.com',
    date: '2026-08-11',
    type: 'Strength',
    duration: 60,
    calories: 420,
    notes: 'Deadlifts and accessories.',
  }
]

// LocalStorage helpers
export const gymState = {
  initialize() {
    if (!localStorage.getItem('gym_members')) {
      localStorage.setItem('gym_members', JSON.stringify(DEFAULT_MEMBERS))
    }
    if (!localStorage.getItem('gym_suggestions')) {
      localStorage.setItem('gym_suggestions', JSON.stringify(DEFAULT_SUGGESTIONS))
    }
    if (!localStorage.getItem('gym_workouts')) {
      localStorage.setItem('gym_workouts', JSON.stringify(DEFAULT_WORKOUTS))
    }
  },

  getMembers(): GymMember[] {
    this.initialize()
    return JSON.parse(localStorage.getItem('gym_members') || '[]')
  },

  saveMembers(members: GymMember[]) {
    localStorage.setItem('gym_members', JSON.stringify(members))
  },

  getMemberByEmail(email: string): GymMember | null {
    const members = this.getMembers()
    return members.find(m => m.email.toLowerCase() === email.toLowerCase()) || null
  },

  upsertMember(member: GymMember) {
    const members = this.getMembers()
    const index = members.findIndex(m => m.email.toLowerCase() === member.email.toLowerCase())
    if (index > -1) {
      members[index] = member
    } else {
      members.push(member)
    }
    this.saveMembers(members)
  },

  getSuggestions(): GymSuggestion[] {
    this.initialize()
    return JSON.parse(localStorage.getItem('gym_suggestions') || '[]')
  },

  saveSuggestions(suggestions: GymSuggestion[]) {
    localStorage.setItem('gym_suggestions', JSON.stringify(suggestions))
  },

  addSuggestion(suggestion: Omit<GymSuggestion, 'id' | 'date'>) {
    const suggestions = this.getSuggestions()
    const newSuggestion: GymSuggestion = {
      ...suggestion,
      id: `sug-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    suggestions.unshift(newSuggestion)
    this.saveSuggestions(suggestions)
    return newSuggestion
  },

  updateSuggestionStatus(id: string, status: GymSuggestion['status']) {
    const suggestions = this.getSuggestions()
    const sug = suggestions.find(s => s.id === id)
    if (sug) {
      sug.status = status
      this.saveSuggestions(suggestions)
    }
  },

  getWorkouts(): WorkoutLog[] {
    this.initialize()
    return JSON.parse(localStorage.getItem('gym_workouts') || '[]')
  },

  saveWorkouts(workouts: WorkoutLog[]) {
    localStorage.setItem('gym_workouts', JSON.stringify(workouts))
  },

  addWorkout(workout: Omit<WorkoutLog, 'id'>) {
    const workouts = this.getWorkouts()
    const newWorkout: WorkoutLog = {
      ...workout,
      id: `work-${Date.now()}`,
    }
    workouts.unshift(newWorkout)
    this.saveWorkouts(workouts)
    
    // Increment visit count for that member
    const member = this.getMemberByEmail(workout.memberEmail)
    if (member) {
      member.visitsThisMonth += 1
      this.upsertMember(member)
    }
    
    return newWorkout
  },

  getWorkoutsByMember(email: string): WorkoutLog[] {
    const workouts = this.getWorkouts()
    return workouts.filter(w => w.memberEmail.toLowerCase() === email.toLowerCase())
  }
}
