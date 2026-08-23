import React, { useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI, adminAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalJobs: 0,
    totalApplications: 0,
    underReview: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
    totalPlacements: 0
  });

  const [recentApps, setRecentApps] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        /*
         * Load:
         * 1. Dashboard statistics from Spring Boot
         * 2. All jobs for Recent Jobs
         * 3. All applications for Recent Applications
         */
        const [statsRes, jobsRes, appsRes] = await Promise.all([
          adminAPI.getDashboardStats(),
          jobsAPI.getAllJobs(),
          applicationsAPI.getAllApplications()
        ]);

        // -----------------------------
        // Dashboard statistics
        // -----------------------------
        const dashboardStats = statsRes.data || {};

        setStats({
          totalCandidates: dashboardStats.totalCandidates || 0,
          totalJobs: dashboardStats.totalJobs || 0,
          totalApplications: dashboardStats.totalApplications || 0,
          underReview: dashboardStats.underReview || 0,
          shortlisted: dashboardStats.shortlisted || 0,
          selected: dashboardStats.selected || 0,
          rejected: dashboardStats.rejected || 0,
          totalPlacements: dashboardStats.totalPlacements || 0
        });

        // -----------------------------
        // Recent Jobs
        // -----------------------------
        const jobs = Array.isArray(jobsRes.data)
          ? jobsRes.data
          : [];

        const sortedJobs = [...jobs]
          .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
          .slice(0, 5);

        setRecentJobs(sortedJobs);

        // -----------------------------
        // Recent Applications
        // -----------------------------
        const applications = Array.isArray(appsRes.data)
          ? appsRes.data
          : [];

        const sortedApplications = [...applications]
          .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
          .slice(0, 5);

        setRecentApps(sortedApplications);

      } catch (error) {
        console.error(
          'Failed to load admin dashboard data:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // -----------------------------
  // Loading state
  // -----------------------------
  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="card">
          <h3>Loading dashboard analytics...</h3>
        </div>
      </div>
    );
  }

  // -----------------------------
  return (
    <div className="admin-dashboard">

      {/* =========================================
          PAGE TITLE
      ========================================== */}
      <h1
        style={{
          marginBottom: '1.5rem',
          color: 'var(--text-dark)'
        }}
      >
        Dashboard Overview
      </h1>

      {/* =========================================
          STATISTICS CARDS
      ========================================== */}
      <div
        className="grid grid-cols-4"
        style={{ marginBottom: '2rem' }}
      >

        {/* Total Candidates */}
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--primary-color)'
          }}
        >
          <p
            style={{
              color: 'var(--text-light)',
              margin: '0 0 0.5rem 0',
              fontWeight: 500
            }}
          >
            Total Candidates
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: '2rem'
            }}
          >
            {stats.totalCandidates}
          </h2>
        </div>

        {/* Total Jobs */}
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--warning)'
          }}
        >
          <p
            style={{
              color: 'var(--text-light)',
              margin: '0 0 0.5rem 0',
              fontWeight: 500
            }}
          >
            Total Jobs
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: '2rem'
            }}
          >
            {stats.totalJobs}
          </h2>
        </div>

        {/* Total Applications */}
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--info)'
          }}
        >
          <p
            style={{
              color: 'var(--text-light)',
              margin: '0 0 0.5rem 0',
              fontWeight: 500
            }}
          >
            Total Applications
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: '2rem'
            }}
          >
            {stats.totalApplications}
          </h2>
        </div>

        {/* Total Placements */}
        <div
          className="card"
          style={{
            borderLeft: '4px solid var(--success)'
          }}
        >
          <p
            style={{
              color: 'var(--text-light)',
              margin: '0 0 0.5rem 0',
              fontWeight: 500
            }}
          >
            Total Placements
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: '2rem'
            }}
          >
            {stats.totalPlacements}
          </h2>
        </div>

      </div>

      {/* =========================================
          APPLICATION PIPELINE + RECENT JOBS
      ========================================== */}
      <div
        className="grid grid-cols-2"
        style={{ marginBottom: '2rem' }}
      >

        {/* Application Status Pipeline */}
        <div className="card">

          <h3
            style={{
              marginBottom: '1rem',
              color: 'var(--text-dark)'
            }}
          >
            Application Status Pipeline
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >

            {/* Total Applications */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Total Applications</span>
              <strong>{stats.totalApplications}</strong>
            </div>

            {/* Under Review */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Under Review</span>
              <strong>{stats.underReview}</strong>
            </div>

            {/* Shortlisted */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Shortlisted</span>
              <strong>{stats.shortlisted}</strong>
            </div>

            {/* Selected */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--success)'
              }}
            >
              <span>Selected</span>
              <strong>{stats.selected}</strong>
            </div>

            {/* Rejected */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'var(--danger)'
              }}
            >
              <span>Rejected</span>
              <strong>{stats.rejected}</strong>
            </div>

            {/* Placements */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Total Placements</span>
              <strong>{stats.totalPlacements}</strong>
            </div>

          </div>
        </div>

        {/* Recent Jobs */}
        <div className="card">

          <h3
            style={{
              marginBottom: '1rem',
              color: 'var(--text-dark)'
            }}
          >
            Recent Jobs
          </h3>

          <div
            className="table-container"
            style={{ boxShadow: 'none' }}
          >

            <table>

              <thead>
                <tr>
                  <th style={{ padding: '0.5rem' }}>
                    Job Title
                  </th>

                  <th style={{ padding: '0.5rem' }}>
                    Company
                  </th>

                  <th style={{ padding: '0.5rem' }}>
                    Location
                  </th>
                </tr>
              </thead>

              <tbody>

                {recentJobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: 'center' }}
                    >
                      No jobs available
                    </td>
                  </tr>
                ) : (
                  recentJobs.map((job) => (
                    <tr key={job.id}>

                      <td
                        style={{
                          padding: '0.5rem',
                          fontWeight: 500
                        }}
                      >
                        {job.title || 'N/A'}
                      </td>

                      <td style={{ padding: '0.5rem' }}>
                        {job.company || 'N/A'}
                      </td>

                      <td style={{ padding: '0.5rem' }}>
                        {job.location || 'N/A'}
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>

      {/* =========================================
          RECENT APPLICATIONS
      ========================================== */}
      <div className="card">

        <h3
          style={{
            marginBottom: '1rem',
            color: 'var(--text-dark)'
          }}
        >
          Recent Applications
        </h3>

        <div
          className="table-container"
          style={{ boxShadow: 'none' }}
        >

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

              {recentApps.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    No applications yet
                  </td>
                </tr>

              ) : (

                recentApps.map((app) => (

                  <tr key={app.id}>

                    {/* Candidate */}
                    <td
                      style={{
                        fontWeight: 500
                      }}
                    >
                      {app.candidateName || 'Unknown'}
                    </td>

                    {/* Job */}
                    <td>
                      {app.jobTitle || 'Unknown'}
                    </td>

                    {/* Company */}
                    <td>
                      {app.company || 'Unknown'}
                    </td>

                    {/* Applied Date */}
                    <td>
                      {app.appliedDate
                        ? new Date(
                            app.appliedDate
                          ).toLocaleDateString()
                        : 'N/A'}
                    </td>

                    {/* Status */}
                    <td>

                      <span
                        className={`badge ${
                          app.status === 'Selected'
                            ? 'badge-success'
                            : app.status === 'Rejected'
                            ? 'badge-danger'
                            : app.status === 'Shortlisted'
                            ? 'badge-warning'
                            : 'badge-info'
                        }`}
                      >
                        {app.status || 'Applied'}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;