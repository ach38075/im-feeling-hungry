'use client';

import React from "react";
import './css/login.css'
import { useState } from "react";
/*
import { doCredentialLogin } from "../api/auth";
import { signIn, signOut } from "@/auth";
*/
import { Link } from "react-router-dom"

/*
    interface SignupFormProps {
        onSignup: (email: string, username: string, password: string) => void;
    }
*/

export function Signup () {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  /*
      const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        // Send POST request to backend for registration
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

  
        // Redirect to login page
        router.push('/login');
        //router.push('/');
      } catch (err: any) {
        alert('Failed to register. Please try again.');
      }
};
  */

  return (
    <div>
        <div className={"container"}>
            <form onSubmit={null}> 
                {/* <form onSubmit={handleSignup}> */}
                <h1 className={"header"}>i'm feeling hungry...</h1>
                <h4>Sign up to save all of your favorite recipes!</h4>
                
                <div className={"inputBox"}>
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="username">Username</label>
                    <input 
                    id="username" 
                    type="text" 
                    placeholder="Enter a username" 
                    required 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="on"
                    />
                    <i className='bx bx-user'></i>
                </div>
                
                <div className={"inputBox"}>
                    <label htmlFor="password">Password</label>
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