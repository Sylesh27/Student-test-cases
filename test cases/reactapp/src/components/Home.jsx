import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h2>Welcome to Student Registration</h2>
      <div className="home-content">
        <img 
          src="/images/student-background.jpg" 
          alt="background" 
          className="home-image"
        />
        <div className="home-actions">
          <p>Manage your student records efficiently with our comprehensive system.</p>
          <div className="action-buttons">
            <Link to="/register" className="btn btn-primary">
              Register New Student
            </Link>
            <Link to="/students" className="btn btn-secondary">
              View All Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 