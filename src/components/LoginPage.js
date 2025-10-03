import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // only for user signup
  const navigate = useNavigate();

  const handleLoginSignup = (e) => {
    e.preventDefault();

    if (isAdmin) {
      // Admin login dummy check
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials");
      }
    } else {
      // User signup/login (simple dummy)
      if (email && password && name) {
        localStorage.setItem("user", JSON.stringify({ email, role: "user" }));
        navigate("/home");
      } else {
        alert("Enter your name, email and password for signup");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isAdmin ? "Admin Login" : "User Login "}</h2>

        <div className="toggle-buttons">
          <button onClick={() => setIsAdmin(false)} className={!isAdmin ? "active" : ""}>User</button>
          <button onClick={() => setIsAdmin(true)} className={isAdmin ? "active" : ""}>Admin</button>
        </div>

        <form onSubmit={handleLoginSignup}>
          {!isAdmin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">{isAdmin ? "Login as Admin" : "Login"}</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
