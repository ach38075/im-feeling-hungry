'use client';

import React, { useState, useContext } from "react";
import './css/savedRecipes.css'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { RefreshContext } from '../context/RefreshContext';
import RecipeCard from "../components/RecipeCard";
import RecipeDetails from "../components/RecipeDetails";


export function SavedRecipes() {
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { setRefresh } = useContext(RefreshContext);

  const handleBackToList = () => {
    setSelectedRecipeId(null);
  };

  /*
  const handleTemp = async (e) => {
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
      localStorage.setItem('username', data.name); // Store username
      setRefresh(prev => !prev);
      alert("Login successful!");
      setTimeout(() => navigate("/"), 100); // redirect to home page
    } catch (err) {
        setError(err.message);
        alert(err.message);
    }
  };
  */

  return (
    <div className={"saved-container"}>
        <h1>i'm ready to eat...</h1>
        <div className={"recipes"}>
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
          <RecipeCard 
              key={'73420'} 
              recipe={'example'} // recipe
              onViewDetails={null} // onViewDetails
          />
        </div>
        
    </div>
    );
};