import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './AttendanceManager.css'

const STATUS_OPTIONS = [
  { value: 'present', label: '✅ Present', color: 'success' },
  { value: 'absent',  label: '❌ Absent',  color: 'danger' },
  { value: 'halfday', label: '🌓 Half Day', color: 'warning' },
  { value: 'leave',   label: '🏖️ Leave',   color: 'purple' },
]
const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const AttendanceManager = () => {
  const { employees, attendance, markAttendance, getAttendanceSummary } = useApp()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [viewEmp, setViewEmp] = useState(null) // employee to show calendar for
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() + 1 } })

  const today = new Date().toISOString().split('T')[0]

  const getStatusForDate = (empId, date) => attendance[empId]?.[date] || null

  const handleMark = (empId, status) => {
    markAttendance(empId, selectedDate, status)
  }

  // Calendar helpers
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()
  const getFirstDay = (year, month) => new Date(year, month - 1, 1).getDay()

  const prevMonth = () => setCalMonth(c => {
    if (c.month === 1) return { year: c.year - 1, month: 12 }
    return { ...c, month: c.month - 1 }
  })
  const nextMonth = () => setCalMonth(c => {
    if (c.month === 12) return { year: c.year + 1, month: 1 }
    return { ...c, month: c.month + 1 }
  })

  const renderCalendar = (emp) => {
    const { year, month } = calMonth
    const days = getDaysInMonth(year, month)
    const firstDay = getFirstDay(year, month)
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= days; d++) cells.push(d)
    const summary = getAttendanceSummary(emp.id, year, month)

    return (
      <div className="att-calendar-panel">
        <div className="cal-header">
          <button className="cal-nav" onClick={prevMonth}>‹</button>
          <h3>{new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
          <button className="cal-nav" onClick={nextMonth}>›</button>
        </div>
        <div className="cal-summary-row">
          <span className="cal-sum present">✅ {summary.present} Present</span>
          <span className="cal-sum absent">❌ {summary.absent} Absent</span>
          <span className="cal-sum halfday">🌓 {summary.halfday} Half</span>
          <span className="cal-sum leave">🏖️ {summary.leave} Leave</span>
        </div>
        <div className="cal-weekdays">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="cal-wd">{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells.map((day, i) => {
            if (!day) return <div key={i} className="cal-cell empty" />
            const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            const status = attendance[emp.id]?.[dateStr]
            const isToday = dateStr === today
            const isFuture = dateStr > today
            return (
              <div key={i} className={`cal-cell ${status ? `cal-${status}` : ''} ${isToday ? 'cal-today' : ''} ${isFuture ? 'cal-future' : ''}`} id={`cal-${emp.id}-${dateStr}`}>
                <span className="cal-day-num">{day}</span>
                {status && <span className="cal-dot" />}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Today's attendance overview
  const todayAttendance = employees.map(emp => ({
    ...emp,
    todayStatus: attendance[emp.id]?.[selectedDate] || null
  }))

  return (
    <div className="attendance-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">📅 Attendance Manager</h1>
          <p className="page-subtitle">Mark and track employee attendance across all dates</p>
        </div>
      </div>

      {/* Date Picker + Bulk actions */}
      <div className="att-controls">
        <div className="att-date-section">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            className="form-input"
            style={{ maxWidth: '200px' }}
            value={selectedDate}
            max={today}
            onChange={e => setSelectedDate(e.target.value)}
            id="att-date-picker"
          />
        </div>
        <div className="att-bulk-btns">
          <span className="att-bulk-label">Mark all as:</span>
          {STATUS_OPTIONS.map(s => (
            <button
              key={s.value}
              className={`btn btn-sm att-bulk-btn btn-${s.color === 'success' ? 'success' : s.color === 'danger' ? 'accent' : s.color === 'warning' ? 'warning' : 'ghost'}`}
              onClick={() => employees.forEach(e => markAttendance(e.id, selectedDate, s.value))}
              id={`bulk-${s.value}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Grid */}
      <div className="att-employees-grid">
        {todayAttendance.map((emp) => {
          const summary = getAttendanceSummary(emp.id, new Date().getFullYear(), new Date().getMonth() + 1)
          return (
            <div key={emp.id} className="att-emp-card" id={`att-emp-${emp.id}`}>
              <div className="att-card-top">
                <div className={`avatar avatar-${avatarColors[emp.id % avatarColors.length]}`}>{emp.avatar}</div>
                <div className="att-emp-info">
                  <div className="att-emp-name">{emp.name}</div>
                  <div className="att-emp-dept">{emp.department}</div>
                </div>
                <button
                  className="att-cal-btn"
                  onClick={() => { setViewEmp(viewEmp?.id === emp.id ? null : emp); setCalMonth({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }) }}
                  title="View Calendar"
                  id={`cal-toggle-${emp.id}`}
                >
                  📅
                </button>
              </div>

              {/* Month mini-stats */}
              <div className="att-mini-stats">
                <span className="att-ms present">✅ {summary.present}</span>
                <span className="att-ms absent">❌ {summary.absent}</span>
                <span className="att-ms halfday">🌓 {summary.halfday}</span>
                <span className="att-ms leave">🏖️ {summary.leave}</span>
              </div>

              {/* Status buttons */}
              <div className="att-status-row">
                {STATUS_OPTIONS.map(s => (
                  <button
                    key={s.value}
                    className={`att-status-btn ${emp.todayStatus === s.value ? `att-${s.value}-active` : ''}`}
                    onClick={() => handleMark(emp.id, s.value)}
                    id={`mark-${emp.id}-${s.value}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Calendar */}
              {viewEmp?.id === emp.id && renderCalendar(emp)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AttendanceManager
