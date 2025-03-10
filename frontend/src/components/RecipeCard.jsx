import React from "react";

const RecipeCard = ({ recipe, onViewDetails }) => {
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
            </div>
        </div>
    );
};

export default RecipeCard;