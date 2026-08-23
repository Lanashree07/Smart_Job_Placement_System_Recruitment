import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', location: '', type: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsAPI.getAllJobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: '', location: '', type: '' });
  };

  const filteredJobs = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) || job.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchLocation = filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
    const matchType = filters.type ? job.type === filters.type : true;
    return matchSearch && matchLocation && matchType;
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading jobs...</div>;

  return (
    <div className="jobs-page">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary-color)' }}>Explore Opportunities</h1>
        <p>Find the perfect job that matches your skills and aspirations.</p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="grid grid-cols-4" style={{ alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Search by Title or Company</label>
            <input type="text" name="search" className="form-control" placeholder="e.g. Developer, TechCorp" value={filters.search} onChange={handleFilterChange} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Location</label>
            <input type="text" name="location" className="form-control" placeholder="e.g. New York, Remote" value={filters.location} onChange={handleFilterChange} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Job Type</label>
            <select name="type" className="form-control" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={clearFilters}>Clear</button>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3>No jobs found</h3>
          <p>Try adjusting your search filters to find more opportunities.</p>
          <button onClick={clearFilters} className="btn btn-outline" style={{ marginTop: '1rem' }}>Clear Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {filteredJobs.map(job => (
            <div key={job.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-color)' }}>{job.title}</h3>
                <span className="badge badge-info">{job.type}</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{job.company}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📍 {job.location}</span>
                <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>💰 {job.salary}</span>
              </div>
              
              <div style={{ marginBottom: '1.5rem', flex: 1 }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><strong>Skills:</strong> {job.requirements}</p>
                <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--danger)' }}><strong>Deadline:</strong> {job.deadline || 'N/A'}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to={`/jobs/${job.id}`} className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
