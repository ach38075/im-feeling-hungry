import React, { useContext } from "react";
import { useState } from "react";
import { RefreshContext } from '../context/RefreshContext';

const RecipeCard = ({ recipe, onViewDetails}) => {
    const [error, setError] = useState("");
    const { setRefresh } = useContext(RefreshContext);

    const handleSaveRecipe = async (e) => {
        e.preventDefault();

        // Retrieve auth token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to save a recipe.");
            alert("You must be logged in to save a recipe.");
            return;
        }
    
        try {
          const response = await fetch("http://localhost:8080/feed/recipe", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // Include auth token
            },
            body: JSON.stringify({ 
                recipeNum: recipe.id, 
                title: recipe.title, 
                image: recipe.image, 
                sourceUrl: recipe.sourceUrl
            }),
          });
    
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to save recipe");
          }

          setRefresh(prev => !prev);
          
          alert("Saved recipe '" + recipe.title);
        } catch (err) {
            setError(err.message);
            alert(err.message);
        }
      };

    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            
            <div className="recipe-card-actions">
                <button 
                    className="view-details-button" 
                    onClick={() => onViewDetails(recipe.id)}
                >
                    View Recipe Details
                </button>
                <button 
                    className="save-recipe-button" 
                    onClick={handleSaveRecipe}
                >
                    Save Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;