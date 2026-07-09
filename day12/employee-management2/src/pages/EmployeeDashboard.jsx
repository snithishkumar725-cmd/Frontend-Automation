import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Download, Calendar, User, Briefcase, DollarSign } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const slipRef = useRef();

  const handleDownloadSlip = () => {
    const element = slipRef.current;
    const opt = {
      margin:       1,
      filename:     `${user.name.replace(/\s+/g, '_')}_Salary_Slip.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const presentDays = user.attendance.filter(a => a.status === 'Present').length;
  const absentDays = user.attendance.filter(a => a.status === 'Absent').length;

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Employee Portal</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}</p>
        </div>
        <button onClick={logout} className="btn btn-secondary">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Profile Card */}
        <div className="card glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'var(--primary-color)', color: 'white', borderRadius: '50%' }}>
              <User size={32} />
            </div>
            <div>
              <h3>{user.name}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{user.designation}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}><Briefcase size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}/> Department</span>
              <span style={{ fontWeight: 600 }}>{user.department}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}><Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}/> Join Date</span>
              <span style={{ fontWeight: 600 }}>{user.joinDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}><DollarSign size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}/> Current Salary</span>
              <span style={{ fontWeight: 600, color: 'var(--success)' }}>${user.salary}</span>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="card glass">
          <h3 style={{ marginBottom: '1.5rem' }}>Attendance Summary</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, padding: '1rem', background: '#d1fae5', borderRadius: '8px', textAlign: 'center' }}>
              <h2 style={{ color: '#065f46' }}>{presentDays}</h2>
              <p style={{ fontSize: '0.9rem', color: '#065f46' }}>Present</p>
            </div>
            <div style={{ flex: 1, padding: '1rem', background: '#fee2e2', borderRadius: '8px', textAlign: 'center' }}>
              <h2 style={{ color: '#991b1b' }}>{absentDays}</h2>
              <p style={{ fontSize: '0.9rem', color: '#991b1b' }}>Absent</p>
            </div>
          </div>
          
          <h4>Recent Activity</h4>
          <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
            {user.attendance.slice(-3).reverse().map((record, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span>{record.date}</span>
                <span className={`badge ${record.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>{record.status}</span>
              </li>
            ))}
            {user.attendance.length === 0 && <li style={{ color: 'var(--text-secondary)' }}>No recent attendance records.</li>}
          </ul>
        </div>
      </div>

      {/* Salary Slip Section */}
      <div className="card glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Payment Slip</h2>
          <button onClick={handleDownloadSlip} className="btn btn-primary">
            <Download size={18} /> Download Slip
          </button>
        </div>
        
        {/* Hidden template for PDF generation */}
        <div style={{ display: 'none' }}>
          <div ref={slipRef} style={{ padding: '40px', fontFamily: 'sans-serif', color: '#333' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #6366f1', paddingBottom: '20px', marginBottom: '30px' }}>
              <h1 style={{ color: '#6366f1', margin: '0 0 10px 0' }}>Company Name</h1>
              <h2 style={{ margin: 0, color: '#666' }}>Salary Slip - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            </div>
            
            <table style={{ width: '100%', marginBottom: '30px', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>Employee Name:</td>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>Employee ID:</td>
                  <td style={{ padding: '10px' }}>{user.id}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>Department:</td>
                  <td style={{ padding: '10px' }}>{user.department}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>Designation:</td>
                  <td style={{ padding: '10px' }}>{user.designation}</td>
                </tr>
              </tbody>
            </table>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'left' }}>Earnings</th>
                  <th style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>Basic Salary</td>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'right' }}>${user.salary.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>Performance Bonus</td>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'right' }}>$0.00</td>
                </tr>
                <tr style={{ backgroundColor: '#f3f4f6', fontWeight: 'bold' }}>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>Total Net Salary</td>
                  <td style={{ padding: '12px', border: '1px solid #e5e7eb', textAlign: 'right' }}>${user.salary.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
              This is a computer generated document. No signature is required.
            </div>
          </div>
        </div>

        {/* Visual Preview */}
        <div style={{ border: '1px dashed var(--border-color)', borderRadius: '8px', padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.5)' }}>
          <DollarSign size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3>Salary Slip is Ready</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Your salary slip for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} has been generated. Click the download button above to save it as a PDF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
