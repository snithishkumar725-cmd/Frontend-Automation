import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './MySalarySlips.css'

const MySalarySlips = () => {
  const { currentUser, salaryHistory, employees, formatCurrency } = useApp()
  const [selectedSlip, setSelectedSlip] = useState(null)

  const empData = employees.find(e => e.id === currentUser.id)
  const slips = salaryHistory[currentUser.id] || []

  const getNet = (slip) => (slip.basicSalary + slip.hra + slip.allowances) - (slip.pf + slip.tax + slip.insurance)
  const getGross = (slip) => slip.basicSalary + slip.hra + slip.allowances
  const getDeductions = (slip) => slip.pf + slip.tax + slip.insurance

  const handlePrint = () => window.print()

  return (
    <div className="salary-slips-page animate-fadeIn">
      <div className="page-header">
        <div>
          <h1 className="page-title">💳 My Salary Slips</h1>
          <p className="page-subtitle">View and download your monthly salary slips</p>
        </div>
      </div>

      <div className="slips-layout">
        {/* Slips List */}
        <div className="slips-list-col" id="slips-list">
          <h3 className="slips-list-title">All Salary Slips</h3>
          {slips.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">📄</div><p>No salary slips available</p></div>
          ) : (
            slips.slice().reverse().map((slip, i) => {
              const net = getNet(slip)
              const isSelected = selectedSlip?.monthKey === slip.monthKey
              return (
                <div
                  key={i}
                  className={`slip-list-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSlip(slip)}
                  id={`slip-item-${slip.monthKey}`}
                >
                  <div className="sli-left">
                    <div className="sli-icon">📄</div>
                    <div>
                      <div className="sli-month">{slip.month}</div>
                      <div className="sli-net">{formatCurrency(net)}</div>
                    </div>
                  </div>
                  <div className="sli-right">
                    <span className="badge badge-success"><span className="dot"/>Paid</span>
                    <div className="sli-download" onClick={e => { e.stopPropagation(); setSelectedSlip(slip); setTimeout(handlePrint, 300) }}>📥</div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Slip Preview */}
        <div className="slip-preview-col" id="slip-preview">
          {!selectedSlip ? (
            <div className="empty-state" style={{ height: '100%' }}>
              <div className="empty-state-icon">👆</div>
              <h3>Select a salary slip</h3>
              <p>Click any slip on the left to preview and download it</p>
            </div>
          ) : (
            <div className="slip-preview-card">
              <div className="spc-actions no-print">
                <h3>Preview</h3>
                <button className="btn btn-primary btn-sm" onClick={handlePrint} id="download-slip-btn">📥 Download PDF</button>
              </div>

              {/* Printable Salary Slip */}
              <div className="salary-slip printable-slip" id="printable-salary-slip">
                <div className="ss-header">
                  <div className="ss-company">
                    <div className="ss-logo">⚡</div>
                    <div>
                      <h2>TechEMS Solutions Pvt. Ltd.</h2>
                      <p>123 Tech Park, Bangalore — 560001 | hr@techems.com | +91 80 1234 5678</p>
                    </div>
                  </div>
                  <div className="ss-title-box">
                    <h3>SALARY SLIP</h3>
                    <span>{selectedSlip.month}</span>
                  </div>
                </div>
                <div className="ss-divider" />
                <div className="ss-info-grid">
                  <div className="ss-info-item"><span>Employee Name</span><strong>{empData?.name}</strong></div>
                  <div className="ss-info-item"><span>Employee ID</span><strong>{empData?.employeeId}</strong></div>
                  <div className="ss-info-item"><span>Designation</span><strong>{empData?.role}</strong></div>
                  <div className="ss-info-item"><span>Department</span><strong>{empData?.department}</strong></div>
                  <div className="ss-info-item"><span>Date of Joining</span><strong>{empData ? new Date(empData.joinDate).toLocaleDateString('en-IN') : ''}</strong></div>
                  <div className="ss-info-item"><span>Pay Period</span><strong>{selectedSlip.month}</strong></div>
                </div>
                <div className="ss-divider" />
                <div className="ss-earnings-grid">
                  <div className="ss-col">
                    <h4>Earnings</h4>
                    <div className="ss-row"><span>Basic Salary</span><span>{formatCurrency(selectedSlip.basicSalary)}</span></div>
                    <div className="ss-row"><span>House Rent Allowance</span><span>{formatCurrency(selectedSlip.hra)}</span></div>
                    <div className="ss-row"><span>Special Allowance</span><span>{formatCurrency(selectedSlip.allowances)}</span></div>
                    <div className="ss-row total"><span>Gross Earnings</span><strong>{formatCurrency(getGross(selectedSlip))}</strong></div>
                  </div>
                  <div className="ss-col">
                    <h4>Deductions</h4>
                    <div className="ss-row"><span>Provident Fund (12%)</span><span>- {formatCurrency(selectedSlip.pf)}</span></div>
                    <div className="ss-row"><span>Income Tax (TDS)</span><span>- {formatCurrency(selectedSlip.tax)}</span></div>
                    <div className="ss-row"><span>Health Insurance</span><span>- {formatCurrency(selectedSlip.insurance)}</span></div>
                    <div className="ss-row total"><span>Total Deductions</span><strong>- {formatCurrency(getDeductions(selectedSlip))}</strong></div>
                  </div>
                </div>
                <div className="ss-net-box">
                  <span>NET SALARY PAYABLE</span>
                  <strong>{formatCurrency(getNet(selectedSlip))}</strong>
                </div>
                <div className="ss-divider" />
                <div className="ss-footer">
                  <div className="ss-sig"><div className="ss-sig-line" /><span>HR Signature</span></div>
                  <div className="ss-note">This is a computer-generated salary slip.<br/>Generated on {new Date().toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</div>
                  <div className="ss-sig"><div className="ss-sig-line" /><span>Employee Signature</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MySalarySlips
