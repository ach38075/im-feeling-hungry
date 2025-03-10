import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, onViewDetails }) => {
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
};

export default RecipeList;