import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobsAPI, applicationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await jobsAPI.getJobById(id);
        if (res.data) {
          setJob(res.data);
          if (user) {
            const appRes = await applicationsAPI.getCandidateApplications(user.id);
            const applied = appRes.data.some(app => app.jobId === parseInt(id));
            setHasApplied(applied);
          }
        }
      } catch (error) {
        console.error("Failed to load job details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobData();
  }, [id, user]);

  const handleApply = async () => {
    if (!user) {
      return navigate('/login');
    }
    
    setApplyLoading(true);
    try {
      await applicationsAPI.applyForJob(user.id, parseInt(id), job);
      setHasApplied(true);
      setMessage('Application submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply.');
    } finally {
      setApplyLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading job details...</div>;
  if (!job) return <div style={{ textAlign: 'center', padding: '3rem' }}>Job not found. <Link to="/jobs">Go back to jobs</Link></div>;

  return (
    <div className="job-details-page" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/jobs" style={{ display: 'inline-block', marginBottom: '1.5rem', fontWeight: 500 }}>&larr; Back to Jobs</Link>
      
      {message && (
        <div className={`badge ${message.includes('successfully') ? 'badge-success' : 'badge-danger'}`} style={{ display: 'block', marginBottom: '1.5rem', padding: '1rem' }}>
          {message}
        </div>
      )}

      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{job.title}</h1>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>{job.company}</h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📍 {job.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💰 {job.salary}</span>
              <span className="badge badge-info">{job.type}</span>
            </div>
          </div>
          <div>
            {hasApplied ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                <button className="btn btn-primary" disabled style={{ opacity: 0.7, cursor: 'not-allowed' }}>Already Applied</button>
                <Link to="/applications" style={{ fontSize: '0.9rem' }}>View Application</Link>
              </div>
            ) : (
              <button onClick={handleApply} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }} disabled={applyLoading}>
                {applyLoading ? 'Applying...' : 'Apply Now'}
              </button>
            )}
          </div>
        </div>

        <div className="job-content">
          <h3 style={{ color: 'var(--primary-color)' }}>Job Description</h3>
          <p style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>{job.description || 'No description provided.'}</p>

          <h3 style={{ color: 'var(--primary-color)' }}>Requirements & Skills</h3>
          <p style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>{job.requirements || 'No specific requirements listed.'}</p>

          <h3 style={{ color: 'var(--primary-color)' }}>Additional Information</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-light)' }}>
            <li><strong>Eligibility:</strong> Open to all eligible candidates based on requirements.</li>
            <li><strong>Application Deadline:</strong> {job.deadline || 'Not specified'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
