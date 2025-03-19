'use client';

import React from "react";
import './css/login.css'
import { useState } from "react";
import { Link } from "react-router-dom"


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token); // Store JWT token
      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className={"container"}>
        <form onSubmit={handleLogin}>
          <h1 className={"header"}>i'm feeling hungry...</h1>
            <h4>Welcome back!</h4>

            <div className={"inputBox"}>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                placeholder="Email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              <i className="bx bx-user"></i>
            </div>

            <div className={"inputBox"}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <div className={"forgotPassword"}>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className={"btn"}>
              Login
            </button>

            <p className={"registerLink"}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </form>
      </div>
    </div>
  );
};