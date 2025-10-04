import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: loggedInUser?.username || "",
    email: loggedInUser?.email || "",
    phone: "",
    gender: "",
    age: "",
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    tripType: "one-way",
    travelers: 1,
    travelMode: "Flight",
    preferredTime: "",
    seatClass: "Economy",
    needHotel: false,
    checkIn: "",
    checkOut: "",
    roomType: "Single",
    rooms: 1,
    paymentMethod: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    billingAddress: "",
    travelInsurance: false,
    specialRequests: "",
    couponCode: "",
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("Please accept the terms & conditions");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        userId: loggedInUser?._id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        age: formData.age,
        departureLocation: formData.departure,
        destination: formData.destination,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        tripType: formData.tripType,
        travelers: formData.travelers,
        travelMode: formData.travelMode,
        preferredTime: formData.preferredTime,
        seatClass: formData.seatClass,
        hotelBooking: formData.needHotel,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        roomType: formData.roomType,
        numRooms: formData.rooms,
        paymentMethod: formData.paymentMethod,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiry,
        cvv: formData.cvv,
        billingAddress: formData.billingAddress,
        travelInsurance: formData.travelInsurance,
        specialRequests: formData.specialRequests,
        couponCode: formData.couponCode,
        termsAccepted: formData.termsAccepted
      });

      alert("Booking Successful!");
      navigate("/home#places"); // redirect to places section

      // Reset form except user info
      setFormData({
        ...formData,
        phone: "",
        gender: "",
        age: "",
        departure: "",
        destination: "",
        departureDate: "",
        returnDate: "",
        tripType: "one-way",
        travelers: 1,
        preferredTime: "",
        needHotel: false,
        checkIn: "",
        checkOut: "",
        roomType: "Single",
        rooms: 1,
        paymentMethod: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        billingAddress: "",
        travelInsurance: false,
        specialRequests: "",
        couponCode: "",
        termsAccepted: false
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      alert("Error booking trip");
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Your Trip</h2>
      <form onSubmit={handleSubmit}>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="form-step">
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          </div>
        )}

        {/* Step 2: Trip Details */}
        {step === 2 && (
          <div className="form-step">
            <input type="text" name="departure" placeholder="Departure Location" value={formData.departure} onChange={handleChange} required />
            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
            {formData.tripType === "round-trip" && <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />}
            
            <div>
              <label><input type="radio" name="tripType" value="one-way" checked={formData.tripType === "one-way"} onChange={handleChange} /> One-way</label>
              <label><input type="radio" name="tripType" value="round-trip" checked={formData.tripType === "round-trip"} onChange={handleChange} /> Round-trip</label>
            </div>

            <input type="number" name="travelers" placeholder="Number of Travelers" value={formData.travelers} onChange={handleChange} required />

            <select name="travelMode" value={formData.travelMode} onChange={handleChange}>
              <option>Flight</option>
              <option>Train</option>
              <option>Bus</option>
              <option>Cab</option>
            </select>

            <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
              <option value="">Preferred Time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>

            <select name="seatClass" value={formData.seatClass} onChange={handleChange}>
              <option>Economy</option>
              <option>Business</option>
              <option>Sleeper</option>
            </select>

            <label><input type="checkbox" name="needHotel" checked={formData.needHotel} onChange={handleChange} /> Need Hotel Booking?</label>
            {formData.needHotel && (
              <>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} />
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} />
                <select name="roomType" value={formData.roomType} onChange={handleChange}>
                  <option>Single</option>
                  <option>Double</option>
                  <option>Suite</option>
                </select>
                <input type="number" name="rooms" placeholder="Number of Rooms" value={formData.rooms} onChange={handleChange} />
              </>
            )}
          </div>
        )}

        {/* Step 3: Payment & Additional */}
        {step === 3 && (
          <div className="form-step">
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              <option value="">Select Payment Method</option>
              <option>Credit Card</option>
              <option>UPI</option>
              <option>Net Banking</option>
            </select>

            {formData.paymentMethod === "Credit Card" && (
              <>
                <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                <input type="month" name="expiry" value={formData.expiry} onChange={handleChange} required />
                <input type="number" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                <textarea name="billingAddress" placeholder="Billing Address" value={formData.billingAddress} onChange={handleChange} />
              </>
            )}

            <label><input type="checkbox" name="travelInsurance" checked={formData.travelInsurance} onChange={handleChange} /> Add Travel Insurance</label>
            <textarea name="specialRequests" placeholder="Special Requests" value={formData.specialRequests} onChange={handleChange} />
            <input type="text" name="couponCode" placeholder="Coupon Code" value={formData.couponCode} onChange={handleChange} />
            <label><input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required /> I agree to terms & conditions</label>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 && <button type="button" onClick={handleBack}>Back</button>}
          {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 3 && <button type="submit">Book Trip</button>}
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
