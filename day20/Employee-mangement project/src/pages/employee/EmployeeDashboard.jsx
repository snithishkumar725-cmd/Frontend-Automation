import { useApp } from '../../context/AppContext'
import './EmployeeDashboard.css'

const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const EmployeeDashboard = ({ onNavigate }) => {
  const { currentUser, getAttendanceSummary, salaryHistory, leaveRequests, formatCurrency, getNetSalary, employees } = useApp()

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const summary = getAttendanceSummary(currentUser.id, year, month)
  const empData = employees.find(e => String(e.id) === String(currentUser.id))
  const netSalary = empData ? getNetSalary(empData) : 0
  const myLeaves = leaveRequests.filter(l => String(l.employeeId) === String(currentUser.id))
  const pendingLeaves = myLeaves.filter(l => l.status === 'pending').length
  const lastSlip = salaryHistory[String(currentUser.id)]?.slice(-1)[0]
  const colorIdx = (parseInt(currentUser.id) || 0) % avatarColors.length

  const greetHour = now.getHours()
  const greeting = greetHour < 12 ? 'Good morning' : greetHour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="emp-dashboard animate-fadeIn">
      {/* Hero Greeting */}
      <div className="emp-hero">
        <div className="emp-hero-left">
          <div className="emp-greeting">{greeting}! 👋</div>
          <h1 className="emp-hero-name">{currentUser.name}</h1>
          <div className="emp-hero-meta">
            <span className="chip chip-primary">{currentUser.role}</span>
            <span className="chip chip-success">{currentUser.department}</span>
            <span className="chip chip-purple">{currentUser.employeeId}</span>
          </div>
        </div>
        <div className={`emp-hero-avatar avatar avatar-xl avatar-${avatarColors[colorIdx]}`}>
          {currentUser.avatar}
        </div>
      </div>

      {/* Stats */}
      <div className="emp-stats-grid">
        {[
          { label: 'Days Present', value: summary.present, icon: '✅', color: 'success', sub: `This month`, action: () => onNavigate('attendance') },
          { label: 'Days Absent', value: summary.absent, icon: '❌', color: 'accent', sub: 'This month', action: () => onNavigate('attendance') },
          { label: 'Net Salary', value: formatCurrency(netSalary), icon: '💰', color: 'primary', sub: 'Current month', action: () => onNavigate('salary') },
          { label: 'Leave Requests', value: myLeaves.length, icon: '🏖️', color: pendingLeaves > 0 ? 'warning' : 'info', sub: `${pendingLeaves} pending`, action: () => onNavigate('leaves') },
        ].map((s, i) => (
          <div key={i} className="emp-stat-card" onClick={s.action} style={{ cursor: 'pointer' }} id={`emp-stat-${i}`}>
            <div className="esc-top">
              <div className={`esc-icon esc-${s.color}`}>{s.icon}</div>
            </div>
            <div className="esc-value">{s.value}</div>
            <div className="esc-label">{s.label}</div>
            <div className="esc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="emp-dash-grid">
        {/* Attendance Summary */}
        <div className="emp-card" id="emp-att-card">
          <div className="emp-card-header">
            <h3>📅 This Month Attendance</h3>
            <button className="link-btn" onClick={() => onNavigate('attendance')}>Full Calendar →</button>
          </div>
          <div className="att-donut-section">
            <div className="att-bars">
              {[
                { label: 'Present', count: summary.present, color: '#10b981', max: summary.working || 1 },
                { label: 'Absent', count: summary.absent, color: '#f43f5e', max: summary.working || 1 },
                { label: 'Half Day', count: summary.halfday, color: '#f59e0b', max: summary.working || 1 },
                { label: 'On Leave', count: summary.leave, color: '#8b5cf6', max: summary.working || 1 },
              ].map(a => (
                <div key={a.label} className="att-bar-row" id={`att-row-${a.label}`}>
                  <span className="abr-label">{a.label}</span>
                  <div className="abr-bar-bg">
                    <div className="abr-bar-fill" style={{ width: `${(a.count / a.max) * 100}%`, background: a.color }} />
                  </div>
                  <span className="abr-count">{a.count}</span>
                </div>
              ))}
            </div>
            <div className="att-rate-circle">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="8" />
                <circle cx="40" cy="40" r="32" fill="none" stroke="#6366f1" strokeWidth="8"
                  strokeDasharray={`${(summary.present / (summary.working || 1)) * 201} 201`}
                  strokeLinecap="round" transform="rotate(-90 40 40)" style={{ transition: 'stroke-dasharray 1s ease' }} />
              </svg>
              <div className="arc-center">
                <div className="arc-pct">{summary.working > 0 ? Math.round((summary.present / summary.working) * 100) : 0}%</div>
                <div className="arc-lbl">Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Salary Slip */}
        <div className="emp-card" id="emp-salary-card">
          <div className="emp-card-header">
            <h3>💳 Latest Salary Slip</h3>
            <button className="link-btn" onClick={() => onNavigate('salary')}>View All →</button>
          </div>
          {lastSlip ? (
            <div className="latest-slip">
              <div className="ls-month">{lastSlip.month}</div>
              <div className="ls-net">{formatCurrency((lastSlip.basicSalary + lastSlip.hra + lastSlip.allowances) - (lastSlip.pf + lastSlip.tax + lastSlip.insurance))}</div>
              <div className="ls-label">Net Salary</div>
              <div className="ls-breakdown">
                <div className="ls-item"><span>Basic</span><strong>{formatCurrency(lastSlip.basicSalary)}</strong></div>
                <div className="ls-item"><span>HRA</span><strong>{formatCurrency(lastSlip.hra)}</strong></div>
                <div className="ls-item"><span>Deductions</span><strong style={{color:'#e11d48'}}>- {formatCurrency(lastSlip.pf + lastSlip.tax + lastSlip.insurance)}</strong></div>
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 14, width: '100%' }} onClick={() => onNavigate('salary')} id="view-slip-btn">
                📥 Download Salary Slip
              </button>
            </div>
          ) : (
            <div className="empty-state"><div className="empty-state-icon">📄</div><p>No salary slips yet</p></div>
          )}
        </div>

        {/* Quick Links */}
        <div className="emp-card" id="emp-quick-links">
          <div className="emp-card-header"><h3>⚡ Quick Links</h3></div>
          <div className="emp-quick-grid">
            {[
              { icon: '📅', label: 'View Attendance', color: 'info', page: 'attendance' },
              { icon: '💳', label: 'Salary Slips', color: 'primary', page: 'salary' },
              { icon: '🏖️', label: 'Apply Leave', color: 'warning', page: 'leaves' },
              { icon: '👤', label: 'My Profile', color: 'success', page: 'profile' },
            ].map((q, i) => (
              <button key={i} className={`qa-btn qa-${q.color}`} onClick={() => onNavigate(q.page)} id={`emp-quick-${i}`}>
                <span className="qa-icon">{q.icon}</span>
                <span className="qa-label">{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Leave Summary */}
        <div className="emp-card" id="emp-leaves-card">
          <div className="emp-card-header">
            <h3>🏖️ My Leave Status</h3>
            <button className="link-btn" onClick={() => onNavigate('leaves')}>Apply Leave →</button>
          </div>
          {myLeaves.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">✅</div><p>No leave requests yet</p></div>
          ) : (
            <div className="my-leaves-list">
              {myLeaves.slice(-3).reverse().map(lr => (
                <div key={lr.id} className="mll-row" id={`mll-${lr.id}`}>
                  <div className="mll-info">
                    <span className="mll-type">{lr.type}</span>
                    <span className="mll-dates">{new Date(lr.from).toLocaleDateString('en-IN', { day:'numeric', month:'short' })} → {new Date(lr.to).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</span>
                  </div>
                  <span className={`badge badge-${lr.status === 'pending' ? 'warning' : lr.status === 'approved' ? 'success' : 'danger'}`}><span className="dot"/>{lr.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
