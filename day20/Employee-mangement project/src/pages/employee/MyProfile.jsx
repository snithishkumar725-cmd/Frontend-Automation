import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './MyProfile.css'

const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const MyProfile = () => {
  const { currentUser, employees, updateEmployee, formatCurrency, getNetSalary } = useApp()
  const empData = employees.find(e => String(e.id) === String(currentUser.id))
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ phone: empData?.phone || '', location: empData?.location || '' })
  const [saved, setSaved] = useState(false)

  const colorIdx = (parseInt(currentUser.id) || 0) % avatarColors.length

  const handleSave = () => {
    updateEmployee(currentUser.id, form)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!empData) return <div className="empty-state"><div className="empty-state-icon">❌</div><p>Profile not found</p></div>

  return (
    <div className="my-profile-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">👤 My Profile</h1>
          <p className="page-subtitle">View and update your personal information</p>
        </div>
      </div>

      {saved && <div className="success-banner animate-slideUp">✅ Profile updated successfully!</div>}

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="profile-hero-card" id="profile-hero">
          <div className={`profile-avatar avatar avatar-xl avatar-${avatarColors[colorIdx]}`}>
            {empData.avatar}
          </div>
          <h2 className="profile-name">{empData.name}</h2>
          <p className="profile-role">{empData.role}</p>
          <div className="profile-chips">
            <span className="chip chip-primary">{empData.department}</span>
            <span className="chip chip-success">{empData.status}</span>
            <span className="chip chip-purple">{empData.employeeId}</span>
          </div>
          <div className="profile-stat-row">
            <div className="psr-item">
              <span className="psr-value">{empData.projects}</span>
              <span className="psr-label">Projects</span>
            </div>
            <div className="psr-divider" />
            <div className="psr-item">
              <span className="psr-value">{empData.performance}%</span>
              <span className="psr-label">Performance</span>
            </div>
            <div className="psr-divider" />
            <div className="psr-item">
              <span className="psr-value">{new Date(empData.joinDate).getFullYear()}</span>
              <span className="psr-label">Joined</span>
            </div>
          </div>
          <div className="profile-salary">
            <span>Current Net Salary</span>
            <strong>{formatCurrency(getNetSalary(empData))}</strong>
          </div>
        </div>

        {/* Details */}
        <div className="profile-details-card" id="profile-details">
          <div className="pdc-header">
            <h3>Personal Information</h3>
            {!editing ? (
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)} id="edit-profile-btn">✏️ Edit</button>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-outline btn-sm" onClick={() => setEditing(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={handleSave} id="save-profile-btn">💾 Save</button>
              </div>
            )}
          </div>

          <div className="profile-info-grid">
            {[
              { icon: '📧', label: 'Email', value: empData.email, key: null },
              { icon: '🪪', label: 'Employee ID', value: empData.employeeId, key: null },
              { icon: '🏢', label: 'Department', value: empData.department, key: null },
              { icon: '👔', label: 'Designation', value: empData.role, key: null },
              { icon: '📅', label: 'Date of Joining', value: new Date(empData.joinDate).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' }), key: null },
              { icon: '📞', label: 'Phone', value: editing ? null : (form.phone || empData.phone), key: 'phone', editable: true },
              { icon: '📍', label: 'Location', value: editing ? null : (form.location || empData.location), key: 'location', editable: true },
            ].map((d, i) => (
              <div key={i} className="pig-row" id={`profile-field-${i}`}>
                <span className="pig-icon">{d.icon}</span>
                <div className="pig-content">
                  <span className="pig-label">{d.label}</span>
                  {editing && d.editable ? (
                    <input className="form-input" style={{ padding: '8px 12px', fontSize: '0.875rem' }} value={form[d.key]} onChange={e => setForm({...form, [d.key]: e.target.value})} id={`edit-${d.key}`} />
                  ) : (
                    <span className="pig-value">{d.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Performance Card */}
          <div className="pdc-perf" id="profile-performance">
            <h4>Performance Score</h4>
            <div className="perf-display">
              <div className="perf-score-big">{empData.performance}%</div>
              <div className="perf-bar-section">
                <div className="progress-bar-wrap" style={{ height: '10px' }}>
                  <div className="progress-bar" style={{ width: `${empData.performance}%` }} />
                </div>
                <span className="perf-category">
                  {empData.performance >= 95 ? '⭐ Exceptional' : empData.performance >= 85 ? '🌟 Excellent' : empData.performance >= 75 ? '✅ Good' : '📈 Improving'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
