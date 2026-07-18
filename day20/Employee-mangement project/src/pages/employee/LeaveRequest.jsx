import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './LeaveRequest.css'

const LEAVE_TYPES = ['Sick Leave','Casual Leave','Annual Leave','Maternity Leave','Paternity Leave','Emergency Leave']
const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const LeaveRequest = () => {
  const { currentUser, leaveRequests, applyLeave } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ type: 'Casual Leave', from: '', to: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)

  const myLeaves = leaveRequests.filter(l => l.employeeId === currentUser.id)
    .sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))

  const calcDays = () => {
    if (!form.from || !form.to) return 0
    const diff = (new Date(form.to) - new Date(form.from)) / (1000 * 60 * 60 * 24)
    return Math.max(1, Math.round(diff) + 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    applyLeave({ employeeId: currentUser.id, ...form, days: calcDays() })
    setForm({ type: 'Casual Leave', from: '', to: '', reason: '' })
    setShowForm(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const today = new Date().toISOString().split('T')[0]
  const pending = myLeaves.filter(l => l.status === 'pending').length
  const approved = myLeaves.filter(l => l.status === 'approved').length
  const totalDays = myLeaves.reduce((s, l) => l.status === 'approved' ? s + l.days : s, 0)

  return (
    <div className="leave-req-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">🏖️ Leave Request</h1>
          <p className="page-subtitle">Apply for leave and track your request status</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} id="apply-leave-btn">
          ➕ Apply for Leave
        </button>
      </div>

      {submitted && (
        <div className="success-banner animate-slideUp">
          ✅ Your leave request has been submitted successfully!
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '22px' }}>
        {[
          { label: 'Pending', value: pending, icon: '⏳', color: 'warning' },
          { label: 'Approved', value: approved, icon: '✅', color: 'success' },
          { label: 'Days Approved', value: totalDays, icon: '📅', color: 'primary' },
          { label: 'Total Requests', value: myLeaves.length, icon: '📋', color: 'info' },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card stat-${s.color}`} id={`lr-stat-${i}`}>
            <div className="adm-stat-top"><div className={`adm-stat-icon icon-${s.color}`}>{s.icon}</div></div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Leave History */}
      <div className="lr-history-card">
        <div className="adm-card-header">
          <h3>📋 My Leave Requests</h3>
        </div>
        {myLeaves.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">🏖️</div><h3>No leave requests yet</h3><p>Click "Apply for Leave" to get started</p></div>
        ) : (
          <div className="lr-cards-grid">
            {myLeaves.map(lr => (
              <div key={lr.id} className={`lr-card lrc-${lr.status}`} id={`lr-card-${lr.id}`}>
                <div className="lrc-header">
                  <div className="lrc-type">{lr.type}</div>
                  <span className={`badge badge-${lr.status === 'pending' ? 'warning' : lr.status === 'approved' ? 'success' : 'danger'}`}>
                    <span className="dot" />{lr.status.charAt(0).toUpperCase()+lr.status.slice(1)}
                  </span>
                </div>
                <div className="lrc-dates">
                  <span>{new Date(lr.from).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  <span className="lrc-arrow">→</span>
                  <span>{new Date(lr.to).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                  <span className="lrc-days">({lr.days} day{lr.days>1?'s':''})</span>
                </div>
                <p className="lrc-reason">{lr.reason}</p>
                {lr.adminNote && <div className="lrc-admin-note"><span>Admin:</span> {lr.adminNote}</div>}
                <div className="lrc-applied">Applied on {new Date(lr.appliedOn).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Leave Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} id="apply-leave-modal">
            <div className="modal-header">
              <h2 className="modal-title">🏖️ Apply for Leave</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} id="leave-form">
                <div className="form-group" style={{ marginBottom: 14 }}>
                  <label className="form-label">Leave Type *</label>
                  <select className="form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})} id="lr-type">
                    {LEAVE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div className="form-group">
                    <label className="form-label">From Date *</label>
                    <input className="form-input" type="date" min={today} value={form.from} onChange={e => setForm({...form, from: e.target.value})} required id="lr-from" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">To Date *</label>
                    <input className="form-input" type="date" min={form.from || today} value={form.to} onChange={e => setForm({...form, to: e.target.value})} required id="lr-to" />
                  </div>
                </div>
                {form.from && form.to && (
                  <div className="lr-days-preview">
                    📅 Duration: <strong>{calcDays()} day{calcDays()>1?'s':''}</strong>
                  </div>
                )}
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="form-label">Reason *</label>
                  <textarea className="form-textarea" placeholder="Briefly explain the reason for your leave..." value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required id="lr-reason" />
                </div>
                <div className="modal-footer-btns">
                  <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" id="lr-submit">🏖️ Submit Request</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaveRequest
