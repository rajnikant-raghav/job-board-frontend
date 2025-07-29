import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobAPI } from '../services/api';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobAPI.getJobById(id);
        if (response.success) {
          setJob(response.data);
        } else {
          setError('Failed to fetch job details');
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Job not found or failed to load');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleBackToJobs = () => {
    navigate('/');
  };

  const handleApplyNow = () => {
    // TODO: Implement application functionality
    alert('Application feature coming soon!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCompanyLogo = (company) => {
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

  if (loading) {
    return (
      <div className="job-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleBackToJobs} className="back-button">
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="error-state">
          <div className="error-icon">🔍</div>
          <h2>Job Not Found</h2>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBackToJobs} className="back-button">
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      {/* Header */}
      <div className="job-details-header">
        <button onClick={handleBackToJobs} className="back-button">
          ← Back to Jobs
        </button>
      </div>

      {/* Job Details Card */}
      <div className="job-details-card">
        {/* Job Header */}
        <div className="job-header">
          <div className="company-logo">{getCompanyLogo(job.company)}</div>
          <div className="job-info">
            <h1 className="job-title">{job.title}</h1>
            <p className="company-name">{job.company}</p>
            <div className="job-meta">
              <span className="location">📍 {job.location}</span>
              <span className="job-type">{job.type}</span>
              {job.salary && <span className="job-type">💰 {job.salary} Lpa</span>}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="job-content">
          {/* Description Section */}
          <div className="job-section">
            <h2>Job Description</h2>
            <p className="job-description">{job.description}</p>
          </div>

          {/* Skills Section */}
          {job.skills && (
            <div className="job-section">
              <h2>Required Skills</h2>
              <div className="skills-container">
                {job.skills.split(',').map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {job.education && (
            <div className="job-section">
              <h2>Education Requirements</h2>
              <div className="education-container">
                <span className="education-tag">{job.education}</span>
              </div>
            </div>
          )}

          {/* Job Meta Information */}
          <div className="job-section">
            <h2>Job Information</h2>
            <div className="job-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Posted:</span>
                <span className="meta-value">{formatDate(job.createdAt)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Job Type:</span>
                <span className="meta-value">{job.type}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Location:</span>
                <span className="meta-value">{job.location}</span>
              </div>
              {job.salary && (
                <div className="meta-item">
                  <span className="meta-label">Salary:</span>
                  <span className="meta-value">{job.salary} Lpa</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="job-actions">
          <button onClick={handleApplyNow} className="apply-button">
            Apply Now
          </button>
          <button onClick={handleBackToJobs} className="secondary-button">
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 