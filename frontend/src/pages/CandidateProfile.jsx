import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const CandidateProfile = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await authAPI.updateProfile(user.id, formData);
      updateUser(response.data.user);
      setEditing(false);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, type = "text") => {
    return (
      <div className="form-group">
        <label>{label}</label>
        {editing ? (
          <input type={type} name={name} className="form-control" value={formData[name] || ''} onChange={handleChange} required />
        ) : (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
            {user[name] || 'Not specified'}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="profile-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>My Profile</h2>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="btn btn-primary">Edit Profile</button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => { setEditing(false); setFormData({...user}); }} className="btn btn-outline" disabled={loading}>Cancel</button>
              <button onClick={handleSave} className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

        {message && (
          <div className={`badge ${message.includes('successfully') ? 'badge-success' : 'badge-danger'}`} style={{ display: 'block', marginBottom: '1.5rem', padding: '1rem' }}>
            {message}
          </div>
        )}

        <form>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Personal Information</h3>
          <div className="grid grid-cols-2">
            {renderField('Full Name', 'name')}
            {renderField('Email', 'email', 'email')}
            {renderField('Phone', 'phone')}
            {renderField('Date of Birth', 'dob', 'date')}
            <div className="form-group">
              <label>Gender</label>
              {editing ? (
                <select name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
                  {user.gender || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: '2rem 0 1.5rem 0' }}>Address Details</h3>
          <div className="grid grid-cols-2">
            {renderField('Address', 'address')}
            {renderField('City', 'city')}
            {renderField('State', 'state')}
          </div>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: '2rem 0 1.5rem 0' }}>Academic Details</h3>
          <div className="grid grid-cols-2">
            {renderField('College/University', 'college')}
            {renderField('Degree', 'degree')}
            {renderField('Branch', 'branch')}
            {renderField('Graduation Year', 'gradYear', 'number')}
            {renderField('CGPA', 'cgpa', 'number')}
            {renderField('Skills (comma separated)', 'skills')}
          </div>

          <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-color)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: '2rem 0 1.5rem 0' }}>Resume</h3>
          <div className="form-group">
            <label>Upload Resume (PDF)</label>
            {editing ? (
              <input type="file" className="form-control" accept=".pdf" />
            ) : (
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
                resume_placeholder.pdf
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateProfile;
