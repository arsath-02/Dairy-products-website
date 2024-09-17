import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);
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
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (password === '') {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAsyncSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://milky-web.onrender.com/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        setErrors({ email: '', password: '' });
        localStorage.setItem('token', data.token);

        // Set the user context
        setUser({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          profilePicture: data.profilePicture,
        });

        onLogin(data.token); 
        navigate('/home'); 
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
              disabled={loading} // Disable while loading
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
              disabled={loading} // Disable while loading
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <input type="submit" value="Submit" className="button" disabled={loading} />
        </form>
        <div className="login-link-container">
          <p>Don't have an account? <button className="login-link" onClick={() => navigate('/register')}>Register</button></p>
        </div>
        {message && (
          <p className={`message ${message === 'Login successful!' ? 'message-success' : 'message-error'}`}>
            {message}
          </p>
        )}
        <div className="spinner-container">
          {loading ? <ClipLoader /> : null}
        </div>
      </div>
    </div>
  );
}

export default Login;
