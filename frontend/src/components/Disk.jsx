import React, { useState, useEffect } from 'react';
import './css/Disk.css';

const Disk = ({ cards }) => {
  const [rcards, setCards] = useState(cards);

  useEffect(() => {
    if (cards) {
      setCards(cards);
    }
  }, [cards]);

  const rightShift = () => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        const currentId = card.props.id;
        const newId = currentId + 1 > 6 ? 1 : currentId + 1;
        const newName = `recipe-card${newId}`;

        return React.cloneElement(card, {
          ...card.props,
          id: newId,
          Name: newName,
          layout: "disk", // Ensure layout stays consistent
          className: `${newName} recipe-card`,
        });
      })
    );
  };

  const leftShift = () => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        const currentId = card.props.id;
        const newId = currentId - 1 < 1 ? 6 : currentId - 1;
        const newName = `recipe-card${newId}`;

        return React.cloneElement(card, {
          ...card.props,
          id: newId,
          Name: newName,
          layout: "disk", // Ensure layout stays consistent
          className: `${newName} recipe-card`,
        });
      })
    );
  };

  return (
    <div className="plate">
      <div className="middle">
        {rcards?.map((card) =>
          React.cloneElement(card, {
            ...card.props,
            layout: "disk", // 🔁 always apply disk layout
            className: `recipe-card ${card.props.Name}`,
          })
        )}
      </div>

      <button
        className="left"
        onClick={leftShift}
        style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}
      />
      <button
        className="right"
        onClick={rightShift}
        style={{ visibility: rcards?.length > 0 ? 'visible' : 'hidden' }}
      />
    </div>
  );
};

export default Disk;
