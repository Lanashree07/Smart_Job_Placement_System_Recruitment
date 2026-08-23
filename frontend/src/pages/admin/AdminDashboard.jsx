import React, { useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI, authAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalJobs: 0,
    totalApplications: 0,
    underReview: 0,
    shortlisted: 0,
    selected: 0,
    placements: 0
  });
  const [recentApps, setRecentApps] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [candRes, jobsRes, appsRes] = await Promise.all([
          authAPI.getAllCandidates(),
          jobsAPI.getAllJobs(),
          applicationsAPI.getAllApplications()
        ]);
        
        const candidates = candRes.data;
        const jobs = jobsRes.data;
        const apps = appsRes.data;

        setStats({
          totalCandidates: candidates.length,
          totalJobs: jobs.length,
          totalApplications: apps.length,
          underReview: apps.filter(a => a.status === 'Under Review').length,
          shortlisted: apps.filter(a => a.status === 'Shortlisted').length,
          selected: apps.filter(a => a.status === 'Selected').length,
          placements: apps.filter(a => a.placementStatus && a.status === 'Selected').length
        });

        // Sort by id descending (assuming larger id = newer)
        setRecentApps([...apps].sort((a,b) => b.id - a.id).slice(0, 5));
        setRecentJobs([...jobs].sort((a,b) => b.id - a.id).slice(0, 5));

      } catch (error) {
        console.error("Failed to load admin dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard analytics...</div>;

  return (
    <div className="admin-dashboard">
      <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Dashboard Overview</h1>
      
      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
          <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>Total Candidates</p>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.totalCandidates}</h2>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>Total Jobs</p>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.totalJobs}</h2>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--info)' }}>
          <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>Total Applications</p>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.totalApplications}</h2>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <p style={{ color: 'var(--text-light)', margin: '0 0 0.5rem 0', fontWeight: 500 }}>Total Placements</p>
          <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.placements}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Application Status Pipeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Applied</span>
              <strong>{stats.totalApplications - stats.underReview - stats.shortlisted - stats.selected - stats.placements}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Under Review</span>
              <strong>{stats.underReview}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shortlisted</span>
              <strong>{stats.shortlisted}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
              <span>Selected</span>
              <strong>{stats.selected}</strong>
            </div>
          </div>
        </div>
        
        <div className="card">
           <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Recent Jobs</h3>
           <div className="table-container" style={{ boxShadow: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '0.5rem' }}>Job Title</th>
                  <th style={{ padding: '0.5rem' }}>Company</th>
                  <th style={{ padding: '0.5rem' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.length === 0 ? <tr><td colSpan="3">No jobs</td></tr> : null}
                {recentJobs.map(job => (
                  <tr key={job.id}>
                    <td style={{ padding: '0.5rem', fontWeight: 500 }}>{job.title}</td>
                    <td style={{ padding: '0.5rem' }}>{job.company}</td>
                    <td style={{ padding: '0.5rem' }}>{job.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>Recent Applications</h3>
        <div className="table-container" style={{ boxShadow: 'none' }}>
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApps.length === 0 ? <tr><td colSpan="5" style={{ textAlign: 'center' }}>No applications yet</td></tr> : null}
              {recentApps.map(app => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 500 }}>{app.candidateName}</td>
                  <td>{app.jobTitle}</td>
                  <td>{app.company}</td>
                  <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
