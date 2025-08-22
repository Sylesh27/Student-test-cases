import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: '',
    studentCity: '',
    phone: '',
    enrolledIn: '',
    studentType: '',
    lastAttendedSchool: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentName.trim()) newErrors.studentName = 'Name is required';
    if (!formData.studentCity.trim()) newErrors.studentCity = 'City is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Valid 10-digit phone number required';
    if (!formData.enrolledIn.trim()) newErrors.enrolledIn = 'EnrolledIn is required';
    if (!formData.studentType.trim()) newErrors.studentType = 'Student Type is required';
    if (!formData.lastAttendedSchool.trim())
      newErrors.lastAttendedSchool = 'Last Attended School is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://8080-ddaeebccdcccccaccdbfdbddcbccbfffbabbafdf.premiumproject.examly.io/api/students/addStudent",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData) // ✅ matches backend Student fields
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      alert('Student registered successfully!');
      navigate('/students');
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to register student. Check console for details.');
    }
  };

  return (
    <div className="add-student">
      <h2>Register a New Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className={errors.studentName ? 'error' : ''}
          />
          {errors.studentName && <span className="error-message">{errors.studentName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="studentCity">Student City:</label>
          <input
            type="text"
            id="studentCity"
            name="studentCity"
            value={formData.studentCity}
            onChange={handleChange}
            className={errors.studentCity ? 'error' : ''}
          />
          {errors.studentCity && <span className="error-message">{errors.studentCity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="enrolledIn">Enrolled In:</label>
          <select
            id="enrolledIn"
            name="enrolledIn"
            value={formData.enrolledIn}
            onChange={handleChange}
            className={errors.enrolledIn ? 'error' : ''}
          >
            <option value="">Select Subject</option>
            <option value="Math">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Computer Science">Computer Science</option>
          </select>
          {errors.enrolledIn && <span className="error-message">{errors.enrolledIn}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="studentType">Student Type:</label>
          <select
            id="studentType"
            name="studentType"
            value={formData.studentType}
            onChange={handleChange}
            className={errors.studentType ? 'error' : ''}
          >
            <option value="">Select Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
          {errors.studentType && <span className="error-message">{errors.studentType}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastAttendedSchool">Last Attended School:</label>
          <input
            type="text"
            id="lastAttendedSchool"
            name="lastAttendedSchool"
            value={formData.lastAttendedSchool}
            onChange={handleChange}
            className={errors.lastAttendedSchool ? 'error' : ''}
          />
          {errors.lastAttendedSchool && <span className="error-message">{errors.lastAttendedSchool}</span>}
        </div>

        <button type="submit" className="btn btn-primary">Register Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
