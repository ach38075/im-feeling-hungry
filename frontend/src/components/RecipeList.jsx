import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, missingIngredients, onViewDetails }) => {
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    missing={missingIngredients[recipe.id] || []} 
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};

export default RecipeList;