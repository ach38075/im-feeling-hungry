import React, { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipePreview';
import ImgSrc from '../assets/react.svg'
import './css/Disk.css';

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



