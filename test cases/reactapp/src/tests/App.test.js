import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
import { BrowserRouter } from 'react-router-dom';
import AddStudent from '../components/AddStudent';
import ViewStudent from '../components/ViewStudent';
import Footer from '../components/Footer';

test('renders_App_with_Header_and_routing_links', () => {
  render(<App />);
  const headerTitleElement = screen.getByText(/Student Portal/i);
  expect(headerTitleElement).toBeInTheDocument();

  const studentsLinkElement = screen.getByText(/View Students/i);
  const homeLinkElement = screen.getByText(/Home/i);

  expect(studentsLinkElement).toBeInTheDocument();
  expect(homeLinkElement).toBeInTheDocument();
});

test('renders_Home_component_with_Heading', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const headingElement = screen.getByText(/Welcome to Student Registration/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders_Home_component_image_used_inside_div_home', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Welcome to Student Registration/i);
  const imageElement = screen.getByAltText(/background/i);
  expect(heading).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();
});

test('renders_AddStudent_component_form_Home', () => {
  render(<App />);
  const registerLink = screen.getByText(/Register Student/i);
  fireEvent.click(registerLink);
  const heading = screen.getByText(/Register a New Student/i);
  expect(heading).toBeInTheDocument();
});

test('renders_Student_title_correctly', () => {
  render(<App />);
  const viewStudentsLink = screen.getByText(/View Students/i);
  fireEvent.click(viewStudentsLink);
  const title = screen.getByText(/All Students/i);
  expect(title).toBeInTheDocument();
});

test('renders_form_input_fields_and_labels', () => {
  render(
    <BrowserRouter>
      <AddStudent />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/Student Name:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Student City:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enrolled In:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Student Type:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Attended School:/i)).toBeInTheDocument();
});

test('displays_validation_errors_with_empty_input', async () => {
  render(
    <BrowserRouter>
      <AddStudent />
    </BrowserRouter>
  );

  const submitButton = screen.getByText(/Register Student/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/City is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid 10-digit phone number required/i)).toBeInTheDocument();
    expect(screen.getByText(/EnrolledIn is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Student Type is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Attended School is required/i)).toBeInTheDocument();
  });
});

test('checks_submit_form_functionality', async () => {
  render(
    <BrowserRouter>
      <AddStudent />
    </BrowserRouter>
  );

  fireEvent.change(screen.getByLabelText(/Student Name:/i), { target: { value: 'Test Student' } });
  fireEvent.change(screen.getByLabelText(/Student City:/i), { target: { value: 'Test City' } });
  fireEvent.change(screen.getByLabelText(/Phone:/i), { target: { value: '9876543210' } });
  fireEvent.change(screen.getByLabelText(/Enrolled In:/i), { target: { value: 'Science' } });
  fireEvent.change(screen.getByLabelText(/Student Type:/i), { target: { value: 'Full Time' } });
  fireEvent.change(screen.getByLabelText(/Last Attended School:/i), { target: { value: 'ABC School' } });

  const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

  fireEvent.click(screen.getByText(/Register Student/i));

  await waitFor(() => {
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: 'Test Student',
        studentCity: 'Test City',
        phone: '9876543210',
        enrolledIn: 'Science',
        studentType: 'Full Time',
        lastAttendedSchool: 'ABC School',
      })
    }));
  });

  fetchMock.mockRestore();
});

test('fetches_data_from_the_backend_when_the_component_mounts', async () => {
  const mockStudentData = [
    {
      studentId: 1,
      studentName: 'John Doe',
      studentCity: 'New York',
      phone: '9876543210',
      enrolledIn: 'Math',
      studentType: 'Full Time',
      lastAttendedSchool: 'XYZ High School',
    }
  ];

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => mockStudentData
  });

  render(
    <BrowserRouter>
      <ViewStudent />
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('9876543210')).toBeInTheDocument();
    expect(screen.getByText('Math')).toBeInTheDocument();
    expect(screen.getByText('Full Time')).toBeInTheDocument();
    expect(screen.getByText('XYZ High School')).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test('renders_Student_Registration_App_in_the_footer', () => {
  render(<Footer />);
  const footerText = screen.getByText(/© 2025 Student Registration System/i);
  expect(footerText).toBeInTheDocument();
});
