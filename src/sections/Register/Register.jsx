import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register({ onFormSwitch }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };

    if (firstname === '') {
      newErrors.firstname = 'First name is required';
      valid = false;
    }

    if (lastname === '') {
      newErrors.lastname = 'Last name is required';
      valid = false;
    }

    if (email === '') {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (password === '') {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be 8 characters or more';
      valid = false;
    } else if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
      newErrors.password = 'Password must contain at least one letter, one number, and one special character';
      valid = false;
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAsyncSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password, confirmPassword }),
      });
  
      const data = await response.json();
      console.log('Response:', data);
  
      if (response.ok) {
        setMessage('Registration successful!');
        setErrors({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' });
        navigate('/login'); // Redirect to login page
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    if (validateForm()) {
      handleAsyncSubmit();
    } else {
      setMessage('Please fix the errors above.');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="header">Register</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            First Name:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="input"
            />
            {errors.firstname && <p className="error">{errors.firstname}</p>}
          </label>
          <label className="label">
            Last Name:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="input"
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
          </label>
          <label className="label">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label className="label">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <label className="label">
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>
          <input type="submit" value="Submit" className="button" />
        </form>
        <button
          onClick={() => onFormSwitch('login')}
          style={{
            backgroundColor: '#4591e8',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Already have an account? Login
        </button>
        {message && (
          <p className={`message ${message === 'Registration successful!' ? 'message-success' : 'message-error'}`}>
            {message}
          </p>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Register;
