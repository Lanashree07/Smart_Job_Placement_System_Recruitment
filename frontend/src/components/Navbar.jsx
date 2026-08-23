import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          SmartHire
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')} end>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Jobs</NavLink>
          </li>
          
          {user ? (
            <>
              <li className="nav-item">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/applications" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Applications</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/placements" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Placements</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Profile</NavLink>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline" style={{ marginLeft: '1rem' }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-links active' : 'nav-links')}>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-links btn btn-primary">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
