import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { RefreshContext } from '../context/RefreshContext';
import './css/RecipeCard.css';

const RecipeCard = ({ recipe, onViewDetails, saveStatus, objectId, Name, layout }) => {
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
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to save a recipe.");
      alert("Log in to save this recipe!");
      return;
    }

    try {
      if (isSaved) {
        const response = await fetch(`http://localhost:8080/feed/recipe/${localObjectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to delete recipe");

        setLocalObjectId(null);
        setIsSaved(false);
        setRefresh(prev => !prev);

      } else {
        const response = await fetch("http://localhost:8080/feed/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            recipeNum: recipe.id,
            title: recipe.title,
            image: recipe.image,
            sourceUrl: recipe.sourceUrl
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to save recipe");

        setLocalObjectId(data.newRecipe._id);
        setIsSaved(true);
        setRefresh(prev => !prev);
      }
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  const layoutClass = layout === "disk" ? Name : "card-layout";
/*<div className={`recipe-card ${layoutClass}`}>*/
/*<div className={`recipe-card ${Name}`}>*/

  return (
    <div className={`recipe-card ${layoutClass}`}>
    
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="recipe-card-actions">
        <button className="view-details-button" onClick={() => onViewDetails(recipe.id)}>
          View Recipe Details
        </button>
        <button
          className={`save-recipe-button ${isSaved ? "saved" : ""}`}
          onClick={handleSaveRecipe}
        >
          {isSaved ? "Unsave" : "Save Recipe"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
