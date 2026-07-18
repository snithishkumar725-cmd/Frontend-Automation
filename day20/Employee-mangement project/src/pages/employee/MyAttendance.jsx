import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './MyAttendance.css'

const MyAttendance = () => {
  const { currentUser, attendance, getAttendanceSummary } = useApp()
  const [calMonth, setCalMonth] = useState(() => { const d = new Date(); return { year: d.getFullYear(), month: d.getMonth() + 1 } })

  const today = new Date().toISOString().split('T')[0]
  const empAtt = attendance[currentUser.id] || {}
  const summary = getAttendanceSummary(currentUser.id, calMonth.year, calMonth.month)

  const getDaysInMonth = (y, m) => new Date(y, m, 0).getDate()
  const getFirstDay = (y, m) => new Date(y, m - 1, 1).getDay()

  const days = getDaysInMonth(calMonth.year, calMonth.month)
  const firstDay = getFirstDay(calMonth.year, calMonth.month)
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  const prevMonth = () => setCalMonth(c => c.month === 1 ? { year: c.year - 1, month: 12 } : { ...c, month: c.month - 1 })
  const nextMonth = () => setCalMonth(c => c.month === 12 ? { year: c.year + 1, month: 1 } : { ...c, month: c.month + 1 })

  const statusMeta = {
    present: { label: 'Present', emoji: '✅', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    absent:  { label: 'Absent',  emoji: '❌', color: '#f43f5e', bg: 'rgba(244,63,94,0.12)' },
    halfday: { label: 'Half Day',emoji: '🌓', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    leave:   { label: 'Leave',   emoji: '🏖️', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
  }

  // Build event list for this month
  const monthEvents = []
  for (let d = 1; d <= days; d++) {
    const dateStr = `${calMonth.year}-${String(calMonth.month).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    const status = empAtt[dateStr]
    if (status) monthEvents.push({ date: dateStr, day: d, status })
  }

  return (
    <div className="my-att-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">📅 My Attendance</h1>
          <p className="page-subtitle">Track your attendance history and monthly summary</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="att-summary-cards">
        {[
          { key: 'present', icon: '✅', label: 'Days Present',  value: summary.present,  color: 'success' },
          { key: 'absent',  icon: '❌', label: 'Days Absent',   value: summary.absent,   color: 'danger' },
          { key: 'halfday', icon: '🌓', label: 'Half Days',     value: summary.halfday,  color: 'warning' },
          { key: 'leave',   icon: '🏖️', label: 'On Leave',      value: summary.leave,    color: 'purple' },
          { key: 'rate',    icon: '📊', label: 'Attendance Rate', value: `${summary.working > 0 ? Math.round((summary.present / summary.working) * 100) : 0}%`, color: 'primary' },
        ].map(s => (
          <div key={s.key} className={`att-sum-card asc-${s.color}`} id={`att-sum-${s.key}`}>
            <span className="asc-icon">{s.icon}</span>
            <span className="asc-value">{s.value}</span>
            <span className="asc-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="att-main-grid">
        {/* Calendar */}
        <div className="att-cal-card" id="my-att-calendar">
          <div className="att-cal-nav">
            <button className="cal-nav" onClick={prevMonth}>‹</button>
            <h2>{new Date(calMonth.year, calMonth.month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <button className="cal-nav" onClick={nextMonth} disabled={`${calMonth.year}-${calMonth.month}` >= `${new Date().getFullYear()}-${new Date().getMonth()+1}`}>›</button>
          </div>

          {/* Legend */}
          <div className="att-legend-row">
            {Object.entries(statusMeta).map(([k, v]) => (
              <div key={k} className="al-item">
                <div className="al-dot" style={{ background: v.color }} />
                <span>{v.label}</span>
              </div>
            ))}
          </div>

          <div className="my-cal-weekdays">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="my-cal-wd">{d}</div>)}
          </div>
          <div className="my-cal-grid">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="my-cal-cell empty" />
              const dateStr = `${calMonth.year}-${String(calMonth.month).padStart(2,'0')}-${String(day).padStart(2,'0')}`
              const status = empAtt[dateStr]
              const meta = status ? statusMeta[status] : null
              const isToday = dateStr === today
              const isFuture = dateStr > today
              const dow = new Date(dateStr).getDay()
              const isWeekend = dow === 0 || dow === 6
              return (
                <div
                  key={i}
                  className={`my-cal-cell ${isToday ? 'is-today' : ''} ${isFuture ? 'is-future' : ''} ${isWeekend ? 'is-weekend' : ''}`}
                  style={meta && !isFuture ? { background: meta.bg, borderColor: meta.color } : {}}
                  id={`mycal-${dateStr}`}
                >
                  <span className="my-cal-day">{day}</span>
                  {meta && !isFuture && <span className="my-cal-emoji">{meta.emoji}</span>}
                  {isToday && <div className="my-cal-today-dot" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="att-events-card" id="att-events">
          <h3 className="events-title">📋 Attendance Events</h3>
          <div className="events-list">
            {monthEvents.length === 0 ? (
              <div className="empty-state"><div className="empty-state-icon">📅</div><p>No attendance data for this month</p></div>
            ) : (
              monthEvents.slice().reverse().map(ev => {
                const meta = statusMeta[ev.status]
                const dateObj = new Date(ev.date)
                return (
                  <div key={ev.date} className="event-row" id={`event-${ev.date}`}>
                    <div className="er-date">
                      <span className="er-day">{dateObj.getDate()}</span>
                      <span className="er-month">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="er-dot" style={{ background: meta.color }} />
                    <div className="er-content">
                      <span className="er-status" style={{ color: meta.color }}>{meta.emoji} {meta.label}</span>
                      <span className="er-weekday">{dateObj.toLocaleString('default', { weekday: 'long' })}</span>
                    </div>
                    <div className="er-badge" style={{ background: meta.bg, color: meta.color }}>
                      {meta.label}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAttendance
