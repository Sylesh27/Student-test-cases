import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import ViewStudent from './components/ViewStudent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Student Portal</h1>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/register" className="nav-link">Register Student</Link>
            <Link to="/view" className="nav-link">View Students</Link>
          </nav>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<AddStudent />} />
            <Route path="/view" element={<ViewStudent />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;