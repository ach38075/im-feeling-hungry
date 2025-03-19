'use client';

import React from "react";
import './css/login.css'
import { useState } from "react";
/*
import { doCredentialLogin } from "../api/auth";
import { signIn, signOut } from "@/auth";
*/
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export function Signup () {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch("http://localhost:8080/auth/signup", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Signup failed.");
        }

        alert("Signup successful!");
        setTimeout(() => navigate("/login"), 100); // redirect to login page

      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <div>
        <div className={"container"}>
            <form onSubmit={handleSignup}>
                <h1 className={"header"}>i'm feeling hungry...</h1>
                <h4>Sign up to save all of your favorite recipes!</h4>
                
                <div className={"inputBox"}>
                    <label for="email">Email</label>
                    <input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="on"
                    />
                    <i className='bx bx-user'></i>
                </div>

                <div className={"inputBox"}>
                    <label for="username">Username</label>
                    <input 
                    id="username" 
                    type="text" 
                    placeholder="Enter a username" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="on"
                    />
                    <i className='bx bx-user'></i>
                </div>
                
                <div className={"inputBox"}>
                    <label for="password">Password</label>
                    <input  
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                    />
                    <i className='bx bxs-lock-alt'></i>
                </div>

                <button type="submit" className={"btn"}>Register</button>

                <p className={"registerLink"}>
                    Already have an account?  <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    </div>
    
  );
};