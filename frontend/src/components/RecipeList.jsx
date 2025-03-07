import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({recipes, missingIngredients}) => {
    return (
        <div>
            {recipes.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} missing={missingIngredients[recipe.id] || []} />
            ))}
        </div>
    );
};

export default RecipeList;