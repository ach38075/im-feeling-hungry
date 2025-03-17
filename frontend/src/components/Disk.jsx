import React, { useState, useRef } from "react";

const Disk = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [angle, setAngle] = useState(0);
    const startCoords = useRef({x: 0, y: 0});

const handleMouseDown = (e) => {
    setIsDragging(true);
    startCoords.current = { x: e.clientX, y: e.clientY};
    document.body.style.userSelect = 'none';
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e) => {
    if (!isDragging)  {
        return;
    }

    const diffX = e.clientX - startCoords.current.x;
    const diffY = e.clientY - startCoords.current.y;

    const newAngle = Math.atan2(diffY, diffX) * (180 / Math.PI);
    setAngle(newAngle);
};

const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'auto';
};

return (
    <div
      className="disk-container"
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        position: 'relative',
      }}
    >
      <div
        className="disk"
        style={{
          width: '500px',
          height: '200px',
          backgroundColor: '#3498db',
          borderRadius: '50%',
          cursor: 'pointer',
          transform: `rotate(${angle}deg)`,
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Disk;