import React, { useState, useRef } from 'react';
import {
  RiAddLine, RiSearchLine, RiFilterLine, RiSortAsc, RiSortDesc,
  RiEditLine, RiDeleteBinLine, RiEyeLine, RiCloseLine,
  RiUploadLine, RiUserLine, RiDownloadLine
} from 'react-icons/ri';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useApp } from '../context/AppContext';
import { validateForm } from '../utils/validators';
import { departments, designations } from '../data/sampleData';
import './EmployeesPage.css';

const EMPTY_FORM = {
  employeeId: '', name: '', salary: '', department: '', designation: '',
  phone: '', email: '', address: '', dateOfJoining: '', gender: '', profileImage: null,
};

const ITEMS_PER_PAGE = 8;

// ===== EMPLOYEE FORM =====
const EmployeeForm = ({ initial, onSave, onCancel, isEdit }) => {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initial?.profileImage || null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'department') next.designation = '';
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, profileImage: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateForm(form);
    if (Object.keys(errs).length) { setErrors(errs); toast.error('Please fix the validation errors'); return; }
    onSave(form);
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setImagePreview(null);
  };

  const deptDesignations = form.department ? (designations[form.department] || []) : [];

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="form-section-title">
        <RiUserLine />
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </div>

      {/* Profile Image */}
      <div className="profile-upload-section">
        <div
          className="profile-preview"
          onClick={() => fileRef.current?.click()}
          style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
        >
          {!imagePreview && <RiUploadLine className="upload-icon" />}
          {!imagePreview && <span>Upload Photo</span>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        <div className="upload-info">
          <p>Click to upload profile photo</p>
          <p className="upload-hint">PNG, JPG up to 2MB</p>
          {imagePreview && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setImagePreview(null); setForm((p) => ({ ...p, profileImage: null })); }}>
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Form Grid */}
      <div className="form-grid">
        {/* Employee ID */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-empId">Employee ID *</label>
          <input id="f-empId" name="employeeId" value={form.employeeId} onChange={handleChange} className={`form-control ${errors.employeeId ? 'error' : ''}`} placeholder="e.g. EMP001" />
          {errors.employeeId && <span className="form-error">{errors.employeeId}</span>}
        </div>

        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-name">Employee Name *</label>
          <input id="f-name" name="name" value={form.name} onChange={handleChange} className={`form-control ${errors.name ? 'error' : ''}`} placeholder="Full name" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Salary */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-salary">Salary (₹) *</label>
          <input id="f-salary" name="salary" type="number" value={form.salary} onChange={handleChange} className={`form-control ${errors.salary ? 'error' : ''}`} placeholder="Monthly salary" min="0" />
          {errors.salary && <span className="form-error">{errors.salary}</span>}
        </div>

        {/* Department */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-dept">Department *</label>
          <select id="f-dept" name="department" value={form.department} onChange={handleChange} className={`form-control ${errors.department ? 'error' : ''}`}>
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.department && <span className="form-error">{errors.department}</span>}
        </div>

        {/* Designation */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-desig">Designation *</label>
          <select id="f-desig" name="designation" value={form.designation} onChange={handleChange} className={`form-control ${errors.designation ? 'error' : ''}`} disabled={!form.department}>
            <option value="">Select Designation</option>
            {deptDesignations.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.designation && <span className="form-error">{errors.designation}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-phone">Phone Number *</label>
          <input id="f-phone" name="phone" value={form.phone} onChange={handleChange} className={`form-control ${errors.phone ? 'error' : ''}`} placeholder="10-digit mobile number" maxLength={10} />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-email">Email Address *</label>
          <input id="f-email" name="email" type="email" value={form.email} onChange={handleChange} className={`form-control ${errors.email ? 'error' : ''}`} placeholder="email@company.com" />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Date of Joining */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-doj">Date of Joining *</label>
          <input id="f-doj" name="dateOfJoining" type="date" value={form.dateOfJoining} onChange={handleChange} className={`form-control ${errors.dateOfJoining ? 'error' : ''}`} max={new Date().toISOString().split('T')[0]} />
          {errors.dateOfJoining && <span className="form-error">{errors.dateOfJoining}</span>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label className="form-label" htmlFor="f-gender">Gender *</label>
          <select id="f-gender" name="gender" value={form.gender} onChange={handleChange} className={`form-control ${errors.gender ? 'error' : ''}`}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>
          {errors.gender && <span className="form-error">{errors.gender}</span>}
        </div>

        {/* Address - full width */}
        <div className="form-group form-full">
          <label className="form-label" htmlFor="f-addr">Address *</label>
          <textarea id="f-addr" name="address" value={form.address} onChange={handleChange} className={`form-control ${errors.address ? 'error' : ''}`} placeholder="Full address" rows={2} />
          {errors.address && <span className="form-error">{errors.address}</span>}
        </div>
      </div>

      {/* Buttons */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? <RiEditLine /> : <RiAddLine />}
          {isEdit ? 'Update Employee' : 'Save Employee'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <RiCloseLine /> Cancel
        </button>
      </div>
    </form>
  );
};

// ===== VIEW MODAL =====
const ViewModal = ({ employee, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content view-modal scale-in" onClick={(e) => e.stopPropagation()}>
      <div className="view-modal-header">
        <div className="view-avatar-wrap">
          {employee.profileImage ? (
            <img src={employee.profileImage} alt={employee.name} className="view-avatar-img" />
          ) : (
            <div className="view-avatar" style={{ background: `hsl(${employee.name.charCodeAt(0) * 5}, 60%, 55%)` }}>
              {employee.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h2 className="view-name">{employee.name}</h2>
          <p className="view-designation">{employee.designation}</p>
          <span className={`badge ${employee.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>{employee.status}</span>
        </div>
        <button className="modal-close-btn" onClick={onClose}><RiCloseLine /></button>
      </div>
      <div className="view-details-grid">
        {[
          { label: 'Employee ID', value: employee.employeeId },
          { label: 'Department', value: employee.department },
          { label: 'Salary', value: `₹${Number(employee.salary).toLocaleString()}/mo` },
          { label: 'Phone', value: employee.phone },
          { label: 'Email', value: employee.email },
          { label: 'Date of Joining', value: new Date(employee.dateOfJoining).toLocaleDateString('en-IN') },
          { label: 'Gender', value: employee.gender },
          { label: 'Address', value: employee.address },
        ].map((item) => (
          <div key={item.label} className="view-detail-item">
            <div className="view-detail-label">{item.label}</div>
            <div className="view-detail-value">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ===== DELETE CONFIRM =====
const DeleteConfirm = ({ employee, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-content delete-modal scale-in" onClick={(e) => e.stopPropagation()}>
      <div className="delete-icon">🗑️</div>
      <h3>Delete Employee?</h3>
      <p>Are you sure you want to delete <strong>{employee.name}</strong>? This action cannot be undone.</p>
      <div className="delete-actions">
        <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

// ===== MAIN EMPLOYEES PAGE =====
const EmployeesPage = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = employees
    .filter((e) => {
      const q = search.toLowerCase();
      return (
        (!q || e.name.toLowerCase().includes(q) || e.employeeId.toLowerCase().includes(q) || e.email.toLowerCase().includes(q)) &&
        (!filterDept || e.department === filterDept)
      );
    })
    .sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (sortField === 'salary') { va = Number(va); vb = Number(vb); }
      else { va = String(va).toLowerCase(); vb = String(vb).toLowerCase(); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSave = (form) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, form);
      toast.success(`✅ ${form.name} updated successfully!`);
    } else {
      const newEmp = addEmployee(form);
      toast.success(`🎉 ${form.name} added successfully!`);
    }
    setShowForm(false);
    setEditingEmployee(null);
    setPage(1);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (emp) => setDeleteTarget(emp);
  const confirmDelete = () => {
    deleteEmployee(deleteTarget.id);
    toast.success(`🗑️ ${deleteTarget.name} removed.`);
    setDeleteTarget(null);
  };

  const SortIcon = ({ field }) => (
    <span className="sort-icon">
      {sortField === field ? (sortDir === 'asc' ? <RiSortAsc /> : <RiSortDesc />) : <RiSortAsc style={{ opacity: 0.3 }} />}
    </span>
  );

  return (
    <div className="page-wrapper employees-page">
      <Navbar />
      <div className="container emp-container">
        {/* Header */}
        <div className="emp-page-header fade-in-down">
          <div>
            <h1 className="section-title">Employee <span className="gradient-text">Management</span></h1>
            <p className="section-subtitle">{employees.length} employees · {employees.filter((e) => e.status === 'Active').length} active</p>
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => { setShowForm(!showForm); setEditingEmployee(null); }}
          >
            {showForm ? <RiCloseLine /> : <RiAddLine />}
            {showForm ? 'Close Form' : 'Add Employee'}
          </button>
        </div>

        {/* Form Panel */}
        {showForm && (
          <div className="card form-panel fade-in-up">
            <EmployeeForm
              initial={editingEmployee}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingEmployee(null); }}
              isEdit={!!editingEmployee}
            />
          </div>
        )}

        {/* Search + Filter Bar */}
        <div className="card search-bar fade-in-up">
          <div className="search-input-wrap">
            <RiSearchLine className="search-icon-inp" />
            <input
              id="emp-search"
              type="text"
              placeholder="Search by name, ID, or email..."
              className="search-input"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch('')}><RiCloseLine /></button>
            )}
          </div>
          <div className="filter-group">
            <RiFilterLine className="filter-icon" />
            <select
              id="dept-filter"
              className="filter-select"
              value={filterDept}
              onChange={(e) => { setFilterDept(e.target.value); setPage(1); }}
            >
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="search-result-info">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Table */}
        <div className="card table-wrapper fade-in-up">
          {paginated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No employees found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th onClick={() => handleSort('employeeId')} className="sortable">
                    ID <SortIcon field="employeeId" />
                  </th>
                  <th onClick={() => handleSort('department')} className="sortable">
                    Department <SortIcon field="department" />
                  </th>
                  <th onClick={() => handleSort('salary')} className="sortable">
                    Salary <SortIcon field="salary" />
                  </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((emp) => (
                  <tr key={emp.id} className="fade-in">
                    <td>
                      <div className="emp-name-cell">
                        {emp.profileImage ? (
                          <img src={emp.profileImage} alt={emp.name} className="emp-avatar emp-avatar-img" />
                        ) : (
                          <div className="emp-avatar" style={{ background: `hsl(${emp.name.charCodeAt(0) * 5}, 60%, 55%)` }}>
                            {emp.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="emp-name">{emp.name}</div>
                          <div className="emp-email">{emp.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td><code className="emp-id-badge">{emp.employeeId}</code></td>
                    <td><span className="dept-badge">{emp.department}</span></td>
                    <td className="salary-cell">₹{Number(emp.salary).toLocaleString()}</td>
                    <td className="text-sm">{emp.email}</td>
                    <td className="text-sm">{emp.phone}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn view-btn" onClick={() => setViewEmployee(emp)} title="View">
                          <RiEyeLine />
                        </button>
                        <button className="action-btn edit-btn" onClick={() => handleEdit(emp)} title="Edit">
                          <RiEditLine />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(emp)} title="Delete">
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination fade-in-up">
            <button
              className="page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >‹ Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-btn ${page === p ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >{p}</button>
            ))}
            <button
              className="page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >Next ›</button>
            <span className="page-info">{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
          </div>
        )}
      </div>

      {/* Modals */}
      {viewEmployee && <ViewModal employee={viewEmployee} onClose={() => setViewEmployee(null)} />}
      {deleteTarget && <DeleteConfirm employee={deleteTarget} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}

      <Footer />
    </div>
  );
};

export default EmployeesPage;
