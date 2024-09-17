import React, { useState } from 'react';
import './Contact.css';

export const Contact = () => {
  const [pincode, setPincode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [nearbyUsers, setNearbyUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pincode') {
      setPincode(value);
    } else if (name === 'phoneNo') {
      setPhoneNo(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://milky-web.onrender.com/api/nearby-users?pincode=${pincode}&phoneNo=${phoneNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setNearbyUsers(result);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  return (
    <section id="contact">
      <div className="contact-container">
        <h2>Contact User</h2>
        <p>If you have any questions, feel free to reach out to us!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pincode">Enter Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNo">Enter Phone Number</label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={phoneNo}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Find Nearby Users</button>
        </form>
        {nearbyUsers.length > 0 && (
          <div className="nearby-users">
            <h3>Nearby Users</h3>
            <ul>
              {nearbyUsers.map((user) => (
                <li key={user._id}>
                  {user.firstname} {user.lastname} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
