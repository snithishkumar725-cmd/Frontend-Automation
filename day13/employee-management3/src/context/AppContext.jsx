import React, { createContext, useContext, useState, useEffect } from 'react';
import { getEmployees, saveEmployees, getUser, saveUser, clearUser, getTheme, saveTheme } from '../utils/storage';
import { sampleEmployees } from '../data/sampleData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedEmployees = getEmployees();
    if (savedEmployees && savedEmployees.length > 0) {
      setEmployees(savedEmployees);
    } else {
      setEmployees(sampleEmployees);
      saveEmployees(sampleEmployees);
    }

    const savedUser = getUser();
    if (savedUser) setCurrentUser(savedUser);

    const savedTheme = getTheme();
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    setIsLoading(false);
  }, []);

  // Sync employees to localStorage
  useEffect(() => {
    if (employees.length > 0) {
      saveEmployees(employees);
    }
  }, [employees]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const login = (user) => {
    setCurrentUser(user);
    saveUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    clearUser();
  };

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
      status: 'Active',
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    return newEmployee;
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find((emp) => emp.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        currentUser,
        theme,
        isLoading,
        toggleTheme,
        login,
        logout,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
