// Real API Service for Job Board Application

const API_BASE_URL = 'https://job-board-backend-m64n.onrender.com/api';

// Job API Functions
export const jobAPI = {
  // Get all jobs
  async getAllJobs(filters = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      let filteredJobs = data;

      // Apply filters
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          (job.skills && job.skills.toLowerCase().includes(searchTerm))
        );
      }

      if (filters.location && filters.location !== 'All Locations') {
        filteredJobs = filteredJobs.filter(job => job.location === filters.location);
      }

      if (filters.type) {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
      }

      return {
        success: true,
        data: filteredJobs,
        total: filteredJobs.length,
        message: `Found ${filteredJobs.length} jobs`
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  },

  // Get single job by ID
  async getJobById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Job details retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching job:', error);
      throw new Error('Failed to fetch job details');
    }
  },

  // Create new job
  async createJob(jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Job posted successfully!',
        jobId: data._id
      };
    } catch (error) {
      console.error('Error creating job:', error);
      throw new Error(error.message || 'Failed to create job posting');
    }
  },

  // Update job
  async updateJob(id, jobData) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Job updated successfully'
      };
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error(error.message || 'Failed to update job posting');
    }
  },

  // Delete job
  async deleteJob(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return {
        success: true,
        message: 'Job deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error(error.message || 'Failed to delete job posting');
    }
  },

  // Get job statistics
  async getJobStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jobs = await response.json();
      
      const totalJobs = jobs.length;
      const locations = [...new Set(jobs.map(job => job.location))];
      const companies = [...new Set(jobs.map(job => job.company))];

      return {
        success: true,
        data: {
          totalJobs,
          activeJobs: totalJobs,
          totalApplications: 0,
          locations,
          companies,
          recentJobs: jobs.slice(0, 5)
        },
        message: 'Statistics retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching job statistics:', error);
      throw new Error('Failed to fetch job statistics');
    }
  }
};

// User API Functions
export const userAPI = {
  // User login
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error(error.message || 'Failed to authenticate');
    }
  },

  // User registration
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Registration successful'
      };
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error(error.message || 'Failed to register user');
    }
  },

  // Get user profile
  async getUserProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Profile retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error(error.message || 'Failed to fetch user profile');
    }
  }
};

// Application API Functions
export const applicationAPI = {
  // Apply for a job
  async applyForJob(jobId, applicationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(applicationData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Application submitted successfully'
      };
    } catch (error) {
      console.error('Error submitting application:', error);
      throw new Error(error.message || 'Failed to submit application');
    }
  },

  // Get user applications
  async getUserApplications() {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/my-applications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Applications retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error(error.message || 'Failed to fetch applications');
    }
  }
};

// Company API Functions
export const companyAPI = {
  // Get all companies
  async getAllCompanies() {
    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const companies = [...new Set(data.map(company => company.name))].map(name => ({
        id: name, // Assuming company name is unique for now
        name: name,
        location: data.find(c => c.name === name)?.location || 'Unknown',
        jobCount: data.filter(c => c.name === name).length,
        logo: '🏢'
      }));

      return {
        success: true,
        data: companies,
        message: 'Companies retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw new Error(error.message || 'Failed to fetch companies');
    }
  },

  // Get company details
  async getCompanyDetails(companyName) {
    try {
      const response = await fetch(`${API_BASE_URL}/companies/details/${companyName}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        data: data,
        message: 'Company details retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching company details:', error);
      throw new Error(error.message || 'Failed to fetch company details');
    }
  }
};

export default {
  jobAPI,
  userAPI,
  applicationAPI,
  companyAPI
}; 