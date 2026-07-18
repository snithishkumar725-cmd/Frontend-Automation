import { useState } from 'react'
import './EmployeeDetails.css'

const EmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: '', email: '', role: '', department: 'Engineering', phone: '', location: '', status: 'Active'
  })

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Arun Kumar', email: 'arun.kumar@techems.com', role: 'Senior Developer', department: 'Engineering', status: 'Active', phone: '+91 98765 43210', location: 'Bangalore, India', joinDate: '2023-03-15', salary: '₹12,00,000', avatar: 'AK', performance: 94, projects: 12 },
    { id: 2, name: 'Priya Singh', email: 'priya.singh@techems.com', role: 'UI/UX Designer', department: 'Design', status: 'Active', phone: '+91 98765 43211', location: 'Mumbai, India', joinDate: '2022-07-20', salary: '₹10,00,000', avatar: 'PS', performance: 91, projects: 8 },
    { id: 3, name: 'Raj Patel', email: 'raj.patel@techems.com', role: 'Project Manager', department: 'Operations', status: 'On Leave', phone: '+91 98765 43212', location: 'Delhi, India', joinDate: '2021-11-01', salary: '₹15,00,000', avatar: 'RP', performance: 88, projects: 15 },
    { id: 4, name: 'Meena Sharma', email: 'meena.sharma@techems.com', role: 'Marketing Lead', department: 'Marketing', status: 'Active', phone: '+91 98765 43213', location: 'Chennai, India', joinDate: '2023-01-10', salary: '₹11,00,000', avatar: 'MS', performance: 96, projects: 10 },
    { id: 5, name: 'David Wilson', email: 'david.wilson@techems.com', role: 'Product Designer', department: 'Design', status: 'Active', phone: '+1 555 123 4567', location: 'San Francisco, USA', joinDate: '2022-09-05', salary: '$95,000', avatar: 'DW', performance: 89, projects: 7 },
    { id: 6, name: 'Sophie Martin', email: 'sophie.martin@techems.com', role: 'Data Analyst', department: 'Engineering', status: 'Active', phone: '+44 20 7946 0958', location: 'London, UK', joinDate: '2023-06-22', salary: '£65,000', avatar: 'SM', performance: 92, projects: 9 },
    { id: 7, name: 'Vikram Shah', email: 'vikram.shah@techems.com', role: 'Sales Manager', department: 'Sales', status: 'Active', phone: '+91 98765 43214', location: 'Pune, India', joinDate: '2021-05-18', salary: '₹14,00,000', avatar: 'VS', performance: 97, projects: 20 },
    { id: 8, name: 'Lisa Wang', email: 'lisa.wang@techems.com', role: 'HR Specialist', department: 'HR', status: 'Inactive', phone: '+86 138 0013 8000', location: 'Shanghai, China', joinDate: '2022-02-14', salary: '¥180,000', avatar: 'LW', performance: 85, projects: 5 },
    { id: 9, name: 'Karthik Rajan', email: 'karthik.r@techems.com', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', phone: '+91 98765 43215', location: 'Hyderabad, India', joinDate: '2023-08-01', salary: '₹13,00,000', avatar: 'KR', performance: 93, projects: 11 },
    { id: 10, name: 'Anita Desai', email: 'anita.desai@techems.com', role: 'Finance Lead', department: 'Finance', status: 'Active', phone: '+91 98765 43216', location: 'Ahmedabad, India', joinDate: '2020-12-10', salary: '₹16,00,000', avatar: 'AD', performance: 98, projects: 14 },
    { id: 11, name: 'James Brown', email: 'james.brown@techems.com', role: 'Backend Developer', department: 'Engineering', status: 'On Leave', phone: '+1 555 987 6543', location: 'New York, USA', joinDate: '2023-04-20', salary: '$105,000', avatar: 'JB', performance: 87, projects: 6 },
    { id: 12, name: 'Fatima Ali', email: 'fatima.ali@techems.com', role: 'Content Strategist', department: 'Marketing', status: 'Active', phone: '+971 50 123 4567', location: 'Dubai, UAE', joinDate: '2022-11-30', salary: 'AED 240,000', avatar: 'FA', performance: 90, projects: 8 },
  ])

  const departments = ['all', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
  const statuses = ['all', 'Active', 'On Leave', 'Inactive']

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = filterDept === 'all' || emp.department === filterDept
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus
    return matchesSearch && matchesDept && matchesStatus
  })

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'active'
      case 'On Leave': return 'on-leave'
      case 'Inactive': return 'inactive'
      default: return ''
    }
  }

  const getAvatarColor = (id) => {
    const colors = ['primary', 'accent', 'cool', 'warm', 'fresh', 'sunset']
    return colors[id % colors.length]
  }

  const handleAddEmployee = (e) => {
    e.preventDefault()
    const id = employees.length + 1
    const avatar = newEmployee.name.split(' ').map(n => n[0]).join('').toUpperCase()
    setEmployees(prev => [...prev, {
      ...newEmployee,
      id,
      avatar,
      joinDate: new Date().toISOString().split('T')[0],
      salary: '—',
      performance: 0,
      projects: 0,
    }])
    setNewEmployee({ name: '', email: '', role: '', department: 'Engineering', phone: '', location: '', status: 'Active' })
    setShowAddModal(false)
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
    if (selectedEmployee?.id === id) setSelectedEmployee(null)
  }

  return (
    <div className="employees-page" id="employees-page">
      {/* Header */}
      <div className="emp-header">
        <div className="emp-header-text">
          <h1 className="emp-title animate-fadeInUp delay-1">Employee Details 👥</h1>
          <p className="emp-subtitle animate-fadeInUp delay-2">
            Manage and view all employee information in one place
          </p>
        </div>
        <button className="btn btn-primary animate-fadeInUp delay-2" onClick={() => setShowAddModal(true)} id="add-employee-btn">
          ➕ Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="emp-filters animate-fadeInUp delay-2" id="emp-filters">
        <div className="search-box" id="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search employees by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="filter-group">
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} id="filter-dept" className="filter-select">
            {departments.map(d => (
              <option key={d} value={d}>{d === 'all' ? '🏢 All Departments' : d}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} id="filter-status" className="filter-select">
            {statuses.map(s => (
              <option key={s} value={s}>{s === 'all' ? '📋 All Status' : s}</option>
            ))}
          </select>
          <div className="view-toggle" id="view-toggle">
            <button className={`vt-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid View">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button className={`vt-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="List View">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 3h14M1 8h14M1 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="emp-count animate-fadeInUp delay-3">
        Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees
      </div>

      {/* Employee Grid/List */}
      <div className={`emp-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {filteredEmployees.map((emp, i) => (
          <div
            key={emp.id}
            className={`emp-card animate-fadeInUp delay-${(i % 4) + 1}`}
            onClick={() => setSelectedEmployee(emp)}
            id={`emp-card-${emp.id}`}
          >
            <div className="emp-card-header">
              <div className={`emp-avatar emp-avatar-${getAvatarColor(emp.id)}`}>
                {emp.avatar}
              </div>
              <div className={`status-badge ${getStatusClass(emp.status)}`}>
                <span className="dot"></span>
                {emp.status}
              </div>
            </div>
            <h3 className="emp-name">{emp.name}</h3>
            <p className="emp-role">{emp.role}</p>
            <div className="emp-meta">
              <span className="emp-meta-item">🏢 {emp.department}</span>
              <span className="emp-meta-item">📍 {emp.location.split(',')[0]}</span>
            </div>
            <div className="emp-card-footer">
              <div className="emp-perf">
                <span className="emp-perf-label">Performance</span>
                <div className="emp-perf-bar-wrap">
                  <div className="emp-perf-bar" style={{ width: `${emp.performance}%` }}></div>
                </div>
                <span className="emp-perf-score">{emp.performance}%</span>
              </div>
            </div>
            <div className="emp-card-actions">
              <button className="eca-btn view" onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }} title="View">👁️</button>
              <button className="eca-btn delete" onClick={(e) => { e.stopPropagation(); handleDeleteEmployee(emp.id); }} title="Delete">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="emp-empty">
          <div className="emp-empty-icon">🔍</div>
          <h3>No employees found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={() => setSelectedEmployee(null)} id="emp-detail-modal">
          <div className="modal-content emp-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedEmployee(null)} id="close-detail-modal">✕</button>
            <div className="edm-header">
              <div className={`edm-avatar emp-avatar-${getAvatarColor(selectedEmployee.id)}`}>
                {selectedEmployee.avatar}
              </div>
              <div className="edm-header-info">
                <h2 className="edm-name">{selectedEmployee.name}</h2>
                <p className="edm-role">{selectedEmployee.role}</p>
                <div className={`status-badge ${getStatusClass(selectedEmployee.status)}`}>
                  <span className="dot"></span>
                  {selectedEmployee.status}
                </div>
              </div>
            </div>
            <div className="edm-stats">
              <div className="edm-stat">
                <span className="edm-stat-value">{selectedEmployee.performance}%</span>
                <span className="edm-stat-label">Performance</span>
              </div>
              <div className="edm-stat">
                <span className="edm-stat-value">{selectedEmployee.projects}</span>
                <span className="edm-stat-label">Projects</span>
              </div>
              <div className="edm-stat">
                <span className="edm-stat-value">{new Date(selectedEmployee.joinDate).getFullYear()}</span>
                <span className="edm-stat-label">Joined</span>
              </div>
            </div>
            <div className="edm-details">
              {[
                { label: 'Email', value: selectedEmployee.email, icon: '📧' },
                { label: 'Phone', value: selectedEmployee.phone, icon: '📞' },
                { label: 'Department', value: selectedEmployee.department, icon: '🏢' },
                { label: 'Location', value: selectedEmployee.location, icon: '📍' },
                { label: 'Join Date', value: new Date(selectedEmployee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: '📅' },
                { label: 'Salary', value: selectedEmployee.salary, icon: '💰' },
              ].map((detail, i) => (
                <div key={i} className="edm-detail-row">
                  <span className="edm-detail-icon">{detail.icon}</span>
                  <span className="edm-detail-label">{detail.label}</span>
                  <span className="edm-detail-value">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)} id="add-emp-modal">
          <div className="modal-content add-emp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddModal(false)} id="close-add-modal">✕</button>
            <h2 className="modal-title">➕ Add New Employee</h2>
            <form onSubmit={handleAddEmployee} className="add-emp-form" id="add-emp-form">
              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="emp-name-input">Full Name *</label>
                  <input
                    id="emp-name-input"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="emp-email-input">Email *</label>
                  <input
                    id="emp-email-input"
                    type="email"
                    placeholder="john@techems.com"
                    required
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="emp-role-input">Role *</label>
                  <input
                    id="emp-role-input"
                    type="text"
                    placeholder="Senior Developer"
                    required
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="emp-dept-input">Department</label>
                  <select
                    id="emp-dept-input"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  >
                    {departments.filter(d => d !== 'all').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="emp-phone-input">Phone</label>
                  <input
                    id="emp-phone-input"
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="emp-location-input">Location</label>
                  <input
                    id="emp-location-input"
                    type="text"
                    placeholder="Bangalore, India"
                    value={newEmployee.location}
                    onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" id="submit-add-emp">Add Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeDetails
