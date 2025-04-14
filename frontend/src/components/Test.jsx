import React, { useState, useEffect } from 'react';

const ParabolaCard = () => {
  const [position, setPosition] = useState({ x: 500, y: 300 }); // Starting point
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (!startAnimation) return;

    let frame = 0;
    const totalFrames = 120;
    const xStart = 500;
    const xEnd = 100;

    const a = 0.01; // Adjust for curvature
    const h = 300;  // Vertex x
    const k = 100;  // Vertex y

    const animate = () => {
      const progress = frame / totalFrames;
      const x = xStart - progress * (xStart - xEnd); // move left
      const y = a * Math.pow(x - h, 2) + k;          // parabolic y
      setPosition({ x, y });

      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startAnimation]);

  return (
    <div>
      <button onClick={() => setStartAnimation(true)}>Start</button>
      <div
        style={{
          position: 'absolute',
          width: 100,
          height: 150,
          backgroundColor: 'lightblue',
          borderRadius: 10,
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        🐦 Card
      </div>
    </div>
  );
};

export default ParabolaCard;