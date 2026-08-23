import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../../services/api';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', company: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobsAPI.getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to load jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await jobsAPI.deleteJob(id);
        fetchJobs(); // Refresh
      } catch (error) {
        console.error("Failed to delete job", error);
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchCompany = job.company.toLowerCase().includes(filters.company.toLowerCase());
    return matchSearch && matchCompany;
  });

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="admin-jobs">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--text-dark)', margin: 0 }}>Job Management</h1>
        <Link to="/admin/jobs/add" className="btn btn-primary">Add New Job</Link>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="grid grid-cols-2">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Search by Title</label>
            <input type="text" name="search" className="form-control" placeholder="Search..." value={filters.search} onChange={handleFilterChange} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Filter by Company</label>
            <input type="text" name="company" className="form-control" placeholder="Company..." value={filters.company} onChange={handleFilterChange} />
          </div>
        </div>
      </div>

      <div className="card">
        {filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No jobs found.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map(job => (
                  <tr key={job.id}>
                    <td style={{ fontWeight: 500 }}>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td><span className="badge badge-info">{job.type}</span></td>
                    <td>{job.deadline}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/admin/jobs/add?edit=${job.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Edit</Link>
                        <button onClick={() => handleDelete(job.id)} className="btn btn-primary" style={{ backgroundColor: 'var(--danger)', padding: '0.25rem 0.5rem', fontSize: '0.85rem', border: 'none' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
