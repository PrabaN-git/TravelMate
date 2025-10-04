import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Places.css";
import { BASE_URL } from "../config";

function Places() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/places`);
        console.log("Fetched places:", res.data);
        setPlaces(res.data);
      } catch (err) {
        console.error("Error fetching places:", err);
        setError("Failed to load places. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleBooking = (placeName) => {
    navigate(`/booking/${placeName}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading places...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>{error}</p>;
  }

  return (
    <div className="places-section" id="places">
      <h2>Places to Visit</h2>
      <div className="places-grid">
        {places.map((p) => (
          <div key={p._id} className="place-card">
            <img src={p.img} alt={p.name} className="place-img" />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="place-info">Price: {p.price}</div>
            <button className="book-btn" onClick={() => handleBooking(p.name)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;
