# JobBoard - Fullstack Job Portal

A modern, responsive job board application built with React.js frontend and Node.js backend, featuring real-time job posting, searching, and filtering capabilities.

🌐 **Live Demo:** [https://job-board-frontend-omega.vercel.app/](https://job-board-frontend-omega.vercel.app/)

![JobBoard Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=JobBoard+Screenshot)

## 🚀 Features

### Frontend Features
- **Modern UI/UX Design** - Clean, responsive design with gradient themes
- **Job Search & Filtering** - Search by job title, company, skills, and location
- **Advanced Filters** - Filter by job type (Full-time, Part-time, Contract, etc.)
- **Job Details Page** - Comprehensive job information display
- **Real-time Updates** - Instant job listings updates
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Component-based Architecture** - Modular React components for maintainability

### Backend Features
- **RESTful API** - Complete CRUD operations for jobs
- **MongoDB Integration** - Scalable database solution
- **Input Validation** - Server-side validation for all job data
- **Error Handling** - Comprehensive error handling and responses
- **CORS Support** - Cross-origin resource sharing enabled

### Job Management
- **Create Jobs** - Post new job listings with detailed information
- **Job Fields** - Title, company, location, type, salary, description, skills, education
- **Real-time Updates** - Jobs appear immediately after posting
- **Search Functionality** - Find jobs by multiple criteria
- **Location Filtering** - Filter by specific cities and remote work
- **Job Type Filtering** - Filter by employment type

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page applications
- **CSS3** - Custom styling with modern design patterns
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **ES6+** - Modern JavaScript features

## 📁 Project Structure

```
job-board/
├── backend/
│   ├── app.js                 # Main server file
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── controllers/
│   │   └── jobController.js  # Job CRUD operations
│   ├── models/
│   │   └── job.js            # Job data model
│   ├── routes/
│   │   └── jobRoutes.js      # API routes
│   └── package.json
├── frontend/
│   └── job-board/
│       ├── public/
│       │   ├── index.html    # Main HTML file
│       │   └── manifest.json # PWA manifest
│       ├── src/
│       │   ├── components/
│       │   │   ├── header.js         # Navigation header
│       │   │   ├── home.js           # Home page component
│       │   │   ├── createJob.js      # Job creation form
│       │   │   ├── JobListings.js    # Job listings with filters
│       │   │   ├── JobDetails.js     # Individual job details
│       │   │   └── *.css             # Component styles
│       │   ├── services/
│       │   │   └── api.js            # API service functions
│       │   ├── App.js                # Main app component
│       │   └── index.js              # App entry point
│       └── package.json
└── README.md
```

## 🚀 Getting Started

### Quick Start
Want to see the application in action? Visit the **[Live Demo](https://job-board-frontend-omega.vercel.app/)** to explore the job board features without any setup!

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board.git
   cd job-board
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend/job-board
   npm install
   ```

4. **Configure Database**
   - Create a MongoDB database (local or cloud)
   - Update the database connection string in `backend/config/db.js`

5. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend/job-board
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 📡 API Endpoints

### Jobs API
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Job Data Structure
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "type": "Full-time",
  "location": "City, State",
  "description": "Job description",
  "salary": 80000,
  "skills": "React, JavaScript, Node.js",
  "education": "Bachelor's Degree"
}
```

## 🎨 Features in Detail

### Job Creation
- Comprehensive job posting form
- Required field validation
- Real-time form feedback
- Success/error notifications

### Job Search & Filtering
- **Text Search**: Search by job title, company, description, or skills
- **Location Filter**: Filter by specific cities or remote work
- **Job Type Filter**: Filter by employment type (Full-time, Part-time, etc.)
- **Combined Filters**: Apply multiple filters simultaneously

### Job Display
- **Job Cards**: Modern card-based layout with hover effects
- **Job Details**: Comprehensive job information page
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Smooth loading animations

### User Experience
- **Intuitive Navigation**: Easy-to-use interface
- **Real-time Updates**: Instant job listing updates
- **Error Handling**: User-friendly error messages
- **Mobile Responsive**: Perfect experience on all devices

## 🔧 Configuration

### Backend Configuration
- Database connection in `backend/config/db.js`
- Server port configuration
- CORS settings for cross-origin requests

### Frontend Configuration
- API base URL in `frontend/job-board/src/services/api.js`
- React Router configuration
- Component styling and theming

## 🚀 Deployment

### Live Application
- **Frontend:** [https://job-board-frontend-omega.vercel.app/](https://job-board-frontend-omega.vercel.app/) (Deployed on Vercel)
- **Backend API:** [https://job-board-backend-m64n.onrender.com/api/jobs](https://job-board-backend-m64n.onrender.com/api/jobs) (Deployed on Render)

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or Render
2. Set environment variables
3. Configure MongoDB connection
4. Update CORS settings for production domain

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or GitHub Pages
3. Update API base URL for production
4. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: https://github.com/rajnikant-raghav
- LinkedIn: https://www.linkedin.com/in/rajnikantraghav/

## 🙏 Acknowledgments

- React.js community for the amazing framework
- MongoDB for the robust database solution
- Express.js for the powerful backend framework
- All contributors and supporters

## 📞 Support

If you have any questions or need support, please:
- Open an issue on GitHub
- Contact the author directly
- Check the documentation

---

**Made with ❤️ by [Rajnikant Raghav]** 
