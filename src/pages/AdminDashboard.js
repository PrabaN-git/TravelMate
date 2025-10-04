import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config";

function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    img: ""
  });

  // Fetch all places
  const fetchPlaces = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/places`);
      setPlaces(res.data);
    } catch (err) {
      console.error("Error fetching places:", err);
    }
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/bookings`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchBookings();
  }, []);

  // Open Add Place modal
  const handleAdd = () => {
    setCurrentPlace(null);
    setFormData({ name: "", desc: "", price: "", img: "" });
    setModalOpen(true);
  };

  // Open Edit Place modal
  const handleEdit = (place) => {
    setCurrentPlace(place);
    setFormData({
      name: place.name,
      desc: place.desc,
      price: place.price,
      img: place.img
    });
    setModalOpen(true);
  };

  // Delete Place
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/places/${id}`);
      fetchPlaces();
    } catch (err) {
      console.error("Error deleting place:", err);
    }
  };

  // Submit Add/Edit Place form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPlace) {
        // Editing existing place
        await axios.put(`${BASE_URL}/api/places/${currentPlace._id}`, formData);
      } else {
        // Adding new place
        await axios.post(`${BASE_URL}/api/places`, formData);
      }
      await fetchPlaces();
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving place:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <h2>Admin Dashboard</h2>

      {/* ---------- Manage Places ---------- */}
      <section>
        <h3>Manage Places</h3>
        <button className="btn add-btn" onClick={handleAdd}>Add New Place</button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.desc}</td>
                <td>{p.price}</td>
                <td><img src={p.img} alt={p.name} width="100" /></td>
                <td>
                  <button className="btn edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------- View Bookings ---------- */}
      <section>
        <h3>User Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Return Date</th>
              <th>Travelers</th>
              <th>Travel Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.fullName}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.departureLocation}</td>
                <td>{b.destination}</td>
                <td>{b.departureDate ? new Date(b.departureDate).toLocaleDateString() : "N/A"}</td>
                <td>{b.returnDate ? new Date(b.returnDate).toLocaleDateString() : "N/A"}</td>
                <td>{b.travelers}</td>
                <td>{b.travelMode}</td>
                <td>{b.status || "Completed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------- Modal for Add/Edit Place ---------- */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>{currentPlace ? "Edit Place" : "Add Place"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="btn save-btn">{currentPlace ? "Update" : "Add"}</button>
                <button type="button" className="btn cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
