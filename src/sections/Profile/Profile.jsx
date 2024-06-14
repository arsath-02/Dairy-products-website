import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage after login
        if (!token) {
          navigate('/login'); // Redirect to login if token is not present
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
        // Handle error (e.g., redirect to login page or show an error message)
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
      </div>
      {user ? (
        <div className="profile-details">
          {user.profilePicture && (
            <div className="profile-picture">
              <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" />
            </div>
          )}
          <p><strong>First Name:</strong> {user.firstname}</p>
          <p><strong>Last Name:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Landmark:</strong> {user.landmark}</p>
          <p><strong>Pincode:</strong> {user.pincode}</p>
          <p><strong>Phone Number:</strong> {user.phoneNo}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;
