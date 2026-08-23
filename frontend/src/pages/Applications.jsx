import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { applicationsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await applicationsAPI.getCandidateApplications(user.id);
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to load applications", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchApps();
  }, [user]);

  const filteredApps = filter === 'All' ? applications : applications.filter(app => app.status === filter);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading applications...</div>;

  return (
    <div className="applications-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>My Applications</h1>
          <p>Track the status of all your job applications.</p>
        </div>
        <div>
          <select className="form-control" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card">
        {filteredApps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>No applications found</h3>
            <Link to="/jobs" className="btn btn-primary">Find Jobs to Apply</Link>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 500 }}>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{app.location}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'danger' : 'info'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/jobs/${app.jobId}`} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>View Job</Link>
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

export default Applications;
