import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        "https://8080-ddaeebccdcccccaccdbfdbddcbccbfffbabbafdf.premiumproject.examly.io/api/students/getAllStudent"
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else if (response.status === 204) {
        setStudents([]); // no students
      } else {
        setError('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-student">
      <div className="header-section">
        <h2>All Students</h2>
        <Link to="/register" className="btn btn-primary">
          Add New Student
        </Link>
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : students.length === 0 ? (
        <div className="no-students">
          <p>No students registered yet.</p>
          <Link to="/register" className="btn btn-secondary">
            Register First Student
          </Link>
        </div>
      ) : (
        <div className="students-container">
          <div className="students-grid">
            {students.map(student => (
              <div key={student.studentId} className="student-card">
                <div className="student-header">
                  <h3>{student.studentName}</h3>
                  <span className="student-id">ID: {student.studentId}</span>
                </div>
                <div className="student-details">
                  <div className="detail-row">
                    <span className="label">City:</span>
                    <span className="value">{student.studentCity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Phone:</span>
                    <span className="value">{student.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Enrolled In:</span>
                    <span className="value">{student.enrolledIn}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Type:</span>
                    <span className="value">{student.studentType}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Last School:</span>
                    <span className="value">{student.lastAttendedSchool}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewStudent;
