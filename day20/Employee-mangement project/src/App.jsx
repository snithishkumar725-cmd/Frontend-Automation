import { useState, useEffect } from 'react'
import axios from 'axios'
import { AppProvider, useApp } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import Chatbot from './components/Chatbot'
import AdminSidebar from './components/AdminSidebar'
import EmployeeSidebar from './components/EmployeeSidebar'

// Admin Views
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminEmployees from './pages/admin/AdminEmployees'
import SalaryManagement from './pages/admin/SalaryManagement'
import AttendanceManager from './pages/admin/AttendanceManager'
import LeaveManagement from './pages/admin/LeaveManagement'
import AdminReports from './pages/admin/AdminReports'

// Employee Views
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import MyAttendance from './pages/employee/MyAttendance'
import MySalarySlips from './pages/employee/MySalarySlips'
import LeaveRequest from './pages/employee/LeaveRequest'
import MyProfile from './pages/employee/MyProfile'

import './App.css'

function FileUploader() {
  const [status, setStatus] = useState('idle') // 'idle' | 'uploading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setStatus('uploading')
    setMessage('Uploading...')

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      )

      console.log(response.data)
      setStatus('success')
      setMessage(`Uploaded successfully: ${file.name}`)
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 4000)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage(error.response?.data?.message || 'Upload failed')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 4000)
    }
  }

  return (
    <div className="file-uploader-container">
      <label className={`file-upload-btn ${status}`}>
        {status === 'idle' && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            <span>Upload File</span>
          </>
        )}
        {status === 'uploading' && (
          <>
            <span className="spinner-small"></span>
            <span>Uploading...</span>
          </>
        )}
        {status === 'success' && <span>✅ Uploaded!</span>}
        {status === 'error' && <span>❌ Failed!</span>}
        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} disabled={status === 'uploading'} />
      </label>
      {message && <div className={`upload-tooltip ${status}`}>{message}</div>}
    </div>
  )
}

function PortalRouter() {
  const { currentUser } = useApp()
  const [adminView, setAdminView] = useState('dashboard')
  const [empView, setEmpView] = useState('dashboard')

  // Reset page views on login/logout
  useEffect(() => {
    setAdminView('dashboard')
    setEmpView('dashboard')
  }, [currentUser])

  if (!currentUser) {
    return <LoginPage />
  }

  const renderAdminView = () => {
    switch (adminView) {
      case 'dashboard':  return <AdminDashboard onNavigate={setAdminView} />
      case 'employees':  return <AdminEmployees />
      case 'salary':     return <SalaryManagement />
      case 'attendance': return <AttendanceManager />
      case 'leaves':     return <LeaveManagement />
      case 'reports':    return <AdminReports />
      default:           return <AdminDashboard onNavigate={setAdminView} />
    }
  }

  const renderEmployeeView = () => {
    switch (empView) {
      case 'dashboard':  return <EmployeeDashboard onNavigate={setEmpView} />
      case 'attendance': return <MyAttendance />
      case 'salary':     return <MySalarySlips />
      case 'leaves':     return <LeaveRequest />
      case 'profile':    return <MyProfile />
      default:           return <EmployeeDashboard onNavigate={setEmpView} />
    }
  }

  return (
    <div className="portal-layout">
      {currentUser.role === 'admin' ? (
        <>
          <AdminSidebar currentPage={adminView} onNavigate={setAdminView} />
          <main className="portal-main">
            <div className="portal-topbar">
              <span className="topbar-title">🛡️ Admin Administration Console</span>
              <div className="topbar-actions">
                <FileUploader />
                <div className="topbar-user">
                  <div className="topbar-user-name">Welcome, {currentUser.name}</div>
                  <div className="topbar-user-role">Super Admin</div>
                </div>
              </div>
            </div>
            <div className="portal-content">
              {renderAdminView()}
            </div>
          </main>
        </>
      ) : (
        <>
          <EmployeeSidebar currentPage={empView} onNavigate={setEmpView} />
          <main className="portal-main">
            <div className="portal-topbar">
              <span className="topbar-title">✨ Employee Self Service Portal</span>
              <div className="topbar-actions">
                <FileUploader />
                <div className="topbar-user">
                  <div className="topbar-user-name">{currentUser.name}</div>
                  <div className="topbar-user-role">{currentUser.role}</div>
                </div>
              </div>
            </div>
            <div className="portal-content">
              {renderEmployeeView()}
            </div>
          </main>
        </>
      )}

      {/* Floating Interactive Chatbot */}
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <PortalRouter />
    </AppProvider>
  )
}

export default App
