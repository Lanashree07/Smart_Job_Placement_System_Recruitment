import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { applicationsAPI, jobsAPI } from '../services/api';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appRes, jobRes] = await Promise.all([
          applicationsAPI.getCandidateApplications(user.id),
          jobsAPI.getAllJobs()
        ]);
        setApplications(appRes.data);
        setJobs(jobRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboardData();
  }, [user]);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading dashboard...</div>;

  const getStatusCount = (status) => applications.filter(a => a.status === status).length;

  return (
    <div className="dashboard-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Welcome, {user.name}</h1>
          <p style={{ margin: 0 }}>Here is your recruitment overview.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/profile" className="btn btn-outline">Edit Profile</Link>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      </div>

      <div className="grid grid-cols-4" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ borderTop: '4px solid var(--primary-color)' }}>
          <h3>Total Applications</h3>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{applications.length}</h2>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--warning)' }}>
          <h3>Under Review</h3>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{getStatusCount('Under Review')}</h2>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--info)' }}>
          <h3>Shortlisted/Interview</h3>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{getStatusCount('Shortlisted') + getStatusCount('Interview')}</h2>
        </div>
        <div className="card" style={{ borderTop: '4px solid var(--success)' }}>
          <h3>Selected</h3>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{getStatusCount('Selected')}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Recent Applications</h3>
            <Link to="/applications" style={{ fontSize: '0.9rem' }}>View All</Link>
          </div>
          {applications.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-light)', borderRadius: 'var(--border-radius)' }}>
              You haven't applied to any jobs yet.
            </p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Job Role</th>
                    <th>Company</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map(app => (
                    <tr key={app.id}>
                      <td>{app.jobTitle}</td>
                      <td>{app.company}</td>
                      <td>
                        <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'danger' : 'info'}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Recommended Jobs</h3>
            <Link to="/jobs" style={{ fontSize: '0.9rem' }}>Browse All</Link>
          </div>
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            <div className="grid" style={{ gap: '1rem', gridTemplateColumns: '1fr' }}>
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius)' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h4>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>{job.company} • {job.location}</p>
                  <Link to={`/jobs/${job.id}`} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.25rem 0.75rem' }}>View Details</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
