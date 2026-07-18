import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './AdminEmployees.css'

const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']
const DEPARTMENTS = ['IT', 'Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Testing', 'Analytics']

const AdminEmployees = () => {
  const { employees, addEmployee, deleteEmployee, updateEmployee, formatCurrency, getNetSalary } = useApp()
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [newEmp, setNewEmp] = useState({ name:'', email:'', role:'', department:'Engineering', phone:'', location:'', status:'Active', basicSalary:500000, hra:150000, allowances:50000, pf:60000, tax:75000, insurance:12000 })

  const filtered = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase())) &&
    (filterDept === 'all' || e.department === filterDept)
  )

  const handleAdd = (ev) => {
    ev.preventDefault()
    addEmployee(newEmp)
    setShowAddModal(false)
    setNewEmp({ name:'', email:'', role:'', department:'Engineering', phone:'', location:'', status:'Active', basicSalary:500000, hra:150000, allowances:50000, pf:60000, tax:75000, insurance:12000 })
  }

  const getStatusBadge = (status) => {
    if (status === 'Active') return 'badge-success'
    if (status === 'On Leave') return 'badge-warning'
    return 'badge-danger'
  }

  return (
    <div className="admin-emp-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">👥 Employee Management</h1>
          <p className="page-subtitle">Add, edit, and manage all employee records</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)} id="add-emp-btn">
          ➕ Add Employee
        </button>
      </div>

      {/* Filter Row */}
      <div className="emp-mgmt-filters">
        <div className="search-bar" style={{ flex: 1, maxWidth: '360px' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} id="emp-search" />
        </div>
        <select className="form-select" style={{ width: 180 }} value={filterDept} onChange={e => setFilterDept(e.target.value)} id="emp-dept-filter">
          <option value="all">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <span className="emp-count-badge">{filtered.length} of {employees.length} employees</span>
      </div>

      {/* Table */}
      <div className="sal-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Net Salary</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} id={`emp-row-${emp.id}`}>
                  <td>
                    <div className="sal-emp-cell">
                      <div className={`avatar avatar-${avatarColors[parseInt(emp.id) % avatarColors.length]}`}>{emp.avatar}</div>
                      <div>
                        <div className="sal-emp-name">{emp.name}</div>
                        <div className="sal-emp-id">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{emp.role}</td>
                  <td><span className="chip chip-primary">{emp.department}</span></td>
                  <td><span className={`badge ${getStatusBadge(emp.status)}`}><span className="dot"/>{emp.status}</span></td>
                  <td><span className="sal-net">{formatCurrency(getNetSalary(emp))}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div className="progress-bar-wrap" style={{ width: 60 }}><div className="progress-bar" style={{ width: `${emp.performance}%` }} /></div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{emp.performance}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelectedEmp(emp)} id={`view-emp-${emp.id}`}>👁️ View</button>
                      <button className="btn btn-accent btn-sm" onClick={() => deleteEmployee(emp.id)} id={`del-emp-${emp.id}`}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="empty-state"><div className="empty-state-icon">🔍</div><h3>No employees found</h3><p>Try adjusting your search or filters</p></div>}
        </div>
      </div>

      {/* View Employee Modal */}
      {selectedEmp && (
        <div className="modal-overlay" onClick={() => setSelectedEmp(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} id="view-emp-modal">
            <div className="modal-header">
              <h2 className="modal-title">Employee Profile</h2>
              <button className="modal-close" onClick={() => setSelectedEmp(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="emp-profile-header">
                <div className={`avatar avatar-xl avatar-${avatarColors[parseInt(selectedEmp.id) % avatarColors.length]}`}>{selectedEmp.avatar}</div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'Outfit', fontWeight: 800 }}>{selectedEmp.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{selectedEmp.role}</p>
                  <span className={`badge ${getStatusBadge(selectedEmp.status)}`}><span className="dot" />{selectedEmp.status}</span>
                </div>
              </div>
              <div className="divider" />
              {[
                { icon: '🏢', label: 'Department', value: selectedEmp.department },
                { icon: '📧', label: 'Email', value: selectedEmp.email },
                { icon: '📞', label: 'Phone', value: selectedEmp.phone },
                { icon: '📍', label: 'Location', value: selectedEmp.location },
                { icon: '📅', label: 'Join Date', value: new Date(selectedEmp.joinDate).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }) },
                { icon: '🪪', label: 'Employee ID', value: selectedEmp.employeeId },
                { icon: '💰', label: 'Net Salary', value: formatCurrency(getNetSalary(selectedEmp)) },
              ].map((d, i) => (
                <div key={i} className="emp-detail-row" id={`detail-${i}`}>
                  <span className="edr-icon">{d.icon}</span>
                  <span className="edr-label">{d.label}</span>
                  <span className="edr-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-box" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()} id="add-emp-modal">
            <div className="modal-header">
              <h2 className="modal-title">➕ Add New Employee</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAdd} id="add-emp-form">
                <div className="add-emp-grid">
                  {[
                    { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe', required: true },
                    { key: 'email', label: 'Email *', type: 'email', placeholder: 'john@techems.com', required: true },
                    { key: 'role', label: 'Role *', type: 'text', placeholder: 'Senior Developer', required: true },
                    { key: 'phone', label: 'Phone', type: 'text', placeholder: '+91 98765 43210' },
                    { key: 'location', label: 'Location', type: 'text', placeholder: 'Bangalore, India' },
                  ].map(f => (
                    <div key={f.key} className="form-group" id={`ae-${f.key}`}>
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" type={f.type} placeholder={f.placeholder} required={f.required} value={newEmp[f.key]} onChange={e => setNewEmp({...newEmp, [f.key]: e.target.value})} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <select className="form-select" value={newEmp.department} onChange={e => setNewEmp({...newEmp, department: e.target.value})} id="ae-dept">
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Basic Salary (₹)</label>
                    <input className="form-input" type="number" value={newEmp.basicSalary} onChange={e => setNewEmp({...newEmp, basicSalary: parseInt(e.target.value)})} id="ae-salary" />
                  </div>
                </div>
                <div className="modal-footer-btns">
                  <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" id="ae-submit">➕ Add Employee</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEmployees
