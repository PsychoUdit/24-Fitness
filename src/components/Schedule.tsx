const scheduleData = [
  { time: '6:00 AM', mon: 'HIIT', tue: 'Yoga', wed: 'Spin', thu: 'HIIT', fri: 'Yoga', sat: 'Boxing', sun: 'Zumba' },
  { time: '8:00 AM', mon: 'Yoga', tue: 'Strength', wed: 'HIIT', thu: 'Spin', fri: 'Strength', sat: 'Zumba', sun: 'Yoga' },
  { time: '10:00 AM', mon: 'Spin', tue: 'Zumba', wed: 'Strength', thu: 'Yoga', fri: 'HIIT', sat: 'Spin', sun: 'Strength' },
  { time: '12:00 PM', mon: 'Strength', tue: 'HIIT', wed: 'Boxing', thu: 'Zumba', fri: 'Spin', sat: 'HIIT', sun: '-' },
  { time: '4:00 PM', mon: 'Boxing', tue: 'Spin', wed: 'Zumba', thu: 'Strength', fri: 'Boxing', sat: 'Yoga', sun: '-' },
  { time: '6:00 PM', mon: 'HIIT', tue: 'Boxing', wed: 'Yoga', thu: 'HIIT', fri: 'Zumba', sat: 'Strength', sun: '-' },
  { time: '7:00 PM', mon: 'Zumba', tue: 'HIIT', wed: 'Strength', thu: 'Boxing', fri: 'Yoga', sat: '-', sun: '-' },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Schedule() {
  return (
    <section id="schedule" className="schedule-section">
      <div className="container">
        <h2 className="section-title">Class Schedule</h2>
        <p className="section-subtitle">
          Plan your week with our flexible class schedule.
        </p>

        <div className="schedule-table-wrapper">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Time</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, i) => (
                <tr key={i}>
                  <td className="time-cell">{row.time}</td>
                  <td className={row.mon !== '-' ? 'has-class' : ''}>{row.mon}</td>
                  <td className={row.tue !== '-' ? 'has-class' : ''}>{row.tue}</td>
                  <td className={row.wed !== '-' ? 'has-class' : ''}>{row.wed}</td>
                  <td className={row.thu !== '-' ? 'has-class' : ''}>{row.thu}</td>
                  <td className={row.fri !== '-' ? 'has-class' : ''}>{row.fri}</td>
                  <td className={row.sat !== '-' ? 'has-class' : ''}>{row.sat}</td>
                  <td className={row.sun !== '-' ? 'has-class' : ''}>{row.sun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
