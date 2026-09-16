import { useState } from 'react'
import { Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'

interface ScheduleProps {
  onOpenModal: (className?: string) => void
}

const days = siteConfig.schedule.days

export default function Schedule({ onOpenModal }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(days[0])
  const currentList = siteConfig.schedule.timetable[selectedDay] || []

  return (
    <section id="schedule" className="section-schedule">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{siteConfig.schedule.tag}</span>
          <h2>{siteConfig.schedule.title}</h2>
          <p className="section-subtitle">
            {siteConfig.schedule.subtitle}
          </p>
        </div>

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
            <strong>Prefer solo workouts?</strong> {siteConfig.schedule.floorNote}
          </span>
        </div>
      </div>
    </section>
  )
}
