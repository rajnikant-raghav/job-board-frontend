import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import './JobListings.css';

const JobListings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const locations = [
    'All Locations',
    'Remote',
    'Noida',
    'Gurugram',
    'Hyderabad',
    'Bengaluru',
    'Chennai',
    'Mumbai',
    'Delhi',
    'Kolkata',
    'Pune',
    'Jaipur',
    'Ahmedabad',
    'Chandigarh',
  ];

  const jobTypes = [
    'All Job Types',
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Freelance',
    'Remote',
  ];

  useEffect(() => {
    // Fetch jobs from real API
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getAllJobs();
        if (response.success) {
          setJobs(response.data);
          setFilteredJobs(response.data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, selectedLocation, selectedJobType, jobs]);

  const filterJobs = () => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.skills && job.skills.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by location
    if (selectedLocation && selectedLocation !== 'All Locations') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Filter by job type
    if (selectedJobType && selectedJobType !== 'All Job Types') {
      filtered = filtered.filter(job => job.type === selectedJobType);
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
  };

  const handleJobClick = (jobId) => {
    // Navigate to job details page
    navigate(`/job/${jobId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCompanyLogo = (company) => {
    // Simple logo generation based on company name
    const logos = {
      'Adobe': '🎨',
      'TechCorp': '🏢',
      'Design Studio': '🎨',
      'Analytics Pro': '📊',
      'Cloud Solutions': '☁️',
      'Innovation Labs': '🚀',
      'Web Solutions': '💻'
    };
    
    return logos[company] || '🏢';
  };

  return (
    <div className="job-listings-container">
      {/* Search and Filter Section */}
      <section className="search-section">
        <div className="search-container">
          <div className="search-box">
            <div className="search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div className="location-filter">
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="location-select"
              >
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="job-type-filter">
              <select
                value={selectedJobType}
                onChange={handleJobTypeChange}
                className="job-type-select"
              >
                {jobTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button className="search-button">Search Jobs</button>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="jobs-section">
        <div className="jobs-container">
          <div className="jobs-header">
            <h2>Available Jobs</h2>
            <p>{filteredJobs.length} jobs found</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <div className="no-jobs-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria or location filter</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="job-card"
                  onClick={() => handleJobClick(job._id)}
                >
                  <div className="job-header">
                    <div className="company-logo">{getCompanyLogo(job.company)}</div>
                    <div className="job-info">
                      <h3 className="job-title">{job.title}</h3>
                      <p className="company-name">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="job-details">
                    <div className="job-meta">
                      <span className="location">📍 {job.location}</span>
                      <span className="job-type">{job.type}</span>
                    </div>
                    {job.salary && <div className="salary">💰 {job.salary} Lpa</div>}
                    <p className="job-description">{job.description}</p>
                  </div>

                  {job.skills && (
                    <div className="job-skills">
                      <h4 className="skills-title">Required Skills:</h4>
                      <div className="skills-tags">
                        {job.skills.split(',').slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill.trim()}
                          </span>
                        ))}
                        {job.skills.split(',').length > 3 && (
                          <span className="skill-tag more">+{job.skills.split(',').length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {job.education && (
                    <div className="job-education">
                      <h4 className="education-title">Education:</h4>
                      <span className="education-tag">{job.education}</span>
                    </div>
                  )}

                  <div className="job-footer">
                    <span className="posted-date">Posted {formatDate(job.createdAt)}</span>
                    <button className="apply-button">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListings; 