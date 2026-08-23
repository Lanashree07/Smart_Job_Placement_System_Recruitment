import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', dob: '', gender: '',
    address: '', city: '', state: '',
    college: '', degree: '', branch: '', gradYear: '', cgpa: '',
    skills: '', password: '', confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10) {
      return setError('CGPA must be between 0 and 10');
    }

    setLoading(true);
    try {
      await authAPI.register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Candidate Registration</h2>
        
        {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '1rem' }}>{error}</div>}
        {success && <div className="badge badge-success" style={{ display: 'block', marginBottom: '1rem', padding: '1rem' }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Personal Information</h3>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input type="tel" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" title="10 digit phone number" />
            </div>
            <div className="form-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" className="form-control" required value={formData.dob} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" className="form-control" required value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', margin: '2rem 0 1rem 0', color: 'var(--primary-color)' }}>Address Details</h3>
          <div className="form-group">
            <label>Address *</label>
            <input type="text" name="address" className="form-control" required value={formData.address} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city" className="form-control" required value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input type="text" name="state" className="form-control" required value={formData.state} onChange={handleChange} />
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', margin: '2rem 0 1rem 0', color: 'var(--primary-color)' }}>Academic Details</h3>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label>College/University *</label>
              <input type="text" name="college" className="form-control" required value={formData.college} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Degree *</label>
              <input type="text" name="degree" className="form-control" required value={formData.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
            </div>
            <div className="form-group">
              <label>Branch *</label>
              <input type="text" name="branch" className="form-control" required value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" />
            </div>
            <div className="form-group">
              <label>Graduation Year *</label>
              <input type="number" name="gradYear" className="form-control" required value={formData.gradYear} onChange={handleChange} min="2000" max="2030" />
            </div>
            <div className="form-group">
              <label>CGPA *</label>
              <input type="number" step="0.01" name="cgpa" className="form-control" required value={formData.cgpa} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Skills (comma separated) *</label>
              <input type="text" name="skills" className="form-control" required value={formData.skills} onChange={handleChange} placeholder="React, Node, Java" />
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', margin: '2rem 0 1rem 0', color: 'var(--primary-color)' }}>Account Details</h3>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label>Password *</label>
              <input type="password" name="password" className="form-control" required value={formData.password} onChange={handleChange} minLength="6" />
            </div>
            <div className="form-group">
              <label>Confirm Password *</label>
              <input type="password" name="confirmPassword" className="form-control" required value={formData.confirmPassword} onChange={handleChange} minLength="6" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem', fontSize: '1.1rem' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register as Candidate'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
