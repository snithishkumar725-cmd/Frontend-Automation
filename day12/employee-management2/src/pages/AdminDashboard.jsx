import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEmployees, updateEmployeeSalary, addAttendanceEvent, getCategories, addCategory } from '../utils/storage';
import { LogOut, TrendingUp, TrendingDown, CheckCircle, XCircle, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setEmployees(getEmployees());
    setCategories(getCategories());
  }, []);

  const handleSalaryChange = (id, currentSalary, amount) => {
    const newSalary = Math.max(0, currentSalary + amount);
    updateEmployeeSalary(id, newSalary);
    setEmployees(getEmployees()); // Refresh list
  };

  const handleAttendance = (id, status) => {
    addAttendanceEvent(id, selectedDate, status);
    setEmployees(getEmployees());
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setCategories(getCategories());
      setNewCategory('');
    }
  };

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Admin Portal</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}</p>
        </div>
        <button onClick={logout} className="btn btn-secondary">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Employee Management</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label>Attendance Date:</label>
              <input 
                type="date" 
                className="form-input" 
                style={{ padding: '0.5rem' }} 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Modify Salary</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => {
                  const todayAttendance = emp.attendance.find(a => a.date === selectedDate);
                  
                  return (
                    <tr key={emp.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{emp.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{emp.designation}</div>
                      </td>
                      <td><span className="badge badge-success">{emp.department}</span></td>
                      <td style={{ fontWeight: 600 }}>${emp.salary}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '0.25rem 0.5rem' }}
                            onClick={() => handleSalaryChange(emp.id, emp.salary, -100)}
                            title="Decrement Salary"
                          >
                            <TrendingDown size={16} />
                          </button>
                          <button 
                            className="btn btn-primary" 
                            style={{ padding: '0.25rem 0.5rem' }}
                            onClick={() => handleSalaryChange(emp.id, emp.salary, 100)}
                            title="Increment Salary"
                          >
                            <TrendingUp size={16} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            className={`btn ${todayAttendance?.status === 'Present' ? 'btn-success' : 'btn-secondary'}`}
                            style={{ padding: '0.25rem 0.5rem' }}
                            onClick={() => handleAttendance(emp.id, 'Present')}
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            className={`btn ${todayAttendance?.status === 'Absent' ? 'btn-danger' : 'btn-secondary'}`}
                            style={{ padding: '0.25rem 0.5rem' }}
                            onClick={() => handleAttendance(emp.id, 'Absent')}
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card glass" style={{ height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1rem' }}>Extra Categories</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Manage departments or other custom categories here.
          </p>
          
          <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="New Category..." 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem' }}>
              <Plus size={20} />
            </button>
          </form>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat, idx) => (
              <span key={idx} className="badge badge-success" style={{ backgroundColor: 'var(--bg-gradient-end)', color: 'var(--text-primary)' }}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
