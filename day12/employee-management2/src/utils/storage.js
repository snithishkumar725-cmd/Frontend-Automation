export const initialAdmin = {
  id: 'a1',
  role: 'admin',
  username: 'admin',
  password: 'password123',
  name: 'System Admin'
};

export const initialEmployees = [
  {
    id: 'e1',
    role: 'employee',
    username: 'emp1',
    password: 'password123',
    name: 'Alice Johnson',
    department: 'Engineering',
    designation: 'Frontend Developer',
    salary: 5000,
    attendance: [], // { date: 'YYYY-MM-DD', status: 'Present' | 'Absent' | 'Leave' }
    joinDate: '2025-01-15'
  },
  {
    id: 'e2',
    role: 'employee',
    username: 'emp2',
    password: 'password123',
    name: 'Bob Smith',
    department: 'Marketing',
    designation: 'SEO Specialist',
    salary: 4200,
    attendance: [],
    joinDate: '2024-11-20'
  },
  {
    id: 'e3',
    role: 'employee',
    username: 'emp3',
    password: 'password123',
    name: 'Charlie Davis',
    department: 'Design',
    designation: 'UI/UX Designer',
    salary: 4800,
    attendance: [],
    joinDate: '2025-03-10'
  },
  {
    id: 'e4',
    role: 'employee',
    username: 'emp4',
    password: 'password123',
    name: 'Diana Evans',
    department: 'HR',
    designation: 'HR Manager',
    salary: 5500,
    attendance: [],
    joinDate: '2023-08-05'
  }
];

export const initStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(initialEmployees));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(initialAdmin));
  }
  if (!localStorage.getItem('extraCategories')) {
    localStorage.setItem('extraCategories', JSON.stringify(['Engineering', 'Marketing', 'Design', 'HR', 'Sales']));
  }
};

export const getEmployees = () => {
  return JSON.parse(localStorage.getItem('employees') || '[]');
};

export const saveEmployees = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const getEmployeeById = (id) => {
  const employees = getEmployees();
  return employees.find(emp => emp.id === id);
};

export const updateEmployeeSalary = (id, newSalary) => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index].salary = newSalary;
    saveEmployees(employees);
    return employees[index];
  }
  return null;
};

export const addAttendanceEvent = (employeeId, date, status) => {
  const employees = getEmployees();
  const index = employees.findIndex(emp => emp.id === employeeId);
  if (index !== -1) {
    // Check if attendance for this date already exists
    const existingIndex = employees[index].attendance.findIndex(a => a.date === date);
    if (existingIndex !== -1) {
      employees[index].attendance[existingIndex].status = status;
    } else {
      employees[index].attendance.push({ date, status });
    }
    saveEmployees(employees);
    return employees[index];
  }
  return null;
};

export const getCategories = () => {
  return JSON.parse(localStorage.getItem('extraCategories') || '[]');
};

export const addCategory = (category) => {
  const categories = getCategories();
  if (!categories.includes(category)) {
    categories.push(category);
    localStorage.setItem('extraCategories', JSON.stringify(categories));
  }
  return categories;
};

export const loginUser = (username, password, role) => {
  if (role === 'admin') {
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin && admin.username === username && admin.password === password) {
      return admin;
    }
  } else if (role === 'employee') {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.username === username && emp.password === password);
    if (employee) {
      return employee;
    }
  }
  return null;
};
