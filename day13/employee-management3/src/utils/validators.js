// Form validation utilities

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const validateSalary = (salary) => {
  return !isNaN(salary) && Number(salary) > 0;
};

export const validateEmployeeId = (id) => {
  return /^EMP\d{3,6}$/i.test(id);
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateRequired(formData.employeeId))
    errors.employeeId = 'Employee ID is required';
  else if (!validateEmployeeId(formData.employeeId))
    errors.employeeId = 'Format: EMP001';

  if (!validateRequired(formData.name))
    errors.name = 'Employee name is required';

  if (!validateRequired(formData.salary))
    errors.salary = 'Salary is required';
  else if (!validateSalary(formData.salary))
    errors.salary = 'Enter a valid salary amount';

  if (!validateRequired(formData.department))
    errors.department = 'Department is required';

  if (!validateRequired(formData.designation))
    errors.designation = 'Designation is required';

  if (!validateRequired(formData.phone))
    errors.phone = 'Phone number is required';
  else if (!validatePhone(formData.phone))
    errors.phone = 'Enter a valid 10-digit Indian phone number';

  if (!validateRequired(formData.email))
    errors.email = 'Email is required';
  else if (!validateEmail(formData.email))
    errors.email = 'Enter a valid email address';

  if (!validateRequired(formData.address))
    errors.address = 'Address is required';

  if (!validateRequired(formData.dateOfJoining))
    errors.dateOfJoining = 'Date of joining is required';

  if (!validateRequired(formData.gender))
    errors.gender = 'Gender is required';

  return errors;
};
