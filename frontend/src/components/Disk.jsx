import React, { useState, useEffect } from 'react';
import './css/Disk.css';

/*hitting saved recipes button over and over shows the home page very briefly */
const Disk = ({ cards }) => {
  const [rcards, setCards] = useState(cards);
  const [shift1, setShift1] = useState(0);
  const [shift2, setShift2] = useState(0);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (cards) {
      setCards(cards);
    }
  }, [cards]);

  const rightShift = () => {
    if (disable) return;
    setDisable(true);

    console.log("right shift");
    setCards((prevCards) => 
      prevCards.map((card) => {
      const currentId = card.props.id;
      const newId = currentId + 1 > 13 ? 1 : currentId + 1;
      const newName = 'recipe-card' + newId;

      return React.cloneElement(card, {
        ...card.props,
        id: newId,
        Name: newName,
      });
     })
    );

    setShift1(1);
  }; 

  useEffect(() => {
    if (shift1 === 1) {
      // Delay to ensure re-render between stages
      const timer = setTimeout(() => {
        console.log("right shift - second increment");

        setCards((prevCards) =>
          prevCards.map((card) => {
            const currentId = card.props.id;
            const newId = currentId + 1 > 13 ? 2 : currentId + 1;
            const newName = 'recipe-card' + newId;

            return React.cloneElement(card, {
              ...card.props,
              id: newId,
              Name: newName,
            });
          })
        );

        setShift1(0); // Reset stage
        setDisable(false);
      }, 200);

      return () => clearTimeout(timer); 
    }
  }, [shift1]);

  const leftShift = () => {
    if (disable) return;
    setDisable(true);

    setCards((prevCards) => 
      prevCards.map((card) => {
      const currentId = card.props.id;
      const newId = currentId - 1 < 2 ? 13 : currentId - 1;
      const newName = 'recipe-card' + newId;

      return React.cloneElement(card, {
        ...card.props,
        id: newId,
        Name: newName,
      });
     })
    );

    setShift2(1);
  }; 

  useEffect(() => {
    if (shift2 === 1) {
      // Delay to ensure re-render between stages
      const timer = setTimeout(() => {
        console.log("right shift - second increment");

        setCards((prevCards) =>
          prevCards.map((card) => {
            const currentId = card.props.id;
            const newId = currentId - 1 < 2 ? 13 : currentId - 1;
            const newName = 'recipe-card' + newId;

            return React.cloneElement(card, {
              ...card.props,
              id: newId,
              Name: newName,
            });
          })
        );

        setShift2(0); // Reset stage
        setDisable(false);
      }, 200);

      return () => clearTimeout(timer); 
    }
  }, [shift2]);

  return (
    <div className="plate">
      <div className="middle">
  {rcards?.map((card) =>
    React.cloneElement(card, {
      ...card.props,
      layout: "disk", // ensures it's styled correctly
      className: `recipe-card ${card.props.Name}`,
    })
  )}
</div>


      <button 
        className="left" 
        onClick={leftShift} 
        style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}
        disabled={disable}
      ></button>
      <button 
        className="right" 
        onClick={rightShift} 
        style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}
        disabled={disable}
        ></button>

    </div> /*"plate"*/
  );
};

export default Disk;
