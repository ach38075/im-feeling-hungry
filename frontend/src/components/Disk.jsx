import React, { useState, useRef, useEffect } from 'react';
import './css/Disk.css';


const Disk = ({ cards }) => {

  const rightShift = () => {

    setCards((prevCards) => 
      prevCards.map((card) => ({
        ...card, // Copy card properties
        id: card.id + 1 > 6 ? 1 : card.id + 1,
      }))
    );
  }; 
  
  const leftShift = () => {

    setCards((prevCards) => 
      prevCards.map((card) => ({
        ...card, // Copy card properties
        id: card.id - 1 < 1 ? 6 : card.id - 1,
      }))
    );
  };   

  return (
    <div>
    <div className="plate">
    <div className="middle">
     

    {cards?.map((card) => card)}
    
    <button className="left" onClick={leftShift}>Scroll Cards Left</button>
    <button className="right" onClick={rightShift}>Scroll Cards Right</button>
    </div> {/*"middle"*/}
    </div> {/*"plate"*/}

    {/*
    <div className="plate2">
    <div className="middle2"></div>
    </div>
    */}

    {/*unnamed*/}
    </div> 
    
    
  );
  
};

export default Disk;



