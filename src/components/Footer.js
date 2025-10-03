import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h3>Contact Us</h3>
          <p>📞 +1234567890</p>
          <p>📧 travelmate@gmail.com</p>
        </div>
        <div>
          <h3>TravelMate</h3>
          <p>Explore the world from your inbox. Let us inspire your next getaway!</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <p className="footer-bottom">© 2025 TravelMate. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
