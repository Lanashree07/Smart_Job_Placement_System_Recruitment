import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--white)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)' }}>Smart Job Placement and Recruitment Management System</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--secondary-color)', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          Discover opportunities, apply for jobs, track your applications, and manage your placement journey seamlessly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>Explore Jobs</Link>
          <Link to="/register" className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>Create Profile</Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics grid grid-cols-4" style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <div className="card">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>500+</h2>
          <p style={{ margin: 0, fontWeight: 500 }}>Candidates</p>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>100+</h2>
          <p style={{ margin: 0, fontWeight: 500 }}>Job Opportunities</p>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>50+</h2>
          <p style={{ margin: 0, fontWeight: 500 }}>Companies</p>
        </div>
        <div className="card">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>85%</h2>
          <p style={{ margin: 0, fontWeight: 500 }}>Placement Rate</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose SmartHire?</h2>
        <div className="grid grid-cols-4">
          <div className="card">
            <h3>Find Opportunities</h3>
            <p>Browse through hundreds of job listings curated for your skillset and career goals.</p>
          </div>
          <div className="card">
            <h3>Easy Applications</h3>
            <p>Apply to multiple companies with a single profile and streamlined application process.</p>
          </div>
          <div className="card">
            <h3>Application Tracking</h3>
            <p>Monitor your application status in real-time from submission to final placement.</p>
          </div>
          <div className="card">
            <h3>Placement Management</h3>
            <p>Manage all your job offers and placement details securely in one place.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" style={{ marginBottom: '4rem', background: 'var(--white)', padding: '3rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>How It Works</h2>
        <div className="grid grid-cols-5" style={{ textAlign: 'center' }}>
          <div>
            <div style={{ background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.2rem', fontWeight: 'bold' }}>1</div>
            <h4>Create Your Profile</h4>
          </div>
          <div>
            <div style={{ background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.2rem', fontWeight: 'bold' }}>2</div>
            <h4>Discover Jobs</h4>
          </div>
          <div>
            <div style={{ background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.2rem', fontWeight: 'bold' }}>3</div>
            <h4>Apply</h4>
          </div>
          <div>
            <div style={{ background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.2rem', fontWeight: 'bold' }}>4</div>
            <h4>Track Application</h4>
          </div>
          <div>
            <div style={{ background: 'var(--primary-color)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', fontSize: '1.2rem', fontWeight: 'bold' }}>5</div>
            <h4>Get Placed</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--primary-color)', color: 'var(--white)', borderRadius: 'var(--border-radius)' }}>
        <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Ready to start your journey?</h2>
        <p style={{ color: 'var(--white)', marginBottom: '2rem', opacity: 0.9 }}>Create your profile today and connect with top employers.</p>
        <Link to="/register" className="btn" style={{ background: 'var(--white)', color: 'var(--primary-color)', padding: '0.75rem 2rem', fontSize: '1.1rem', fontWeight: 'bold' }}>Create Profile Now</Link>
      </section>
    </div>
  );
};

export default Home;
