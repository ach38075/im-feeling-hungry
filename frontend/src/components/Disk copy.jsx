import React, { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipePreview';
import ImgSrc from '../assets/react.svg'
//import './css/Disk.css';

const recipes = [
  { id: 1, title: "Carne Asada Burritos", time: "45 min", serves: 6, image: ImgSrc},
  { id: 2, title: "Penne Arrabiata", time: "45 min", serves: 4, image: ImgSrc},
  { id: 3, title: "Red Lentil Soup", time: "55 min", serves: 8, image: ImgSrc },
  { id: 4, title: "Spaghetti Carbonara", time: "35 min", serves: 2, image: ImgSrc },
  { id: 5, title: "Grilled Salmon", time: "30 min", serves: 3, image: ImgSrc },
  { id: 6, title: "Chicken Alfredo", time: "40 min", serves: 5, image: ImgSrc },
];

const RecipeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start centered

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? recipes.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === recipes.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 bg-pink-200">
      {/* Carousel Container */}
      <div className="flex justify-center items-center overflow-hidden relative">
        <div className="flex w-full justify-center items-center relative">
          {recipes.map((recipe, index) => {
            let position = index - activeIndex;
            if (position < -1) position += recipes.length; // Wrap around left
            if (position > 1) position -= recipes.length;  // Wrap around right

            const scale = position === 0 ? "scale-110" : "scale-90";
            const zIndex = position === 0 ? "z-10" : "z-0";
            const opacity = position === 0 ? "opacity-100" : "opacity-70";

            return (
              <div
                key={recipe.id} // Unique key
                className={`absolute transition-all duration-500 ease-in-out transform ${scale} ${zIndex} ${opacity}`}
                style={{ transform: `translateX(${position * 220}px)` }} // Adjust spacing
              >
                <div className="relative w-60 bg-white shadow-lg rounded-xl overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{recipe.title}</h3>
                    <p className="text-sm text-gray-500">
                      {recipe.time} ⏳ | Serves {recipe.serves}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeCarousel;