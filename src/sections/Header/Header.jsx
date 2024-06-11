import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/images4.png';
import CountUp from 'react-countup';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <section id="header">
      <div className="header-container container">
        <div className="header-left">
          <h1>Get best products from Milky Products</h1>
          <p>Get the products Now</p>
          <button className='btn' onClick={() => navigate('/shop')}>Shop Now</button>
          <div className="header-stats">
            <div className="stat-box">
              <span >
                <CountUp end={50} duration={10} />
                <p className="count-plus">+</p>
              </span>
              <h3>Products</h3>
            </div>
            <div className="stat-box">
              <span>
                <CountUp end={1500} duration={5} />
                <p className="count-plus">+</p>
              </span>
              <h3>Customers</h3>
            </div>
            <div className="stat-box">
              <span>
                <CountUp end={150} duration={5} />
                <p className="count-plus">+</p>
              </span>
              <h3>Outlets</h3>
            </div>
          </div>
        </div>   
        <div className="header-right">
          <img src={image1} alt="milk bottle" />
        </div> 
      </div>
    </section>
  );
}

export default Header;
