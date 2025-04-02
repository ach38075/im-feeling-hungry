import React from "react";
import ImgSrc from '../assets/test1.jpg'
import './css/RecipePreview.css'

const handleShowRecipe = () => {
    alert("Show Full Recipe function not yet available");
};

const handleClick = () => {
        alert("Pop-Up Recipe Card function not yet available");
};

const RecipePreview = ({title, className}) => {
    return (
        
        <div className={`card ${className}`}>
            <div className="clickable" onClick={handleClick}>

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

            </div>

            <button onClick={(e) => {
                e.stopPropagation();
                handleShowRecipe();
            }}>
                Show Full Recipe
            </button>
        </div>
    );
};

export default RecipePreview;