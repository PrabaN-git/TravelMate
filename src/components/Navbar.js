import React from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">TravelMate</div>
      <div className="nav-center">
        <Link to="home" smooth={true} duration={500} offset={-70}>Home</Link>
        <Link to="places" smooth={true} duration={500} offset={-70}>Places</Link>
        <Link to="services" smooth={true} duration={500} offset={-70}>Services</Link>
        <Link to="testimonials" smooth={true} duration={500} offset={-70}>Testimonials</Link>
      </div>
      <div className="nav-right">
        <button className="btn login">Profile</button>
      </div>
    </nav>
  );
};

export default Navbar;
