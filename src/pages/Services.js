import React from "react";
import "./Services.css";

function Services() {
  const services = [
    { title: "Get Best Prices", desc: "Pay through our app and save thousands with amazing rewards." },
    { title: "Personalized Itineraries", desc: "Tailor-made travel plans just for you." },
    { title: "Flexible Payment", desc: "Enjoy flexible payment options and rewards on every booking." },
    { title: "Find The Best Near You", desc: "Discover hotels and destinations near you with one click." }
  ];

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((s, i) => (
          <div key={i} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
