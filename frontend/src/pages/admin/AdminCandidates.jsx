import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';

const AdminCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filters, setFilters] = useState({ search: '', college: '' });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await authAPI.getAllCandidates();
        setCandidates(response.data);
      } catch (error) {
        console.error("Failed to load candidates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(cand => {
    const searchMatch = cand.name.toLowerCase().includes(filters.search.toLowerCase()) || cand.email.toLowerCase().includes(filters.search.toLowerCase());
    const collegeMatch = filters.college ? (cand.college || '').toLowerCase().includes(filters.college.toLowerCase()) : true;
    return searchMatch && collegeMatch;
  });

  if (loading) return <div>Loading candidates...</div>;

  return (
    <div className="admin-candidates">
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-dark)' }}>Registered Candidates</h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="grid grid-cols-2">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Search Name or Email</label>
            <input type="text" className="form-control" placeholder="Search..." value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Filter by College</label>
            <input type="text" className="form-control" placeholder="College name..." value={filters.college} onChange={e => setFilters({...filters, college: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="card">
        {filteredCandidates.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '2rem' }}>
             <p>No candidates found.</p>
           </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Degree</th>
                  <th>CGPA</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(cand => (
                  <tr key={cand.id}>
                    <td style={{ fontWeight: 500 }}>{cand.name}</td>
                    <td>{cand.email}</td>
                    <td>{cand.college || '-'}</td>
                    <td>{cand.degree || '-'}</td>
                    <td>{cand.cgpa ? parseFloat(cand.cgpa).toFixed(2) : '-'}</td>
                    <td>
                      <button onClick={() => setSelectedCandidate(cand)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedCandidate && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setSelectedCandidate(null)} className="btn btn-outline" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.5rem' }}>✕ Close</button>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Candidate Profile</h2>
            
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div><strong style={{ color: 'var(--text-light)' }}>Name</strong><p>{selectedCandidate.name}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>Email</strong><p>{selectedCandidate.email}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>Phone</strong><p>{selectedCandidate.phone || '-'}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>Gender</strong><p>{selectedCandidate.gender || '-'}</p></div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: 'var(--text-light)' }}>Address</strong>
                <p>{selectedCandidate.address}, {selectedCandidate.city}, {selectedCandidate.state}</p>
              </div>

              <div><strong style={{ color: 'var(--text-light)' }}>College</strong><p>{selectedCandidate.college || '-'}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>Degree & Branch</strong><p>{selectedCandidate.degree} - {selectedCandidate.branch}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>Graduation Year</strong><p>{selectedCandidate.gradYear || '-'}</p></div>
              <div><strong style={{ color: 'var(--text-light)' }}>CGPA</strong><p>{selectedCandidate.cgpa || '-'}</p></div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <strong style={{ color: 'var(--text-light)' }}>Skills</strong>
                <p>{selectedCandidate.skills || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCandidates;
