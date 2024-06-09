import React, { useState } from 'react';
import './Navbar.css';

import { RiSearchLine, RiShoppingCartFill, RiUserFill, RiHeartFill, RiMenu3Line } from 'react-icons/ri';

export const Navbar = ({ toggleCartVisibility, handleSearch }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Pass the search query to the parent component
  };

  return (
    <header>
      <nav>
        <div className='tn-container container'>
          <a href='#' className='tn-logo'>Milky Web</a>
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
          <div className='tn-links'>
            <button className='btn'>Sign Up</button>
            <button className='btn'>Sign In</button>
          </div>
          <div className='tn-icons'>
            <a href='#' onClick={toggleCartVisibility}><RiShoppingCartFill /></a>
            <a href='#'><RiHeartFill /></a>
            <a href='#'><RiUserFill /></a>
            <div className='menu-toggle' onClick={toggleSidebar}>
              <RiMenu3Line />
            </div>
          </div>
        </div>
        <hr />
        <div className={`bn-container container ${isSidebarOpen ? 'open' : ''}`}>
          <ul className='navlist'>
            <li><a href='#home'>Home</a></li>
            <li><a href='/Categories'>Categories</a></li>
            <li><a href='#shop'>Shop</a></li>
            <li><a href='#products'>Products</a></li>
            <li><a href='#deal'>Deal</a></li>
            <li><a href='#contact'>Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
