import React, { useState, useRef, useEffect } from 'react';

const RotatingCircle = () => {
  const [rotation, setRotation] = useState(0);  // The current rotation angle of the circle
  const [isDragging, setIsDragging] = useState(false);  // Whether the mouse is being dragged
  const [startAngle, setStartAngle] = useState(0);  // The initial angle when dragging starts
  const [startX, setStartX] = useState(0);  // The initial X position when dragging starts
  const [startY, setStartY] = useState(0);  // The initial Y position when dragging starts
  const centerRef = useRef(null);  // Reference to the center of the circle

  // Define a speed factor for rotation (a value less than 1 slows it down)
  const speedFactor = 0.05;

  // Function to calculate the angle between the mouse and the center of the circle
  const getAngle = (x, y) => {
    const rect = centerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);  // Convert radians to degrees
    return angle;
  };

  // Event handler for mouse down
  const handleMouseDown = (e) => {
    const initialAngle = getAngle(e.clientX, e.clientY);  // Get initial angle on mouse down
    setStartAngle(initialAngle);  // Set initial angle when dragging starts
    setStartX(e.clientX);  // Set initial X position when dragging starts
    setStartY(e.clientY);  // Set initial Y position when dragging starts
    setIsDragging(true);
  };

  // Event handler for mouse move
  const handleMouseMove = (e) => {
    if (isDragging) {
      const currentAngle = getAngle(e.clientX, e.clientY);  // Get the current angle as mouse moves

      // Calculate the difference in angles
      const angleDifference = currentAngle - startAngle;

      // Apply speed factor and update the rotation
      setRotation((prevRotation) => prevRotation + angleDifference * speedFactor);
      
      // Update start angle to prevent jumping when mouse moves quickly
      setStartAngle(currentAngle);
    }
  };

  // Event handler for mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Calculate the position of the small circle on the edge of the large circle
  const smallCircleRadius = 100; // The radius of the large circle (adjustable)
  const smallCircleX = smallCircleRadius * Math.cos((rotation * Math.PI) / 180); // X position
  const smallCircleY = smallCircleRadius * Math.sin((rotation * Math.PI) / 180); // Y position

  return (
    <div
      ref={centerRef}
      style={{
        width: '300px',
        height: '300px',
        position: 'relative',
        backgroundColor: '#f0f0f0',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          borderRadius: '50%',
          position: 'absolute',
          transformOrigin: 'center',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Small circle on the edge */}
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            position: 'absolute',
            top: `calc(50% - 10px)`, // To center the small circle vertically
            left: `calc(50% - 10px)`, // To center the small circle horizontally
            transform: `translate(${smallCircleX}px, ${smallCircleY}px)`, // Apply the rotation position
          }}
        ></div>
      </div>
    </div>
  );
};

export default RotatingCircle;