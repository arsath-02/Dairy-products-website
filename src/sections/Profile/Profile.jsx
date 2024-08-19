import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

import { Button } from 'react-bootstrap'; 

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
          return;
        }

        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); 
        } else {
          throw new Error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login'); 
            } finally {
        setIsLoading(false); 
            }
    };

    fetchUserProfile(); 
  }, [navigate]); 

  const handleDeleteAccount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.delete('http://localhost:5000/api/users/me', config);
  
      if (response.data.success) {
        logout(); 
        navigate('/login'); 
      } else {
        setError(response.data.message || 'Failed to delete account');
      }
    } catch (error) {
      setError(error.message || 'Failed to delete account');
    }
  };
  

  const handleUpdateProfile = () => {
    navigate('/update-profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  
  if (isLoading) {
    return <p>Loading user profile...</p>;
  }

  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      {user ? (
        <div className="profile-details">
          {user.profilePicture && (
            <div className="profile-picture">
              <img src={user.profilePicture} alt="Profile" />
            </div>
          )}
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Landmark:</strong> {user.landmark}</p>
          <p><strong>Pincode:</strong> {user.pincode}</p>
          <p><strong>Phone Number:</strong> {user.phoneNo}</p>
          
          <div className="profile-actions">
          
            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      ) : (
        <p>No user profile found.</p>
      )}
    </div>
  );
}

export default Profile;
// <button className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
//<Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>