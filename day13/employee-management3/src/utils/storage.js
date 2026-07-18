// Storage utility functions for Employee Management System

export const getEmployees = () => {
  try {
    const data = localStorage.getItem('ems_employees');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveEmployees = (employees) => {
  try {
    localStorage.setItem('ems_employees', JSON.stringify(employees));
  } catch (e) {
    console.error('Failed to save employees:', e);
  }
};

export const getUser = () => {
  try {
    const data = localStorage.getItem('ems_user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem('ems_user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user:', e);
  }
};

export const clearUser = () => {
  localStorage.removeItem('ems_user');
};

export const getTheme = () => {
  return localStorage.getItem('ems_theme') || 'light';
};

export const saveTheme = (theme) => {
  localStorage.setItem('ems_theme', theme);
};
