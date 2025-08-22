import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">Student Portal</h1>
      <div className="nav-links">
        <Link to="/" className="home">Home</Link>
        <Link to="/ViewStudent" className="viewstudent">View Students</Link>
      </div>
    </nav>
  );
};

export default NavBar;
