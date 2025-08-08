import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeDetail.css';

interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

const mockEmployees: Employee[] = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', email: 'alice.johnson@example.com' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', email: 'bob.smith@example.com' },
  { id: 3, name: 'Charlie Brown', department: 'HR', email: 'charlie.brown@example.com' },
];

const EmployeeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const employeeId = Number(id);

  const found = useMemo(() => mockEmployees.find(e => e.id === employeeId) || null, [employeeId]);

  const [formData, setFormData] = useState({
    name: found?.name ?? '',
    department: found?.department ?? '',
    email: found?.email ?? '',
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!found) {
    return (
      <div className="employee-detail-container">
        <div className="employee-card">
          <h2>Employee Not Found</h2>
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/employees')}>Back to List</button>
            <button className="btn btn-muted" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Delete this employee?')) {
      // mock delete; in a real app, call an API and then navigate
      navigate('/employees');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.department.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }
    // mock save; in a real app, call an API
    setIsEditing(false);
  };

  return (
    <div className="employee-detail-container">
      <div className="employee-card">
        <div className="card-header">
          <h2>Employee Details</h2>
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/employees')}>Back to List</button>
            <button className="btn btn-muted" onClick={() => navigate('/')}>Home</button>
          </div>
        </div>

        {!isEditing ? (
          <div className="card-body">
            <div className="detail-row"><span className="label">ID:</span> <span>{found.id}</span></div>
            <div className="detail-row"><span className="label">Name:</span> <span>{found.name}</span></div>
            <div className="detail-row"><span className="label">Department:</span> <span>{found.department}</span></div>
            <div className="detail-row"><span className="label">Email:</span> <span>{found.email}</span></div>
            <div className="card-actions">
              <button className="btn btn-warning" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        ) : (
          <form className="card-body" onSubmit={handleSave}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-row">
              <label htmlFor="department">Department</label>
              <input id="department" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="card-actions">
              <button type="submit" className="btn btn-success">Save</button>
              <button type="button" className="btn btn-muted" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;
