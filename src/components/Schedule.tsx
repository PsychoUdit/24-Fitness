import { useState } from 'react'
import { Clock, ArrowRight, CheckCircle } from 'lucide-react'

interface ScheduleProps {
  onOpenModal: (className?: string) => void
}

const daySchedule: Record<
  string,
  { time: string; name: string; trainer: string; category: string }[]
> = {
  Mon: [
    { time: '06:30 AM', name: 'HIIT Fat Burner', trainer: 'Coach Rohit', category: 'Cardio' },
    { time: '08:00 AM', name: 'Core & Mobility Yoga', trainer: 'Coach Ananya', category: 'Yoga' },
    { time: '05:30 PM', name: 'Power & Hypertrophy', trainer: 'Coach Vikram', category: 'Strength' },
    { time: '07:00 PM', name: 'Functional Circuit', trainer: 'Coach Rohit', category: 'Strength' },
  ],
  Tue: [
    { time: '06:30 AM', name: 'Power Spin / RPM', trainer: 'Coach Sneha', category: 'Cardio' },
    { time: '08:00 AM', name: 'Power & Hypertrophy', trainer: 'Coach Vikram', category: 'Strength' },
    { time: '05:30 PM', name: 'Boxing Conditioning', trainer: 'Coach Karan', category: 'Boxing' },
    { time: '07:00 PM', name: 'HIIT Fat Burner', trainer: 'Coach Rohit', category: 'Cardio' },
  ],
  Wed: [
    { time: '06:30 AM', name: 'HIIT Fat Burner', trainer: 'Coach Rohit', category: 'Cardio' },
    { time: '08:00 AM', name: 'Core & Mobility Yoga', trainer: 'Coach Ananya', category: 'Yoga' },
    { time: '05:30 PM', name: 'Power & Hypertrophy', trainer: 'Coach Vikram', category: 'Strength' },
    { time: '07:00 PM', name: 'Power Spin / RPM', trainer: 'Coach Sneha', category: 'Cardio' },
  ],
  Thu: [
    { time: '06:30 AM', name: 'Functional Circuit', trainer: 'Coach Rohit', category: 'Strength' },
    { time: '08:00 AM', name: 'Power Spin / RPM', trainer: 'Coach Sneha', category: 'Cardio' },
    { time: '05:30 PM', name: 'Boxing Conditioning', trainer: 'Coach Karan', category: 'Boxing' },
    { time: '07:00 PM', name: 'Core & Mobility Yoga', trainer: 'Coach Ananya', category: 'Yoga' },
  ],
  Fri: [
    { time: '06:30 AM', name: 'Power & Hypertrophy', trainer: 'Coach Vikram', category: 'Strength' },
    { time: '08:00 AM', name: 'HIIT Fat Burner', trainer: 'Coach Rohit', category: 'Cardio' },
    { time: '05:30 PM', name: 'Functional Circuit', trainer: 'Coach Rohit', category: 'Strength' },
    { time: '07:00 PM', name: 'Boxing Conditioning', trainer: 'Coach Karan', category: 'Boxing' },
  ],
  Sat: [
    { time: '08:00 AM', name: 'Weekend Warrior BootCamp', trainer: 'Coach Vikram', category: 'Cardio' },
    { time: '10:00 AM', name: 'Power Spin / RPM', trainer: 'Coach Sneha', category: 'Cardio' },
    { time: '05:00 PM', name: 'Open Sparring & Core', trainer: 'Coach Karan', category: 'Boxing' },
  ],
  Sun: [
    { time: '08:30 AM', name: 'Restorative Stretch & Mobility', trainer: 'Coach Ananya', category: 'Yoga' },
    { time: '10:30 AM', name: 'Heavy Lifting Open Gym', trainer: 'Floor Coach', category: 'Strength' },
  ],
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Schedule({ onOpenModal }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState('Mon')

  const currentList = daySchedule[selectedDay] || []

  return (
    <section id="schedule" className="section-schedule">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Weekly Timetable</span>
          <h2>Flexible Class Schedule</h2>
          <p className="section-subtitle">
            Open gym floor is accessible 24/7. Classes run throughout the week as scheduled below.
          </p>
        </div>

        {/* Mobile-first Day selector */}
        <div className="schedule-day-tabs">
          {days.map((day) => (
            <button
              key={day}
              className={`day-tab-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Daily Class List */}
        <div className="schedule-cards-list">
          {currentList.map((item, idx) => (
            <div key={idx} className="schedule-item-card">
              <div className="schedule-time-box">
                <Clock size={16} />
                <span>{item.time}</span>
              </div>
              <div className="schedule-info">
                <h4>{item.name}</h4>
                <div className="schedule-meta-sub">
                  <span className="trainer-tag">{item.trainer}</span>
                  <span className="dot-sep">•</span>
                  <span className="category-tag">{item.category}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-reserve-slot"
                onClick={() => onOpenModal(`${item.name} (${selectedDay} ${item.time})`)}
              >
                <span>Book Trial Slot</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="schedule-floor-note">
          <CheckCircle size={18} className="note-icon" />
          <span>
            <strong>Prefer solo workouts?</strong> The main gym floor, free weights, and cardio deck
            are open 24 hours with uninterrupted access.
          </span>
        </div>
      </div>
    </section>
  )
}