import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine, RiShoppingCartFill, RiUserFill, RiHeartFill, RiMenu3Line } from 'react-icons/ri';
import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <nav>
        <div className='tn-container container'>
          <div className='left-section'>
            <Link to='/' className='tn-logo'>Milky Web</Link>
            <div className='search-box'>
              <input
                type='search'
                name='search'
                placeholder='Search for Milky products'
                value={searchQuery}
                onChange={onSearchChange}
              />
              <div className='search-icon'><RiSearchLine /></div>
            </div>
          </div>
          <div className='right-section'>
            <div className='tn-links'>
              <li className="navbar-item">
                <Link to="/register">Signup</Link>
              </li>
              <Link to="/login" className='btn'>Sign In</Link>
            </div>
            <div className='tn-icons'>
              <Link to='/cart'><RiShoppingCartFill /></Link>
              <Link to='/favorites'><RiHeartFill /></Link>
              <Link to='/profile'><RiUserFill /></Link>
              <div className='menu-toggle' onClick={toggleSidebar}>
                <RiMenu3Line />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className={`bn-container container ${isSidebarOpen ? 'open' : ''}`}>
          <ul className='navlist'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/deal'>Deal</Link></li>
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to='/shop'>Shop</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
