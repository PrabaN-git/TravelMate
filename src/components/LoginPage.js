import React, { useState } from "react";
import "./LoginPage.css";
import { BASE_URL } from "../config";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
  ? `${BASE_URL}/api/auth/signup`
  : `${BASE_URL}/api/auth/login`;
    const payload = isSignup
      ? { username: formData.username, email: formData.email, password: formData.password, role }
      : { username: formData.username, password: formData.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (isSignup) {
        alert("Signup successful! You can now login.");
        setIsSignup(false);
      } else {
        alert(`Login successful! Welcome ${data.username}`);

        // Store user info in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            role: data.role,
            token: data.token
          })
        );

        // Redirect based on role
        window.location.href = data.role === "admin" ? "/admin/dashboard" : "/home";
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {isSignup && (
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login here" : " Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
