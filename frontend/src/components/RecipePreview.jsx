import React from "react";
import ImgSrc from '../assets/test1.jpg'
import './css/RecipePreview.css'

const handleShowRecipe = () => {
    alert("Show Full Recipe function not yet available");
};

const RecipePreview = ({title, className}) => {
    return (
        
        <div className={`card ${className}`}>
            {/* preview card of the recipe
            clickable, title, image, author, cook time, show recipe button */} 
            <img src={ImgSrc} width="200" height="200"/>
            
            <div className="info">
                <h2>{title}</h2>
                <h6>By: Default Author Name</h6>
                <hr />
                <h5>Cook Time: ~ h, ~ m</h5>
                <h5>Dietary Restrictions?: Default Value</h5>     
            </div>

            <button onClick={handleShowRecipe}>Show Full Recipe</button>
        </div>
    );
};

export default RecipePreview;