'use client';

import React, { useState, useContext, useEffect } from "react";
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
  const [recipes, setRecipes] = useState([]);
  const { refresh } = useContext(RefreshContext);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackToList = () => {
    setSelectedRecipeId(null);
  };

  useEffect(() => {
  const storeSavedRecipes = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const storedRecipes = [];

    try {
      const response = await fetch("http://localhost:8080/feed/user-recipes", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Recipe retrieval failed.");
      }

      setRecipes(data.recipes);
      setLoading(false);

    } catch (err) {
        setError(err.message);
        alert(err.message);
    }

    //setRecipes(storedRecipes);
  };

    storeSavedRecipes();
  }, [refresh]); 


  return (
    <div className={"saved-container"}>
        <h1>i'm ready to eat...</h1>

        {!selectedRecipeId ? (
            <div className="recipes">
              {loading ? (
                <h3 className="no-recipes">Loading saved recipes...</h3>
              ) : recipes.length === 0 ? (
                <h3 className="no-recipes">No recipes saved. Head to home to search for recipes!</h3>
              ) : (
                recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.recipeNum}
                    recipe={recipe}
                    onViewDetails={() => setSelectedRecipeId(recipe.recipeNum)}
                  />
                ))
              )}
            </div>
        ) : (
          <RecipeDetails 
              recipeId={selectedRecipeId} 
              onBack={handleBackToList}
          />
        )}

    </div>

    );

};