'use client';

import React from "react";
import './css/login.css'
import { useState } from "react";
/*
import { doCredentialLogin } from "../api/auth";
import { signIn, signOut } from "@/auth";
*/
import { Link } from "react-router-dom"



export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /*
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // Collect form data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
  
      
      try {
        const response = await doCredentialLogin(formData);
        if (response?.error) {
          setError(response.error.message); // Handle login error
        } else {
          // Redirect or update state for successful login
          router.push("/todo");
        }
      } catch (err: any) {
        alert("Invalid credentials. Please try again.")
      } 
        
  };
  */

  return (
    <div>
      <div className={"container"}>
        <form onSubmit={null}> 
          {/* <form onSubmit={handleLogin}> */}
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