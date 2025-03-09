import React, { useState, useEffect } from "react";
import { getRecipeDetails } from "../api";

const RecipeDetails = ({ recipeId, onBack }) => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                setLoading(true);
                const data = await getRecipeDetails(recipeId);
                setRecipe(data);
            } catch (err) {
                setError("Failed to load recipe details. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [recipeId]);

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <div className="recipe-detail">
            <button className="back-button" onClick={onBack}>
                &larr; Back to recipes
            </button>
            
            <div className="recipe-header">
                <h2>{recipe.title}</h2>
                <div className="recipe-meta">
                    <span>Ready in {recipe.readyInMinutes} minutes</span>
                    <span>Serves {recipe.servings}</span>
                </div>
            </div>
            
            <div className="recipe-content">
                <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
                </div>
                
                <div className="recipe-ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>
                                {ing.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="recipe-instructions">
                    <h3>Instructions</h3>
                    {recipe.instructions.length > 0 ? (
                        <ol>
                            {recipe.instructions.map((step) => (
                                <li key={step.number}>
                                    {step.step}
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>
                            Visit the <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                                original recipe
                            </a> for detailed instructions.
                        </p>
                    )}
                </div>
            </div>
            
            <div className="recipe-footer">
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-link">
                    View Original Recipe
                </a>
            </div>
        </div>
    );
};

export default RecipeDetails;