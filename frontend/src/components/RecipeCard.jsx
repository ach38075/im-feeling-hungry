import React from "react";

const RecipeCard = ({ recipe, missing, onViewDetails }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            {missing.length > 0 && <p>Missing ingredients: {missing.join(", ")}</p>}
            
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