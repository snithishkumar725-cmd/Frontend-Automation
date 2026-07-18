import { useApp } from '../../context/AppContext'
import './AdminReports.css'

const avatarColors = ['primary','accent','success','warning','purple','info','cyan','pink','orange']

const AdminReports = () => {
  const { employees, leaveRequests, attendance, formatCurrency, getNetSalary, getAttendanceSummary } = useApp()

  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  const totalPayroll = employees.reduce((s, e) => s + getNetSalary(e), 0)
  const avgSalary = Math.round(totalPayroll / employees.length)
  const deptMap = {}
  employees.forEach(e => { deptMap[e.department] = (deptMap[e.department] || 0) + 1 })

  const empWithAttendance = employees.map(emp => {
    const s = getAttendanceSummary(emp.id, year, month)
    const rate = s.working > 0 ? Math.round((s.present / s.working) * 100) : 0
    return { ...emp, ...s, rate }
  }).sort((a, b) => b.rate - a.rate)

  return (
    <div className="reports-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">📈 Reports & Analytics</h1>
          <p className="page-subtitle">Comprehensive workforce insights and summaries</p>
        </div>
      </div>

      <div className="reports-grid">
        {/* Payroll Summary */}
        <div className="adm-card" id="payroll-report">
          <div className="adm-card-header"><h3>💰 Payroll Summary</h3><span className="badge-chip">{now.toLocaleString('default',{month:'long',year:'numeric'})}</span></div>
          <div className="report-table-wrap">
            <table className="data-table">
              <thead><tr><th>Employee</th><th>Basic</th><th>Net Salary</th><th>Performance</th></tr></thead>
              <tbody>
                {[...employees].sort((a,b) => getNetSalary(b)-getNetSalary(a)).map(emp => (
                  <tr key={emp.id} id={`report-sal-${emp.id}`}>
                    <td><div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <div className={`avatar avatar-${avatarColors[emp.id%avatarColors.length]}`} style={{width:32,height:32,fontSize:'0.75rem'}}>{emp.avatar}</div>
                      <div><div style={{fontWeight:700,fontSize:'0.82rem'}}>{emp.name}</div><div style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{emp.department}</div></div>
                    </div></td>
                    <td style={{fontSize:'0.82rem'}}>{formatCurrency(emp.basicSalary)}</td>
                    <td><span style={{fontWeight:800,color:'#4f46e5',fontSize:'0.85rem'}}>{formatCurrency(getNetSalary(emp))}</span></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:6}}>
                        <div className="progress-bar-wrap" style={{width:60}}><div className="progress-bar" style={{width:`${emp.performance}%`}} /></div>
                        <span style={{fontSize:'0.78rem',fontWeight:700}}>{emp.performance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Summary */}
        <div className="adm-card" id="dept-report">
          <div className="adm-card-header"><h3>🏢 Department Summary</h3></div>
          <div className="dept-report-list">
            {Object.entries(deptMap).map(([dept, count]) => {
              const deptEmps = employees.filter(e => e.department === dept)
              const deptPayroll = deptEmps.reduce((s, e) => s + getNetSalary(e), 0)
              const avgPerf = Math.round(deptEmps.reduce((s, e) => s + e.performance, 0) / deptEmps.length)
              return (
                <div key={dept} className="dept-report-row" id={`dept-report-${dept}`}>
                  <div className="drr-left">
                    <span className="drr-name">{dept}</span>
                    <span className="drr-count">{count} employee{count>1?'s':''}</span>
                  </div>
                  <div className="drr-right">
                    <span className="drr-payroll">{formatCurrency(deptPayroll)}</span>
                    <div style={{display:'flex',alignItems:'center',gap:4}}>
                      <div className="progress-bar-wrap" style={{width:50}}><div className="progress-bar" style={{width:`${avgPerf}%`}} /></div>
                      <span style={{fontSize:'0.72rem',fontWeight:700,color:'#6366f1'}}>{avgPerf}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="drr-total">
              <span>Total Payroll</span>
              <strong>{formatCurrency(totalPayroll)}</strong>
            </div>
          </div>
        </div>

        {/* Attendance Report */}
        <div className="adm-card" id="att-report">
          <div className="adm-card-header"><h3>📅 Attendance Report</h3><span className="badge-chip">{now.toLocaleString('default',{month:'long'})}</span></div>
          <table className="data-table">
            <thead><tr><th>Employee</th><th>Present</th><th>Absent</th><th>Leave</th><th>Rate</th></tr></thead>
            <tbody>
              {empWithAttendance.map(emp => (
                <tr key={emp.id} id={`att-report-${emp.id}`}>
                  <td style={{fontWeight:600,fontSize:'0.82rem'}}>{emp.name}</td>
                  <td><span className="chip chip-success">{emp.present}</span></td>
                  <td><span className="chip chip-danger">{emp.absent}</span></td>
                  <td><span className="chip chip-purple">{emp.leave}</span></td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div className="progress-bar-wrap" style={{width:50}}><div className="progress-bar" style={{width:`${emp.rate}%`,background: emp.rate >= 90 ? 'var(--success)' : emp.rate >= 75 ? 'var(--warning)' : 'var(--accent)'}} /></div>
                      <span style={{fontSize:'0.78rem',fontWeight:700}}>{emp.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Leave Summary */}
        <div className="adm-card" id="leave-report">
          <div className="adm-card-header"><h3>🏖️ Leave Summary</h3></div>
          <div className="leave-report-stats">
            {['pending','approved','rejected'].map(status => (
              <div key={status} className={`lrs-item lrs-${status}`} id={`lrs-${status}`}>
                <span className="lrs-num">{leaveRequests.filter(l=>l.status===status).length}</span>
                <span className="lrs-label">{status.charAt(0).toUpperCase()+status.slice(1)}</span>
              </div>
            ))}
          </div>
          <table className="data-table" style={{marginTop:16}}>
            <thead><tr><th>Employee</th><th>Type</th><th>Days</th><th>Status</th></tr></thead>
            <tbody>
              {leaveRequests.map(lr => {
                const emp = employees.find(e => e.id === lr.employeeId)
                return (
                  <tr key={lr.id} id={`lr-report-${lr.id}`}>
                    <td style={{fontWeight:600,fontSize:'0.82rem'}}>{emp?.name}</td>
                    <td style={{fontSize:'0.78rem',color:'var(--text-muted)'}}>{lr.type}</td>
                    <td style={{fontWeight:700}}>{lr.days}d</td>
                    <td><span className={`badge badge-${lr.status==='pending'?'warning':lr.status==='approved'?'success':'danger'}`}><span className="dot"/>{lr.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminReports
