import React from "react";
import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      quote: "TravelMate made my trip unforgettable! Everything was perfectly planned.",
      name: "Jemima Sushmi",
      role: "Travel Blogger",
      img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Amazing service! I felt safe and cared for throughout the journey.",
      name: "Srinithi",
      role: "Photographer",
      img: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "Best travel agency I’ve used. Great recommendations and smooth booking.",
      name: "Kanishka",
      role: "Entrepreneur",
      img: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      quote: "From start to finish, it was a wonderful experience. Highly recommend!",
      name: "Lebika",
      role: "Software Engineer",
      img: "https://randomuser.me/api/portraits/women/55.jpg"
    }
  ];

  return (
    <div className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {reviews.map((r, i) => (
          <div key={i} className="testimonial-card">
            <p className="testimonial-quote">“{r.quote}”</p>
            <div className="testimonial-profile">
              <img src={r.img} alt={r.name} />
              <div>
                <div className="testimonial-name">{r.name}</div>
                <div className="testimonial-role">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
