import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";


const RecipeList = ({ recipes, onViewDetails, sendCards, layout = "card"}) => {
    const [objectIds, setObjectIds] = useState({}); // { recipeId: objectId }

    useEffect(() => {
        const fetchObjectIds = async () => {
            const token = localStorage.getItem("token");
            const ids = {};

            for (const recipe of recipes) {
                try {
                    const response = await fetch(`http://localhost:8080/feed/user-recipes/${recipe.id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    const data = await response.json();
                    if (response.ok) {
                        ids[recipe.id] = data.recipe._id;
                    } else {
                        ids[recipe.id] = null;
                        throw new Error(data.message || "Recipe not yet saved.");
                    }
                } catch (err) {
                    ids[recipe.id] = null;
                }
            }
            setObjectIds(ids);
        };
        fetchObjectIds();
    }, [recipes]);
    
    
    const [hasSentCards, setHasSentCards] = useState(false);
    useEffect(() => {
        if (!hasSentCards && sendCards && recipes.length > 0) {
            
            const cards = recipes.map((recipe, index) => {
                const id = (index + 1) * 2;
                
                return (
                <RecipeCard 
                        layout={layout}
                        id ={id}
                        Name={`recipe-card${id}`}
                        key={recipe.id} 
                        recipe={recipe} 
                        onViewDetails={onViewDetails}
                        saveStatus={objectIds[recipe.id] != null}   // if there's an objectId, this recipe has already been saved
                        objectId={objectIds[recipe.id] || null}     // if recipe has not been saved, set objectId to null
                />
                );
            });
            
            sendCards(cards);
            setHasSentCards(true);
        }
    }, [recipes, objectIds, sendCards, hasSentCards]);
    

    
    return (
        <div className="recipe-list">
            {/*
            {recipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onViewDetails={onViewDetails}
                    saveStatus={objectIds[recipe.id] != null}   // if there's an objectId, this recipe has already been saved
                    objectId={objectIds[recipe.id] || null}     // if recipe has not been saved, set objectId to null
                />
            ))}
                */}
        </div>
    );
    
    
};

export default RecipeList;