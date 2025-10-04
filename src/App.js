import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Places from "./pages/Places";
import Testimonials from "./pages/Testimonials";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage"; // ✅ new page

// Protected route wrapper
const ProtectedRoute = ({ children, role }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser) return <Navigate to="/login" />;
  if (role && loggedInUser.role !== role) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />

      {/* User homepage */}
      <Route
        path="/home"
        element={
          <ProtectedRoute role="user">
            <>
              <Navbar />
              <div id="home"><Home /></div>
              <div id="services"><Services /></div>
              <div id="places"><Places /></div>
              <div id="testimonials"><Testimonials /></div>
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      {/* Booking page */}
      <Route
        path="/booking/:placeName"
        element={
          <ProtectedRoute role="user">
            <BookingPage />
          </ProtectedRoute>
        }
      />

      {/* Admin dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
