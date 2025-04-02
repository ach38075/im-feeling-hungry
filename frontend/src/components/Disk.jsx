import React, { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipePreview';
import ImgSrc from '../assets/react.svg'
import './css/Disk.css';

// TODO: before meeting
// - Add carousel functionallity
// - Add popup functionality : when you click on a card, it brings up the full recipe card on page in the center of the screen
//   very big, has its own scroll wheel if recipe is long, contents will eventually be integrated with the api calls

const initialCards = [
  {id: 1, title:"Egg Noodles", cardName:"card"},
  {id: 2, title:"Hamburger", cardName:"card"},
  {id: 3, title:"Dumplings with Pork", cardName:"card"},
  {id: 4, title:"Broiled Salmon", cardName:"card"},
  {id: 5, title:"Sashimi with Wasabi", cardName:"card"},
  {id: 6, title:"Okonomiyaki", cardName:"card"},
];

const Disk = () => {

  const [cards, setCards] = useState(initialCards);

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

    <div className="plate">
    <div className="middle">
     
    {cards.map((card) => {

      console.log(card.cardName);
      return(
        <RecipeCard className={`${card.cardName + card.id}`} title={`${card.title}`} key={`${card.id}`}/>
      );
    })} 
    
    
    <button className="left" onClick={leftShift}>Scroll Cards Left</button>
    <button className="right" onClick={rightShift}>Scroll Cards Right</button>
    </div>
    
    </div>
    
  );
  
};

export default Disk;



