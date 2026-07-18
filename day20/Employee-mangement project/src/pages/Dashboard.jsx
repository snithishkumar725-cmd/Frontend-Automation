import { useState, useEffect } from 'react'
import './Dashboard.css'

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [animatedValues, setAnimatedValues] = useState({ total: 0, active: 0, onLeave: 0, new: 0 })

  useEffect(() => {
    const targets = { total: 1247, active: 1189, onLeave: 34, new: 24 }
    const duration = 1500
    const steps = 50
    let step = 0
    const timer = setInterval(() => {
      step++
      const p = 1 - Math.pow(1 - step / steps, 3)
      setAnimatedValues({
        total: Math.round(targets.total * p),
        active: Math.round(targets.active * p),
        onLeave: Math.round(targets.onLeave * p),
        new: Math.round(targets.new * p),
      })
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [])

  const summaryCards = [
    { label: 'Total Employees', value: animatedValues.total, change: '+5.2%', up: true, icon: '👥', color: 'primary' },
    { label: 'Active Now', value: animatedValues.active, change: '+3.1%', up: true, icon: '✅', color: 'success' },
    { label: 'On Leave', value: animatedValues.onLeave, change: '-2.4%', up: false, icon: '🏖️', color: 'warning' },
    { label: 'New This Month', value: animatedValues.new, change: '+12%', up: true, icon: '🆕', color: 'accent' },
  ]

  const recentActivities = [
    { type: 'join', name: 'Arun Kumar', action: 'joined the Engineering team', time: '2 hours ago', avatar: 'AK' },
    { type: 'promotion', name: 'Priya Singh', action: 'was promoted to Senior Developer', time: '5 hours ago', avatar: 'PS' },
    { type: 'leave', name: 'Raj Patel', action: 'requested 3 days leave', time: '1 day ago', avatar: 'RP' },
    { type: 'review', name: 'Meena Sharma', action: 'completed performance review', time: '1 day ago', avatar: 'MS' },
    { type: 'join', name: 'David Wilson', action: 'joined the Design team', time: '2 days ago', avatar: 'DW' },
  ]

  const departmentData = [
    { name: 'Engineering', count: 342, percentage: 28, color: '#ff6b3d' },
    { name: 'Design', count: 156, percentage: 13, color: '#7c5cfc' },
    { name: 'Marketing', count: 198, percentage: 16, color: '#3b82f6' },
    { name: 'Sales', count: 234, percentage: 19, color: '#10b981' },
    { name: 'HR', count: 87, percentage: 7, color: '#f59e0b' },
    { name: 'Finance', count: 123, percentage: 10, color: '#ec4899' },
    { name: 'Operations', count: 107, percentage: 7, color: '#8b5cf6' },
  ]

  const topPerformers = [
    { name: 'Anita Desai', role: 'Lead Engineer', score: 98, avatar: 'AD' },
    { name: 'Vikram Shah', role: 'Product Designer', score: 96, avatar: 'VS' },
    { name: 'Lisa Wang', role: 'Marketing Head', score: 94, avatar: 'LW' },
    { name: 'Karthik R.', role: 'Sales Manager', score: 93, avatar: 'KR' },
    { name: 'Sophie Martin', role: 'Data Analyst', score: 91, avatar: 'SM' },
  ]

  const attendanceData = [
    { day: 'Mon', present: 95, absent: 5 },
    { day: 'Tue', present: 92, absent: 8 },
    { day: 'Wed', present: 88, absent: 12 },
    { day: 'Thu', present: 94, absent: 6 },
    { day: 'Fri', present: 90, absent: 10 },
  ]

  return (
    <div className="dashboard-page" id="dashboard-page">
      <div className="dashboard-header">
        <div className="dh-text">
          <h1 className="dh-title animate-fadeInUp delay-1">
            Dashboard <span className="dh-wave">👋</span>
          </h1>
          <p className="dh-subtitle animate-fadeInUp delay-2">
            Welcome back! Here's what's happening with your team today.
          </p>
        </div>
        <div className="dh-actions animate-fadeInUp delay-2">
          <div className="period-selector" id="period-selector">
            {['week', 'month', 'year'].map(p => (
              <button
                key={p}
                className={`period-btn ${selectedPeriod === p ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(p)}
                id={`period-${p}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-sm" id="export-btn">
            📥 Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        {summaryCards.map((card, i) => (
          <div key={i} className={`summary-card animate-fadeInUp delay-${i + 1}`} id={`summary-card-${i}`}>
            <div className="sc-top">
              <div className={`sc-icon sc-${card.color}`}>
                <span>{card.icon}</span>
              </div>
              <div className={`sc-change ${card.up ? 'up' : 'down'}`}>
                {card.change}
              </div>
            </div>
            <div className="sc-value">{card.value.toLocaleString()}</div>
            <div className="sc-label">{card.label}</div>
            <div className="sc-bar-wrap">
              <div className={`sc-bar sc-bar-${card.color}`} style={{ width: `${60 + i * 10}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Attendance Chart */}
        <div className="dash-card attendance-card animate-fadeInUp delay-2" id="attendance-card">
          <div className="dc-header">
            <h3 className="dc-title">📊 Weekly Attendance</h3>
            <span className="dc-badge">This Week</span>
          </div>
          <div className="attendance-chart">
            {attendanceData.map((d, i) => (
              <div key={i} className="att-col">
                <div className="att-bar-wrap">
                  <div className="att-bar present" style={{ height: `${d.present}%`, animationDelay: `${i * 0.1}s` }}>
                    <span className="att-tooltip">{d.present}%</span>
                  </div>
                </div>
                <span className="att-label">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="att-legend">
            <div className="att-legend-item">
              <span className="att-dot present"></span>
              <span>Present</span>
            </div>
            <div className="att-legend-item">
              <span className="att-dot absent"></span>
              <span>Absent</span>
            </div>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="dash-card dept-card animate-fadeInUp delay-3" id="dept-card">
          <div className="dc-header">
            <h3 className="dc-title">🏢 Department Distribution</h3>
          </div>
          <div className="dept-list">
            {departmentData.map((dept, i) => (
              <div key={i} className="dept-item" id={`dept-item-${i}`}>
                <div className="dept-info">
                  <div className="dept-color" style={{ background: dept.color }}></div>
                  <span className="dept-name">{dept.name}</span>
                </div>
                <div className="dept-bar-wrap">
                  <div className="dept-bar" style={{ width: `${dept.percentage * 3}%`, background: dept.color, animationDelay: `${i * 0.1}s` }}></div>
                </div>
                <span className="dept-count">{dept.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dash-card activity-card animate-fadeInUp delay-3" id="activity-card">
          <div className="dc-header">
            <h3 className="dc-title">🔔 Recent Activity</h3>
            <button className="dc-link" id="view-all-activity">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((act, i) => (
              <div key={i} className="activity-item" id={`activity-item-${i}`}>
                <div className={`act-avatar act-${act.type}`}>{act.avatar}</div>
                <div className="act-content">
                  <p className="act-text">
                    <strong>{act.name}</strong> {act.action}
                  </p>
                  <span className="act-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="dash-card performers-card animate-fadeInUp delay-4" id="performers-card">
          <div className="dc-header">
            <h3 className="dc-title">🏆 Top Performers</h3>
            <span className="dc-badge">This Month</span>
          </div>
          <div className="performers-list">
            {topPerformers.map((perf, i) => (
              <div key={i} className="performer-item" id={`performer-item-${i}`}>
                <div className="perf-rank">#{i + 1}</div>
                <div className={`perf-avatar perf-av-${i}`}>{perf.avatar}</div>
                <div className="perf-info">
                  <strong className="perf-name">{perf.name}</strong>
                  <span className="perf-role">{perf.role}</span>
                </div>
                <div className="perf-score-wrap">
                  <div className="perf-score">{perf.score}</div>
                  <div className="perf-bar-wrap">
                    <div className="perf-bar" style={{ width: `${perf.score}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
