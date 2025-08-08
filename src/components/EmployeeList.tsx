import React, { useState } from 'react';
import './EmployeeList.css';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

const initialEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', email: 'alice.johnson@example.com' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', email: 'bob.smith@example.com' },
  { id: 3, name: 'Charlie Brown', department: 'HR', email: 'charlie.brown@example.com' },
];

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    name: '',
    department: '',
    email: '',
  });

  const openAddForm = () => {
    setFormData({ name: '', department: '', email: '' });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (employee: Employee) => {
    setFormData({ name: employee.name, department: employee.department, email: employee.email });
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      name: formData.name.trim(),
      department: formData.department.trim(),
      email: formData.email.trim(),
    };

    if (!trimmed.name || !trimmed.department || !trimmed.email) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId !== null) {
      setEmployees(prev => prev.map(emp => (emp.id === editingId ? { ...emp, ...trimmed } : emp)));
      setEditingId(null);
    } else {
      const newEmp: Employee = { id: Date.now(), ...trimmed };
      setEmployees(prev => [...prev, newEmp]);
    }

    setFormData({ name: '', department: '', email: '' });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', department: '', email: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="employee-list-container">
      <div className="employee-header">
        <h2>Employee List</h2>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
          <button className="btn btn-primary" onClick={openAddForm} disabled={showForm}>Add Employee</button>
        </div>
      </div>

      {showForm && (
        <div className="employee-form">
          <h3>{editingId ? 'Edit Employee' : 'Add Employee'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" />
            </div>
            <div className="form-row">
              <label htmlFor="department">Department</label>
              <input id="department" name="department" value={formData.department} onChange={handleInputChange} placeholder="Enter department" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-success">{editingId ? 'Update' : 'Add'}</button>
              <button type="button" className="btn btn-muted" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="employee-row">
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td className="employee-actions">
                <button className="btn btn-warning" onClick={() => openEditForm(emp)} disabled={showForm}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
