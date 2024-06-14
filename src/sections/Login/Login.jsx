import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './Login.css';

function Login({ onFormSwitch, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

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

    setErrors(newErrors);
    return valid;
  };

  const handleAsyncSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        setErrors({ email: '', password: '' });
        localStorage.setItem('token', data.token);
        onLogin(data.token); // Call the onLogin function passed via props
        navigate('/home'); // Redirect to home page after successful login
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
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
        <h2 className="header">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Email:
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label className="label">
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <input type="submit" value="Submit" className="button" />
        </form>
        <button
          onClick={() => onFormSwitch('register')}
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
          Don't have an account? Register
        </button>
        {message && (
          <p className={`message ${message === 'Login successful!' ? 'message-success' : 'message-error'}`}>
            {message}
          </p>
        )}
        <div className='spinner-container'>
          {loading ? <ClipLoader /> : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
