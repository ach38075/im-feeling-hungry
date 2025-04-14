import React from "react";
import RecipeCard from "./RecipeCard";


const RecipeList = ({ recipes, onViewDetails }) => {
    
    const recipeCards = recipes.map((recipe, index) => (
        <RecipeCard
            id={index + 1}
            key={recipe.id}
            recipe={recipe}
            onViewDetails={onViewDetails}
            />
    ));
    
    return (
        <div className="recipe-list">
            {recipeCards}
        </div>
    );
};

export default RecipeList;