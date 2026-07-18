import { useApp } from '../context/AppContext'
import './EmployeeSidebar.css'

const navItems = [
  { key: 'dashboard',  icon: '🏠', label: 'My Dashboard' },
  { key: 'attendance', icon: '📅', label: 'My Attendance' },
  { key: 'salary',     icon: '💳', label: 'Salary Slips' },
  { key: 'leaves',     icon: '🏖️', label: 'Leave Request' },
  { key: 'profile',    icon: '👤', label: 'My Profile' },
]

const avatarColors = ['primary', 'accent', 'success', 'warning', 'purple', 'info', 'cyan', 'pink']

const EmployeeSidebar = ({ currentPage, onNavigate }) => {
  const { currentUser, logout } = useApp()
  const colorIdx = (currentUser?.id || 0) % avatarColors.length

  return (
    <aside className="emp-sidebar">
      {/* Brand */}
      <div className="esb-brand">
        <div className="esb-logo">⚡</div>
        <div>
          <div className="esb-brand-name">TechEMS</div>
          <div className="esb-brand-sub">Employee Portal</div>
        </div>
      </div>

      {/* Employee Banner */}
      <div className="esb-user-banner">
        <div className={`esb-user-avatar avatar avatar-${avatarColors[colorIdx]}`}>
          {currentUser?.avatar}
        </div>
        <div className="esb-user-info">
          <div className="esb-user-name">{currentUser?.name}</div>
          <div className="esb-user-role">{currentUser?.role}</div>
          <span className="esb-emp-id">{currentUser?.employeeId}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="esb-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`esb-nav-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
            id={`emp-nav-${item.key}`}
          >
            <span className="esb-nav-icon">{item.icon}</span>
            <span className="esb-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="esb-footer">
        <div className="esb-divider" />
        <button className="esb-logout" onClick={logout} id="emp-logout-btn">
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}

export default EmployeeSidebar
