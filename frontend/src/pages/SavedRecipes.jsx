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

  const handleBackToList = () => {
    setSelectedRecipeId(null);
  };

  const storeSavedRecipes = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const savedRaw = localStorage.getItem('savedRecipes');
    console.log("SavedRecipes (raw):", savedRaw);   // DEBUGGING
    const saved = savedRaw && savedRaw !== "undefined" ? JSON.parse(savedRaw) : [];

    const storedRecipes = [];

    for (let i = 0; i < saved.length; i++) {
      try {
        const response = await fetch(`http://localhost:8080/feed/recipe/${saved[i]}`, {
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

        storedRecipes.push(data.recipe);
      } catch (err) {
          setError(err.message);
          alert(err.message);
      }
    }

    setRecipes(storedRecipes);
  };

  useEffect(() => {
    storeSavedRecipes();
  }, [refresh]); 


  return (
    <div className={"saved-container"}>
        <h1>i'm ready to eat...</h1>

        {!selectedRecipeId ? (
            <div className="recipes">
              {recipes && recipes.length > 0 ? (
                recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.recipeNum}
                    recipe={recipe}
                    onViewDetails={() => setSelectedRecipeId(recipe.recipeNum)}
                  />
                ))
              ) : (
                <h3 className="no-recipes">No recipes saved. Head to home to search for recipes!</h3>
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