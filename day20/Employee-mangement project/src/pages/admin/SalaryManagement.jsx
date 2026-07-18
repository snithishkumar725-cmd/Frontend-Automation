import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './SalaryManagement.css'

const avatarColors = ['primary', 'accent', 'success', 'warning', 'purple', 'info', 'cyan', 'pink', 'orange']

const SalaryManagement = () => {
  const { employees, salaryHistory, updateSalary, formatCurrency, getNetSalary } = useApp()
  const [search, setSearch] = useState('')
  const [selectedEmp, setSelectedEmp] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('increment') // 'increment' | 'decrement'
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [showSlipModal, setShowSlipModal] = useState(false)
  const [slipEmp, setSlipEmp] = useState(null)
  const [slipMonth, setSlipMonth] = useState(null)

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase()) ||
    e.employeeId.toLowerCase().includes(search.toLowerCase())
  )

  const openModal = (emp, type) => {
    setSelectedEmp(emp)
    setModalType(type)
    setAmount('')
    setNote('')
    setShowModal(true)
  }

  const handleApply = () => {
    const amt = parseInt(amount)
    if (!amt || amt <= 0) return
    updateSalary(selectedEmp.id, modalType, amt, note)
    setShowModal(false)
  }

  const openSlip = (emp, month) => {
    setSlipEmp(emp)
    setSlipMonth(month)
    setShowSlipModal(true)
  }

  const handlePrint = () => window.print()

  const totalPayroll = employees.reduce((s, e) => s + getNetSalary(e), 0)
  const totalGross = employees.reduce((s, e) => s + e.basicSalary + e.hra + e.allowances, 0)
  const totalDeductions = employees.reduce((s, e) => s + e.pf + e.tax + e.insurance, 0)

  return (
    <div className="salary-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">💰 Salary Management</h1>
          <p className="page-subtitle">Manage employee compensation, increments, and salary slips</p>
        </div>
      </div>

      {/* Summary */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Payroll', value: formatCurrency(totalPayroll), icon: '💸', color: 'primary' },
          { label: 'Gross Salary', value: formatCurrency(totalGross), icon: '📈', color: 'success' },
          { label: 'Total Deductions', value: formatCurrency(totalDeductions), icon: '📉', color: 'accent' },
          { label: 'Avg Net Salary', value: formatCurrency(Math.round(totalPayroll / employees.length)), icon: '📊', color: 'info' },
        ].map((s, i) => (
          <div key={i} className="adm-stat-card" id={`sal-stat-${i}`}>
            <div className="adm-stat-top">
              <div className={`adm-stat-icon icon-${s.color}`}>{s.icon}</div>
            </div>
            <div className="adm-stat-value" style={{ fontSize: '1.3rem' }}>{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="sal-search-row">
        <div className="search-bar" style={{ maxWidth: '360px', flex: 1 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} id="sal-search" />
        </div>
      </div>

      {/* Table */}
      <div className="sal-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Basic Salary</th>
                <th>HRA + Allow.</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => {
                const gross = emp.basicSalary + emp.hra + emp.allowances
                const deductions = emp.pf + emp.tax + emp.insurance
                const net = gross - deductions
                return (
                  <tr key={emp.id} id={`sal-row-${emp.id}`}>
                    <td>
                      <div className="sal-emp-cell">
                        <div className={`avatar avatar-${avatarColors[parseInt(emp.id) % avatarColors.length]}`}>{emp.avatar}</div>
                        <div>
                          <div className="sal-emp-name">{emp.name}</div>
                          <div className="sal-emp-id">{emp.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="chip chip-primary">{emp.department}</span></td>
                    <td><span className="sal-amount">{formatCurrency(emp.basicSalary)}</span></td>
                    <td><span className="sal-amount success">{formatCurrency(emp.hra + emp.allowances)}</span></td>
                    <td><span className="sal-amount danger">{formatCurrency(deductions)}</span></td>
                    <td><span className="sal-net">{formatCurrency(net)}</span></td>
                    <td>
                      <div className="sal-actions">
                        <button className="btn btn-success btn-sm" onClick={() => openModal(emp, 'increment')} id={`inc-${emp.id}`}>▲ Increment</button>
                        <button className="btn btn-accent btn-sm" onClick={() => openModal(emp, 'decrement')} id={`dec-${emp.id}`}>▼ Deduct</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => openSlip(emp, salaryHistory[emp.id]?.[salaryHistory[emp.id]?.length - 1])} id={`slip-${emp.id}`}>📄 Slip</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary History per employee */}
      {selectedEmp && !showModal && (
        <div className="sal-history-section">
          <h3>📋 Salary History — {selectedEmp.name}</h3>
          <div className="sal-history-list">
            {(salaryHistory[selectedEmp.id] || []).map((h, i) => (
              <div key={i} className="sal-history-card" id={`hist-${i}`}>
                <div className="shc-month">{h.month}</div>
                <div className="shc-basic">{formatCurrency(h.basicSalary)}</div>
                {h.adjustmentNote && <div className="shc-note">{h.adjustmentNote}</div>}
                <button className="btn btn-ghost btn-sm" onClick={() => openSlip(selectedEmp, h)} id={`hist-slip-${i}`}>📥 Download</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Increment/Decrement Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} id="sal-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {modalType === 'increment' ? '▲ Salary Increment' : '▼ Salary Deduction'} — {selectedEmp?.name}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="sal-current">
                <span>Current Basic Salary:</span>
                <strong>{formatCurrency(selectedEmp?.basicSalary)}</strong>
              </div>
              <div className="form-group" style={{ marginTop: '18px' }}>
                <label className="form-label">Amount (₹) *</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  placeholder="e.g. 50000"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  autoFocus
                  id="sal-amount-input"
                />
              </div>
              {amount > 0 && (
                <div className={`sal-preview ${modalType}`}>
                  New Basic: {formatCurrency(
                    selectedEmp.basicSalary + (modalType === 'increment' ? parseInt(amount) : -parseInt(amount))
                  )}
                  <span> ({modalType === 'increment' ? '+' : '-'}{((parseInt(amount) / selectedEmp.basicSalary) * 100).toFixed(1)}%)</span>
                </div>
              )}
              <div className="form-group" style={{ marginTop: '14px' }}>
                <label className="form-label">Note (optional)</label>
                <input className="form-input" type="text" placeholder="e.g. Annual appraisal" value={note} onChange={e => setNote(e.target.value)} id="sal-note-input" />
              </div>
              <div className="modal-footer-btns">
                <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  className={`btn ${modalType === 'increment' ? 'btn-success' : 'btn-accent'}`}
                  onClick={handleApply}
                  disabled={!amount || parseInt(amount) <= 0}
                  id="sal-apply-btn"
                >
                  {modalType === 'increment' ? '▲ Apply Increment' : '▼ Apply Deduction'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Salary Slip Modal */}
      {showSlipModal && slipEmp && slipMonth && (
        <SalarySlipModal emp={slipEmp} month={slipMonth} onClose={() => setShowSlipModal(false)} formatCurrency={formatCurrency} onPrint={handlePrint} />
      )}
    </div>
  )
}

const SalarySlipModal = ({ emp, month, onClose, formatCurrency, onPrint }) => {
  const gross = month.basicSalary + month.hra + month.allowances
  const totalDed = month.pf + month.tax + month.insurance
  const net = gross - totalDed
  const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="slip-modal-box" onClick={e => e.stopPropagation()} id="slip-modal">
        <div className="slip-actions no-print">
          <button className="modal-close" onClick={onClose}>✕</button>
          <button className="btn btn-primary btn-sm" onClick={onPrint} id="print-slip-btn">📥 Download PDF</button>
        </div>
        <div className="salary-slip" id="salary-slip">
          <div className="ss-header">
            <div className="ss-company">
              <div className="ss-logo">⚡</div>
              <div>
                <h2>TechEMS Solutions Pvt. Ltd.</h2>
                <p>123 Tech Park, Bangalore — 560001 | hr@techems.com</p>
              </div>
            </div>
            <div className="ss-title-box">
              <h3>SALARY SLIP</h3>
              <span>{month.month}</span>
            </div>
          </div>
          <div className="ss-divider" />
          <div className="ss-info-grid">
            <div className="ss-info-item"><span>Employee Name</span><strong>{emp.name}</strong></div>
            <div className="ss-info-item"><span>Employee ID</span><strong>{emp.employeeId}</strong></div>
            <div className="ss-info-item"><span>Designation</span><strong>{emp.role}</strong></div>
            <div className="ss-info-item"><span>Department</span><strong>{emp.department}</strong></div>
            <div className="ss-info-item"><span>Date of Joining</span><strong>{new Date(emp.joinDate).toLocaleDateString('en-IN')}</strong></div>
            <div className="ss-info-item"><span>Pay Period</span><strong>{month.month}</strong></div>
          </div>
          <div className="ss-divider" />
          <div className="ss-earnings-grid">
            <div className="ss-col">
              <h4>Earnings</h4>
              <div className="ss-row"><span>Basic Salary</span><span>{formatCurrency(month.basicSalary)}</span></div>
              <div className="ss-row"><span>House Rent Allowance</span><span>{formatCurrency(month.hra)}</span></div>
              <div className="ss-row"><span>Special Allowance</span><span>{formatCurrency(month.allowances)}</span></div>
              <div className="ss-row total"><span>Gross Earnings</span><strong>{formatCurrency(gross)}</strong></div>
            </div>
            <div className="ss-col">
              <h4>Deductions</h4>
              <div className="ss-row"><span>Provident Fund</span><span>- {formatCurrency(month.pf)}</span></div>
              <div className="ss-row"><span>Income Tax (TDS)</span><span>- {formatCurrency(month.tax)}</span></div>
              <div className="ss-row"><span>Health Insurance</span><span>- {formatCurrency(month.insurance)}</span></div>
              <div className="ss-row total"><span>Total Deductions</span><strong>- {formatCurrency(totalDed)}</strong></div>
            </div>
          </div>
          <div className="ss-net-box">
            <span>NET SALARY PAYABLE</span>
            <strong>{formatCurrency(net)}</strong>
          </div>
          <div className="ss-divider" />
          <div className="ss-footer">
            <div className="ss-sig">
              <div className="ss-sig-line" />
              <span>HR Signature</span>
            </div>
            <div className="ss-note">This is a computer-generated salary slip. Generated on {today}</div>
            <div className="ss-sig">
              <div className="ss-sig-line" />
              <span>Employee Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryManagement
