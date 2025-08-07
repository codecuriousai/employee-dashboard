import React, { useState } from 'react';
import './Home.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' },
  ]);

  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    phone: '',
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      // Update existing user
      setUsers(prev =>
        prev.map(user =>
          user.id === editingId
            ? { ...formData, id: editingId }
            : user
        )
      );
      setEditingId(null);
    } else {
      // Add new user
      const newUser: User = {
        ...formData,
        id: Date.now(), // Simple ID generation
      };
      setUsers(prev => [...prev, newUser]);
    }

    setFormData({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  const handleEdit = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>User Management System</h1>
        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Add New User
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update' : 'Add'} User
              </button>
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-container">
        <h2>Users List ({users.length})</h2>
        {users.length === 0 ? (
          <p className="no-users">No users found. Add some users to get started!</p>
        ) : (
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p className="email">{user.email}</p>
                  <p className="phone">{user.phone}</p>
                </div>
                <div className="user-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user)}
                    disabled={showForm}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;