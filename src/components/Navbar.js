import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  return (
    <div>
      <header className="header" id="header">
        {/* Top Nav */}
        <div className="top_nav">
          <div className="container d-flex">
            <p>Order Online or Call Us: (012) 345-6789</p>
            <ul className="d-flex">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation">
          <div className="nav_center container d-flex">
            <Link to="/" className="logo">
              <h1>LOGO</h1>
            </Link>
            <ul className="nav_list d-flex">
              <li className="nav_item"><Link to="/home" className="nav_link">Home</Link></li>
              <li className="nav_item"><Link to="/shopItems" className="nav_link">Shop</Link></li>
              <li className="nav_item"><Link to="/about" className="nav_link">About</Link></li>
              <li className="nav_item"><Link to="/contact" className="nav_link">Contact</Link></li>
              <li className="icons d-flex">
                <Link to="/login" className="icon"><i className='bx bx-user'></i></Link>
                <div className="icon"><i className='bx bx-search'></i></div>
                <div className="icon"><i className='bx bx-heart'></i>
                  <span className="d-flex">0</span>
                </div>
                <Link to="/cart" className="icon">
                  <i className='bx bx-cart'></i>
                  <span className="d-flex">{cartCount}</span> {/* Display cart count */}
                </Link>
              </li>
            </ul>

            {/* Icons */}
            <div className="icons d-flex">
              <Link to="/userportal" className="icon"><i className='bx bx-user'></i></Link>
              <div className="icon"><i className='bx bx-search'></i></div>
              <div className="icon"><i className='bx bx-heart'></i>
                <span className="d-flex">0</span>
              </div>
              <Link to="/cart" className="icon">
                <i className='bx bx-cart'></i>
                <span className="d-flex">{cartCount}</span> {/* Display cart count */}
              </Link>
            </div>

            {/* Hamburger */}
            <div className="hamburger">
              <i className='bx bx-menu-alt-right'></i>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
