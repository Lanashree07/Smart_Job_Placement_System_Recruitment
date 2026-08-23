import React, { useState, useEffect } from 'react';
import { applicationsAPI } from '../../services/api';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await applicationsAPI.getAllApplications();
      setApplications(response.data);
    } catch (error) {
      console.error("Failed to load applications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationsAPI.updateApplicationStatus(appId, newStatus);
      fetchApps();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="admin-applications">
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-dark)' }}>Application Tracking</h1>

      <div className="card">
        {applications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.sort((a,b) => b.id - a.id).map(app => (
                  <tr key={app.id}>
                    <td>
                      <strong>{app.candidateName}</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{app.candidateEmail}</span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${app.status === 'Selected' ? 'success' : app.status === 'Rejected' ? 'danger' : 'info'}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="form-control" 
                        value={app.status} 
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        style={{ padding: '0.25rem', width: 'auto' }}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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

export default AdminApplications;
