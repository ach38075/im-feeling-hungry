import React, { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipePreview';
import ImgSrc from '../assets/react.svg'
import './css/Disk.css';

const Disk = () => {

  return (

    <div className="plate">
    <div className="middle">
     
     <div className="card1">
      <RecipeCard />
     </div>
     
     
      
    </div>
    </div>
  );
  
};

export default Disk;



