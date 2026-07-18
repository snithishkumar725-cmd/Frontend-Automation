import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './LeaveManagement.css'

const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const LeaveManagement = () => {
  const { employees, leaveRequests, updateLeaveStatus } = useApp()
  const [filterStatus, setFilterStatus] = useState('all')
  const [note, setNote] = useState('')
  const [actionId, setActionId] = useState(null)

  const filtered = leaveRequests.filter(l => filterStatus === 'all' || l.status === filterStatus)
    .sort((a, b) => new Date(b.appliedOn) - new Date(a.appliedOn))

  const pending = leaveRequests.filter(l => l.status === 'pending').length
  const approved = leaveRequests.filter(l => l.status === 'approved').length
  const rejected = leaveRequests.filter(l => l.status === 'rejected').length

  const handleAction = (id, status) => {
    updateLeaveStatus(id, status, note)
    setActionId(null)
    setNote('')
  }

  return (
    <div className="leave-mgmt-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">🏖️ Leave Management</h1>
          <p className="page-subtitle">Review and manage employee leave requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: '22px' }}>
        {[
          { label: 'Pending Review', value: pending, icon: '⏳', color: 'warning' },
          { label: 'Approved', value: approved, icon: '✅', color: 'success' },
          { label: 'Rejected', value: rejected, icon: '❌', color: 'accent' },
          { label: 'Total Requests', value: leaveRequests.length, icon: '📋', color: 'primary' },
        ].map((s, i) => (
          <div key={i} className={`adm-stat-card stat-${s.color}`} id={`leave-stat-${i}`}>
            <div className="adm-stat-top">
              <div className={`adm-stat-icon icon-${s.color}`}>{s.icon}</div>
            </div>
            <div className="adm-stat-value">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="leave-tabs">
        {['all','pending','approved','rejected'].map(tab => (
          <button
            key={tab}
            className={`leave-tab ${filterStatus === tab ? 'active' : ''} tab-${tab}`}
            onClick={() => setFilterStatus(tab)}
            id={`leave-tab-${tab}`}
          >
            {tab === 'all' ? '📋 All' : tab === 'pending' ? '⏳ Pending' : tab === 'approved' ? '✅ Approved' : '❌ Rejected'}
            <span className="leave-tab-count">{tab === 'all' ? leaveRequests.length : leaveRequests.filter(l => l.status === tab).length}</span>
          </button>
        ))}
      </div>

      {/* Leave Cards */}
      <div className="leave-cards-grid">
        {filtered.length === 0 && (
          <div className="empty-state"><div className="empty-state-icon">✅</div><h3>No requests found</h3><p>There are no leave requests for this filter</p></div>
        )}
        {filtered.map(leave => {
          const emp = employees.find(e => e.id === leave.employeeId)
          return (
            <div key={leave.id} className={`leave-card lc-${leave.status}`} id={`leave-card-${leave.id}`}>
              <div className="lc-header">
                <div className="lc-emp">
                  <div className={`avatar avatar-${avatarColors[(emp?.id || 0) % avatarColors.length]}`}>{emp?.avatar || '?'}</div>
                  <div>
                    <div className="lc-emp-name">{emp?.name || 'Unknown'}</div>
                    <div className="lc-emp-dept">{emp?.department}</div>
                  </div>
                </div>
                <span className={`badge badge-${leave.status === 'pending' ? 'warning' : leave.status === 'approved' ? 'success' : 'danger'}`}>
                  <span className="dot" />
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>

              <div className="lc-details">
                <div className="lc-detail-item">
                  <span>Type</span>
                  <strong>{leave.type}</strong>
                </div>
                <div className="lc-detail-item">
                  <span>Duration</span>
                  <strong>{leave.days} day{leave.days > 1 ? 's' : ''}</strong>
                </div>
                <div className="lc-detail-item">
                  <span>From</span>
                  <strong>{new Date(leave.from).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</strong>
                </div>
                <div className="lc-detail-item">
                  <span>To</span>
                  <strong>{new Date(leave.to).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}</strong>
                </div>
              </div>

              <div className="lc-reason">
                <span>Reason:</span> {leave.reason}
              </div>

              {leave.adminNote && (
                <div className="lc-admin-note">
                  <span>Admin Note:</span> {leave.adminNote}
                </div>
              )}

              <div className="lc-footer">
                <span className="lc-applied">Applied: {new Date(leave.appliedOn).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</span>
                {leave.status === 'pending' && (
                  <div className="lc-actions">
                    {actionId === leave.id ? (
                      <div className="lc-note-form">
                        <input className="form-input" placeholder="Optional note..." value={note} onChange={e => setNote(e.target.value)} id={`leave-note-${leave.id}`} />
                        <div className="lc-note-btns">
                          <button className="btn btn-success btn-sm" onClick={() => handleAction(leave.id, 'approved')} id={`approve-${leave.id}`}>✅ Approve</button>
                          <button className="btn btn-accent btn-sm" onClick={() => handleAction(leave.id, 'rejected')} id={`reject-${leave.id}`}>❌ Reject</button>
                          <button className="btn btn-ghost btn-sm" onClick={() => setActionId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => setActionId(leave.id)} id={`review-${leave.id}`}>Review</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LeaveManagement
