import { useApp } from '../context/AppContext'
import './AdminSidebar.css'

const navItems = [
  { key: 'dashboard',   icon: '📊', label: 'Dashboard' },
  { key: 'employees',   icon: '👥', label: 'Employees' },
  { key: 'salary',      icon: '💰', label: 'Salary Management' },
  { key: 'attendance',  icon: '📅', label: 'Attendance' },
  { key: 'leaves',      icon: '🏖️', label: 'Leave Requests' },
  { key: 'reports',     icon: '📈', label: 'Reports' },
]

const AdminSidebar = ({ currentPage, onNavigate }) => {
  const { currentUser, logout } = useApp()

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="asb-brand">
        <div className="asb-logo">⚡</div>
        <div>
          <div className="asb-brand-name">TechEMS</div>
          <div className="asb-brand-sub">Admin Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="asb-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`asb-nav-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
            id={`admin-nav-${item.key}`}
          >
            <span className="asb-nav-icon">{item.icon}</span>
            <span className="asb-nav-label">{item.label}</span>
            {currentPage === item.key && <span className="asb-nav-indicator" />}
          </button>
        ))}
      </nav>

      {/* Footer / User */}
      <div className="asb-footer">
        <div className="asb-divider" />
        <div className="asb-user">
          <div className="asb-avatar">AD</div>
          <div className="asb-user-info">
            <div className="asb-user-name">{currentUser?.name}</div>
            <div className="asb-user-role">Administrator</div>
          </div>
        </div>
        <button className="asb-logout" onClick={logout} id="admin-logout-btn">
          🚪 Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
