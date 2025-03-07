import React from "react";

const RecipeCard = ({recipe,missing}) => {
    return (
        <div className="recipe-card">
            <h2> {recipe.title} </h2>
            <img src={recipe.image} alt={recipe.title} />
            {missing.length > 0 && <p>Missing ingredients: {missing.join(", ")}</p>}
            <a href={recipe.sourceURL} target="_blank" rel="noopner noreferrer">View Recipe</a>
        </div>
    );
};

export default RecipeCard;