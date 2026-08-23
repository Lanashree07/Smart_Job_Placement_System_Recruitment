import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jobsAPI } from '../../services/api';

const AdminAddJob = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    salary: '', deadline: '', description: '', requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editId) {
      const loadJob = async () => {
        try {
          const res = await jobsAPI.getJobById(editId);
          if (res.data) setFormData(res.data);
        } catch (error) {
          console.error("Failed to load job", error);
        }
      };
      loadJob();
    }
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (editId) {
        await jobsAPI.updateJob(editId, formData);
      } else {
        await jobsAPI.createJob(formData);
      }
      navigate('/admin/jobs');
    } catch (err) {
      setError('Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-job" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: 'var(--text-dark)' }}>{editId ? 'Edit Job' : 'Add New Job'}</h1>
        <button onClick={() => navigate('/admin/jobs')} className="btn btn-outline">Cancel</button>
      </div>

      <div className="card">
        {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '1rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="form-group">
              <label>Job Title *</label>
              <input type="text" name="title" className="form-control" required value={formData.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input type="text" name="company" className="form-control" required value={formData.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" className="form-control" required value={formData.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Job Type *</label>
              <select name="type" className="form-control" required value={formData.type} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label>Salary / Package *</label>
              <input type="text" name="salary" className="form-control" required value={formData.salary} onChange={handleChange} placeholder="e.g. $100,000" />
            </div>
            <div className="form-group">
              <label>Application Deadline *</label>
              <input type="date" name="deadline" className="form-control" required value={formData.deadline} onChange={handleChange} />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea name="description" className="form-control" rows="5" required value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="form-group">
            <label>Requirements & Skills *</label>
            <textarea name="requirements" className="form-control" rows="4" required value={formData.requirements} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Saving...' : (editId ? 'Update Job' : 'Create Job')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddJob;
