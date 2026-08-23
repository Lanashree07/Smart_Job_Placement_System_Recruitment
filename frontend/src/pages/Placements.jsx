import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { applicationsAPI } from '../services/api';

const Placements = () => {
  const { user } = useAuth();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const response = await applicationsAPI.getCandidatePlacements(user.id);
        setPlacements(response.data);
      } catch (error) {
        console.error("Failed to load placements", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchPlacements();
  }, [user]);

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}>Loading placements...</div>;

  return (
    <div className="placements-page">
      <div style={{ marginBottom: '2rem' }}>
        <h1>My Placements</h1>
        <p>Congratulations! Here are your successful job placements.</p>
      </div>

      {placements.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
          <h3>Your Placement Journey Starts Here</h3>
          <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto' }}>
            You don't have any finalized placements yet. Keep applying, preparing for interviews, and your success story will appear here soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          {placements.map(placement => (
            <div key={placement.id} className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ color: 'var(--success)', margin: 0 }}>Placed! 🎉</h2>
                <span className="badge badge-success" style={{ fontSize: '0.9rem' }}>{new Date(placement.appliedDate).toLocaleDateString()}</span>
              </div>
              
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{placement.jobTitle}</h3>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>{placement.company}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-light)' }}>Location: {placement.location}</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                  The company will contact you shortly regarding the onboarding process.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Placements;
