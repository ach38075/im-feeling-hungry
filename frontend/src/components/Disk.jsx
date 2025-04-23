import React, { useState, useRef, useEffect } from 'react';
import './css/Disk.css';

const Disk = ({ cards }) => {

  const [rcards, setCards] = useState(cards);
  
  useEffect(() => {
    if (cards) {
      setCards(cards);
    }
  }, [cards]);

  const rightShift = () => {
    console.log("right shift");
    setCards((prevCards) => 
      prevCards.map((card) => {
      const currentId = card.props.id;
      const newId = currentId + 1 > 6 ? 1 : currentId + 1;
      const newName = 'recipe-card' + newId;

      return React.cloneElement(card, {
        ...card.props,
        id: newId,
        Name: newName,
      });
     })
    );
  }; 
  
  const leftShift = () => {
    console.log("left shift");
    setCards((prevCards) => 
      prevCards.map((card) => {

        const currentId = card.props.id;
        const newId = currentId - 1 < 1 ? 6 : card.props.id - 1;
        const newName = 'recipe-card' + newId;

        return React.cloneElement(card, {
          ...card.props,
          id: newId,
          Name: newName,
        })
      })
    );
  };   

  return (
    <div>
    <div className="plate">
    <div className="middle">
     

    {rcards?.map((card) => card)}
    
    
    </div> {/*"middle"*/}
      <button className="left" onClick={leftShift} style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}></button>
      <button className="right" onClick={rightShift} style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}></button>

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



