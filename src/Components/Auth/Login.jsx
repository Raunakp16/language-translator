import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      
      // If login successful:
      alert("Login successful!");
      localStorage.setItem("token", res.data.token); // optional
      navigate("/home"); // redirect to home page

    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials!");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="register">
          <label>Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label>Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn" type="submit">Login</button>
        </div>
        <p>
          Don’t have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
