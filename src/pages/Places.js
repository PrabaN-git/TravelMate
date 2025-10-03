import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Places.css";

function Places() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/places")
      .then(res => setPlaces(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="places-section" id="places">
      <h2>Places to visit</h2>
      <div className="places-grid">
        {places.map(p => (
          <div key={p._id} className="place-card">
            <img src={p.img} alt={p.name} className="place-img" />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="place-info">{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Places;
