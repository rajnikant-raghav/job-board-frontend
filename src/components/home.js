import React from 'react';
import JobListings from './JobListings';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of job opportunities with all the information you need</p>
        </div>
      </section>

      {/* Job Listings Component */}
      <JobListings />
    </div>
  );
};

export default Home;
