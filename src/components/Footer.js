import React from 'react'

export default function Footer() {
  return (
    <div><footer className="footer">
    <div className="row">
      <div className="col d-flex">
        <h4>INFORMATION</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/">Terms</a>
        <a href="/">Shipping Guide</a>
      </div>

      <div className="col d-flex">
        <h4>USEFUL LINKS</h4>
        <a href="/">Online Store</a>
        <a href="/">Top Brands</a>
        <a href="/">Customer Services</a>
        <a href="/">Promotion</a>
      </div>

      <div className="col d-flex">
        <span><i className="bx bxl-facebook-square"></i></span>
        <span><i className="bx bxl-instagram-alt"></i></span>
        <span><i className="bx bxl-twitter"></i></span>
      </div>
    </div>
  </footer></div>
  )
}
