import React, { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipePreview';
import ImgSrc from '../assets/react.svg'
import './css/Disk.css';

// TODO: before meeting
// - Add carousel functionallity
// - Add popup functionality : when you click on a card, it brings up the full recipe card on page in the center of the screen
//   very big, has its own scroll wheel if recipe is long, contents will eventually be integrated with the api calls


const Disk = () => {

  return (

    <div className="plate">
    <div className="middle">
     
    <RecipeCard className="card1"/>
    <RecipeCard className="card2" />
    <RecipeCard className="card3" />
    <RecipeCard className="card4" />
    <RecipeCard className="card5" />
    <RecipeCard className="card6" />
      
    </div>
    </div>
  );
  
};

export default Disk;



