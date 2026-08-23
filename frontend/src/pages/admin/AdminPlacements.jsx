import React, { useState, useEffect } from 'react';
import { applicationsAPI } from '../../services/api';

const AdminPlacements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await applicationsAPI.getAllPlacements();
      setPlacements(response.data);
    } catch (error) {
      console.error("Failed to load placements", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await applicationsAPI.updatePlacementStatus(appId, newStatus);
      fetchPlacements();
    } catch (error) {
      console.error("Failed to update placement status", error);
    }
  };

  if (loading) return <div>Loading placements...</div>;

  return (
    <div className="admin-placements">
      <h1 style={{ marginBottom: '2rem', color: 'var(--text-dark)' }}>Placement Records</h1>

      <div className="card">
        {placements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>No successful placements recorded yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Company & Role</th>
                  <th>Selection Date</th>
                  <th>Placement Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {placements.sort((a,b) => b.id - a.id).map(place => (
                  <tr key={place.id}>
                    <td>
                      <strong>{place.candidateName}</strong><br/>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{place.candidateEmail}</span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--primary-color)' }}>{place.jobTitle}</strong><br/>
                      <span style={{ fontSize: '0.85rem' }}>{place.company}</span>
                    </td>
                    <td>{new Date(place.appliedDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${place.placementStatus === 'Joined' ? 'success' : place.placementStatus === 'Offer Received' ? 'info' : 'warning'}`}>
                        {place.placementStatus || 'Selected'}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="form-control" 
                        value={place.placementStatus || 'Selected'} 
                        onChange={(e) => handleStatusChange(place.id, e.target.value)}
                        style={{ padding: '0.25rem', width: 'auto' }}
                      >
                        <option value="Selected">Selected</option>
                        <option value="Offer Received">Offer Received</option>
                        <option value="Joined">Joined</option>
                        <option value="Placement Completed">Placement Completed</option>
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

export default AdminPlacements;
