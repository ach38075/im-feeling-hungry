import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { RefreshContext } from '../context/RefreshContext';
import './css/RecipeCard.css'

const RecipeCard = ({ recipe, onViewDetails, saveStatus, objectId, Name}) => {
    const [error, setError] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const { setRefresh } = useContext(RefreshContext);
    const [localObjectId, setLocalObjectId] = useState(objectId);

    useEffect(() => {
        setIsSaved(saveStatus);
        setLocalObjectId(objectId);
    }, [saveStatus, objectId]);

    const handleSaveRecipe = async (e) => {
        e.preventDefault();

        // Retrieve auth token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            setError("You must be logged in to save a recipe.");
            alert("Log in to save this recipe!");
            return;
        }

        try {
            if (isSaved) { // if recipe is saved, provide option to delete
                const response = await fetch(`http://localhost:8080/feed/recipe/${localObjectId}`, {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Include auth token
                    },
                  });
            
                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error(data.message || "Failed to delete recipe");
                  }
                  
                  console.log(data.message);   // DEBUGGING
                  setLocalObjectId(null);
                  setIsSaved(false);
                  setRefresh(prev => !prev);


            } else { // save recipe
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
                  
                  console.log(data);   // DEBUGGING
                  setLocalObjectId(data.newRecipe._id);
                  setIsSaved(true);
                  setRefresh(prev => !prev);

                  // alert("Saved recipe '" + recipe.title);
            }
        } catch (err) {
            setError(err.message);
            alert(err.message);
        }
      };

    return (
        <div className={`recipe-card ${Name}`}>
            
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
                    className={`save-recipe-button ${isSaved ? "saved" : ""}`}
                    onClick={handleSaveRecipe}
                    /*disabled={isSaved} // disable if saved*/
                >
                    {isSaved ? "Unsave" : "Save Recipe"} 
                </button>
                
            </div>
        </div>
        
    );
};

export default RecipeCard;