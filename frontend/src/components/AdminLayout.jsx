import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>SmartHire Admin</h2>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Dashboard</NavLink>
          <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Jobs</NavLink>
          <NavLink to="/admin/candidates" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Candidates</NavLink>
          <NavLink to="/admin/applications" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Applications</NavLink>
          <NavLink to="/admin/placements" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>Placements</NavLink>
        </nav>
        <div className="admin-user">
          <p>{user?.name}</p>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--white)', color: 'var(--white)' }}>Logout</button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
