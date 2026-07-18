import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './AdminDashboard.css'

const AdminDashboard = ({ onNavigate }) => {
  const { employees, leaveRequests, attendance, formatCurrency, getNetSalary } = useApp()
  const [period, setPeriod] = useState('month')

  const activeEmp = employees.filter(e => e.status === 'Active').length
  const onLeave = employees.filter(e => e.status === 'On Leave').length
  const totalPayroll = employees.reduce((s, e) => s + getNetSalary(e), 0)
  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length

  const today = new Date().toISOString().split('T')[0]
  let presentToday = 0
  employees.forEach(emp => {
    if (attendance[emp.id]?.[today] === 'present') presentToday++
  })
  const attendanceRate = employees.length > 0 ? Math.round((presentToday / employees.length) * 100) : 0

  const deptMap = {}
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1 })
  const deptColors = { Engineering: '#6366f1', Design: '#f43f5e', Marketing: '#f59e0b', Sales: '#10b981', HR: '#3b82f6', Finance: '#8b5cf6', Operations: '#06b6d4' }

  const recentLeaves = leaveRequests.slice(-4).reverse()
  const topPerformers = [...employees].sort((a, b) => b.performance - a.performance).slice(0, 5)

  const avatarColors = ['primary', 'accent', 'success', 'warning', 'purple', 'info', 'cyan', 'pink', 'orange']

  return (
    <div className="admin-dashboard animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard 👋</h1>
          <p className="page-subtitle">Welcome back, Admin! Here's your workforce overview.</p>
        </div>
        <div className="dh-actions">
          <div className="period-tabs">
            {['week','month','year'].map(p => (
              <button key={p} className={`period-tab ${period===p?'active':''}`} onClick={()=>setPeriod(p)}>
                {p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {[
          { label: 'Total Employees', value: employees.length, icon: '👥', color: 'primary', change: '+5.2%', up: true, sub: `${activeEmp} active`, action: () => onNavigate('employees') },
          { label: 'Monthly Payroll', value: formatCurrency(totalPayroll), icon: '💰', color: 'success', change: '+3.1%', up: true, sub: 'Net after deductions', action: () => onNavigate('salary') },
          { label: 'Attendance Today', value: `${attendanceRate}%`, icon: '📅', color: 'info', change: presentToday > 0 ? '+2%' : '—', up: true, sub: `${presentToday} present`, action: () => onNavigate('attendance') },
          { label: 'Pending Leaves', value: pendingLeaves, icon: '🏖️', color: pendingLeaves > 0 ? 'warning' : 'success', change: pendingLeaves > 0 ? 'Needs review' : 'All clear', up: false, sub: `${onLeave} on leave`, action: () => onNavigate('leaves') },
        ].map((stat, i) => (
          <div key={i} className={`adm-stat-card stat-${stat.color}`} onClick={stat.action} style={{cursor:'pointer'}} id={`stat-${stat.color}`}>
            <div className="adm-stat-top">
              <div className={`adm-stat-icon icon-${stat.color}`}>{stat.icon}</div>
              <span className={`stat-change ${stat.up ? 'up' : 'warn'}`}>{stat.change}</span>
            </div>
            <div className="adm-stat-value">{stat.value}</div>
            <div className="adm-stat-label">{stat.label}</div>
            <div className="adm-stat-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="adm-grid">

        {/* Department Distribution */}
        <div className="adm-card" id="dept-card">
          <div className="adm-card-header">
            <h3>🏢 Department Distribution</h3>
            <button className="link-btn" onClick={() => onNavigate('employees')}>View All →</button>
          </div>
          <div className="dept-list">
            {Object.entries(deptMap).map(([dept, count], i) => {
              const pct = Math.round((count / employees.length) * 100)
              return (
                <div key={dept} className="dept-row" id={`dept-row-${i}`}>
                  <div className="dept-dot" style={{ background: deptColors[dept] || '#6366f1' }} />
                  <span className="dept-name">{dept}</span>
                  <div className="dept-bar-bg">
                    <div className="dept-bar-fill" style={{ width: `${pct * 3}%`, background: deptColors[dept] || '#6366f1', animationDelay: `${i * 0.1}s` }} />
                  </div>
                  <span className="dept-count">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="adm-card" id="performers-card">
          <div className="adm-card-header">
            <h3>🏆 Top Performers</h3>
            <span className="badge-chip">This Month</span>
          </div>
          <div className="performers-list">
            {topPerformers.map((emp, i) => (
              <div key={emp.id} className="performer-row" id={`performer-${emp.id}`}>
                <span className="perf-rank">#{i + 1}</span>
                <div className={`perf-avatar avatar avatar-${avatarColors[emp.id % avatarColors.length]}`}>{emp.avatar}</div>
                <div className="perf-info">
                  <span className="perf-name">{emp.name}</span>
                  <span className="perf-role">{emp.role}</span>
                </div>
                <div className="perf-right">
                  <span className="perf-score">{emp.performance}%</span>
                  <div className="progress-bar-wrap" style={{width:'80px'}}>
                    <div className="progress-bar" style={{width:`${emp.performance}%`}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="adm-card" id="leaves-card">
          <div className="adm-card-header">
            <h3>🏖️ Recent Leave Requests</h3>
            <button className="link-btn" onClick={() => onNavigate('leaves')}>Manage →</button>
          </div>
          {recentLeaves.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">✅</div><p>No pending requests</p></div>
          ) : (
            <div className="leaves-list">
              {recentLeaves.map(lr => {
                const emp = employees.find(e => String(e.id) === String(lr.employeeId))
                return (
                  <div key={lr.id} className="leave-row" id={`leave-row-${lr.id}`}>
                    <div className={`avatar avatar-${avatarColors[(parseInt(emp?.id)||0) % avatarColors.length]}`}>{emp?.avatar || '?'}</div>
                    <div className="leave-info">
                      <span className="leave-name">{emp?.name}</span>
                      <span className="leave-type">{lr.type} · {lr.days}d</span>
                    </div>
                    <span className={`leave-status status-${lr.status}`}>{lr.status}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="adm-card quick-actions-card" id="quick-actions">
          <div className="adm-card-header">
            <h3>⚡ Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            {[
              { icon: '💰', label: 'Manage Salaries', color: 'primary', action: () => onNavigate('salary') },
              { icon: '📅', label: 'Mark Attendance', color: 'info', action: () => onNavigate('attendance') },
              { icon: '👥', label: 'Add Employee', color: 'success', action: () => onNavigate('employees') },
              { icon: '✅', label: 'Approve Leaves', color: 'warning', action: () => onNavigate('leaves') },
              { icon: '📈', label: 'View Reports', color: 'purple', action: () => onNavigate('reports') },
              { icon: '📊', label: 'Salary Reports', color: 'accent', action: () => onNavigate('salary') },
            ].map((qa, i) => (
              <button key={i} className={`qa-btn qa-${qa.color}`} onClick={qa.action} id={`qa-${i}`}>
                <span className="qa-icon">{qa.icon}</span>
                <span className="qa-label">{qa.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
