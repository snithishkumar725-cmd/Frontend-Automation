import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = createContext(null)
const API_BASE = 'http://localhost:5000/api'

// ── Generate initial attendance for last 2 months ──────────────────────
const generateInitialAttendance = (employees) => {
  const attendance = {}
  const today = new Date()
  employees.forEach(emp => {
    attendance[emp.id] = {}
    for (let m = 0; m <= 1; m++) {
      const d = new Date(today.getFullYear(), today.getMonth() - m, 1)
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(d.getFullYear(), d.getMonth(), day)
        if (date > today) continue
        const dow = date.getDay()
        if (dow === 0 || dow === 6) continue
        const key = date.toISOString().split('T')[0]
        const rand = Math.random()
        if (rand < 0.85) attendance[emp.id][key] = 'present'
        else if (rand < 0.92) attendance[emp.id][key] = 'absent'
        else if (rand < 0.96) attendance[emp.id][key] = 'halfday'
        else attendance[emp.id][key] = 'leave'
      }
    }
  })
  return attendance
}

// ── Generate salary history ────────────────────────────────────────────
const generateSalaryHistory = (employees) => {
  const history = {}
  employees.forEach(emp => {
    history[emp.id] = []
    for (let m = 2; m >= 0; m--) {
      const d = new Date()
      d.setMonth(d.getMonth() - m)
      history[emp.id].push({
        month: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
        monthKey: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        basicSalary: emp.basicSalary,
        hra: emp.hra,
        allowances: emp.allowances,
        pf: emp.pf,
        tax: emp.tax,
        insurance: emp.insurance,
        generated: new Date(d.getFullYear(), d.getMonth(), 28).toISOString().split('T')[0],
      })
    }
  })
  return history
}

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState({})
  const [salaryHistory, setSalaryHistory] = useState({})
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employeeId: '3', type: 'Sick Leave', from: '2026-07-10', to: '2026-07-12', days: 3, reason: 'Fever and rest needed', status: 'pending', appliedOn: '2026-07-08' },
    { id: 2, employeeId: '1', type: 'Casual Leave', from: '2026-07-15', to: '2026-07-15', days: 1, reason: 'Personal work', status: 'approved', appliedOn: '2026-07-05' },
    { id: 3, employeeId: '2', type: 'Annual Leave', from: '2026-07-20', to: '2026-07-22', days: 3, reason: 'Family vacation', status: 'pending', appliedOn: '2026-07-07' },
  ])

  // ── Fetch employees from API on mount ──────────────────────────────────
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_BASE}/employees`)
        setEmployees(data)
        setAttendance(generateInitialAttendance(data))
        setSalaryHistory(generateSalaryHistory(data))
      } catch (err) {
        console.error('Failed to load employees from API:', err)
        // Graceful fallback: keep empty state
        setEmployees([])
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [])

  // ── Auth ──────────────────────────────────────────────────────────────
  const login = (username, password, portalType) => {
    if (portalType === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        setCurrentUser({ id: 0, name: 'Admin', role: 'admin', avatar: 'AD', email: 'admin@techems.com' })
        return { success: true }
      }
      return { success: false, message: 'Invalid admin credentials' }
    }
    // Employee login – check against API-fetched employees
    const emp = employees.find(e =>
      e.username && e.password &&
      e.username.toLowerCase() === username.toLowerCase() &&
      e.password === password
    )
    if (emp) {
      setCurrentUser({ ...emp, role: 'employee' })
      return { success: true }
    }
    return { success: false, message: 'Invalid employee credentials' }
  }

  const logout = () => setCurrentUser(null)

  // ── Salary ────────────────────────────────────────────────────────────
  const updateSalary = async (employeeId, type, amount, note) => {
    const emp = employees.find(e => String(e.id) === String(employeeId))
    if (!emp) return
    const delta = type === 'increment' ? amount : -amount
    const updatedSalary = emp.basicSalary + delta

    // Optimistic UI update
    setEmployees(prev => prev.map(e =>
      String(e.id) === String(employeeId) ? { ...e, basicSalary: updatedSalary } : e
    ))

    // Persist to API
    try {
      await axios.put(`${API_BASE}/employees/${employeeId}`, {
        basicSalary: updatedSalary,
      })
    } catch (err) {
      console.error('Failed to update salary in API:', err)
    }

    const now = new Date()
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const strId = String(employeeId)
    setSalaryHistory(prev => {
      const empHistory = [...(prev[strId] || [])]
      const entry = {
        month: now.toLocaleString('default', { month: 'long', year: 'numeric' }),
        monthKey,
        basicSalary: updatedSalary,
        hra: emp.hra,
        allowances: emp.allowances,
        pf: emp.pf,
        tax: emp.tax,
        insurance: emp.insurance,
        generated: new Date().toISOString().split('T')[0],
        adjustmentNote: note || (type === 'increment' ? '+ Increment applied' : '- Adjustment applied'),
      }
      const existingIdx = empHistory.findIndex(h => h.monthKey === monthKey)
      if (existingIdx >= 0) empHistory[existingIdx] = entry
      else empHistory.push(entry)
      return { ...prev, [strId]: empHistory }
    })
  }

  // ── Attendance ────────────────────────────────────────────────────────
  const markAttendance = (employeeId, date, status) => {
    setAttendance(prev => ({
      ...prev,
      [employeeId]: { ...(prev[employeeId] || {}), [date]: status }
    }))
  }

  const getAttendanceSummary = (employeeId, year, month) => {
    const empAtt = attendance[employeeId] || {}
    let present = 0, absent = 0, halfday = 0, leave = 0, working = 0
    Object.entries(empAtt).forEach(([date, status]) => {
      const d = new Date(date)
      if (d.getFullYear() === year && d.getMonth() + 1 === month) {
        working++
        if (status === 'present') present++
        else if (status === 'absent') absent++
        else if (status === 'halfday') halfday++
        else if (status === 'leave') leave++
      }
    })
    return { present, absent, halfday, leave, working }
  }

  // ── Leaves ────────────────────────────────────────────────────────────
  const applyLeave = (request) => {
    const id = Math.max(...leaveRequests.map(l => l.id), 0) + 1
    setLeaveRequests(prev => [...prev, { ...request, id, status: 'pending', appliedOn: new Date().toISOString().split('T')[0] }])
  }

  const updateLeaveStatus = (leaveId, status, note) => {
    setLeaveRequests(prev => prev.map(l => l.id === leaveId ? { ...l, status, adminNote: note } : l))
  }

  // ── Employees (API-backed CRUD) ───────────────────────────────────────
  const addEmployee = async (empData) => {
    try {
      const { data } = await axios.post(`${API_BASE}/employees`, empData)
      const newEmp = data.employee
      setEmployees(prev => [...prev, newEmp])
      setAttendance(prev => ({ ...prev, [newEmp.id]: {} }))
      setSalaryHistory(prev => ({ ...prev, [newEmp.id]: [] }))
    } catch (err) {
      console.error('Failed to add employee via API:', err)
      // Fallback: local-only creation
      const id = Math.max(...employees.map(e => e.id), 0) + 1
      const newEmp = {
        ...empData,
        id,
        employeeId: `EMP${String(id).padStart(3, '0')}`,
        avatar: empData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        joinDate: new Date().toISOString().split('T')[0],
        performance: 0, projects: 0,
      }
      setEmployees(prev => [...prev, newEmp])
      setAttendance(prev => ({ ...prev, [id]: {} }))
      setSalaryHistory(prev => ({ ...prev, [id]: [] }))
    }
  }

  const deleteEmployee = async (id) => {
    const strId = String(id)
    // Optimistic UI update
    setEmployees(prev => prev.filter(e => String(e.id) !== strId))
    try {
      await axios.delete(`${API_BASE}/employees/${strId}`)
    } catch (err) {
      console.error('Failed to delete employee via API:', err)
    }
  }

  const updateEmployee = async (id, data) => {
    const strId = String(id)
    // Optimistic UI update
    setEmployees(prev => prev.map(e => String(e.id) === strId ? { ...e, ...data } : e))
    try {
      await axios.put(`${API_BASE}/employees/${strId}`, data)
    } catch (err) {
      console.error('Failed to update employee via API:', err)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  }

  const getNetSalary = (emp) => {
    const gross = emp.basicSalary + emp.hra + emp.allowances
    const deductions = emp.pf + emp.tax + emp.insurance
    return gross - deductions
  }

  return (
    <AppContext.Provider value={{
      currentUser, login, logout,
      employees, loading, addEmployee, deleteEmployee, updateEmployee,
      attendance, markAttendance, getAttendanceSummary,
      salaryHistory, updateSalary,
      leaveRequests, applyLeave, updateLeaveStatus,
      formatCurrency, getNetSalary,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
