import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <section id="home" className="home">
      <h1>
        Travel & Explore With <span>TravelMate</span>
      </h1>
      <p>
        Escape the ordinary and experience the world like never before.
      </p>

      <div className="booking-form">
        <div className="form-group">
          <label>Where you want to go</label>
          <input type="text" placeholder="Search your location" />
        </div>

        <div className="form-group">
          <label>Check in</label>
          <input type="date" />
        </div>

        <div className="form-group">
          <label>Check out</label>
          <input type="date" />
        </div>

        <button className="book-btn">BOOK NOW</button>
      </div>
    </section>
  );
};

export default Home;
