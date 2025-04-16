import React from "react";

const Filters = ({ filters, setFilters }) => {
  const dietOptions = [
    "Vegetarian",
    "Vegan",
    "Pescetarian",
    "Gluten-Free",
    "Dairy-Free",
    "High Protein"
  ];

  const intoleranceOptions = [
    "Dairy",
    "Egg",
    "Gluten",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat"
  ];

  const mealTypes = [
    "Main Course",
    "Side Dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Snack"
  ];

  const cuisines = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Chinese",
    "French",
    "Greek",
    "Indian",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese"
  ];

  const handleDietChange = (diet) => {
    const updatedDiet = filters.diet.includes(diet)
      ? filters.diet.filter((item) => item !== diet)
      : [...filters.diet, diet];
    setFilters({ ...filters, diet: updatedDiet });
  };

  const handleIntoleranceChange = (intolerance) => {
    const updatedIntolerances = filters.intolerances.includes(intolerance)
      ? filters.intolerances.filter((item) => item !== intolerance)
      : [...filters.intolerances, intolerance];
    setFilters({ ...filters, intolerances: updatedIntolerances });
  };

  const handleMealTypeChange = (e) => {
    setFilters({ ...filters, mealType: e.target.value });
  };

  const handleCuisineChange = (e) => {
    setFilters({ ...filters, cuisine: e.target.value });
  };

  return (
    <div className="filters-container">
      <div className="dietary-container">
  <label>Dietary Restrictions:</label>
  <p>Select all that apply</p>
  <hr className="solid" />
  <div className="checkbox-group">
    {dietOptions.map((diet, index) => (
      <div key={index} className="checkbox-item">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filters.diet.includes(diet)}
            onChange={() => handleDietChange(diet)}
          />
          <span className="checkmark"></span>
          <span className="dietName">{diet}</span>
        </label>
      </div>
    ))}
  </div>
</div>

<div className="allergy-container">
  <label>Allergies (Intolerances):</label>
  <p>Select all that apply</p>
  <hr className="solid" />
  <div className="checkbox-group">
    {intoleranceOptions.map((item, index) => (
      <div key={index} className="checkbox-item">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filters.intolerances.includes(item)}
            onChange={() => handleIntoleranceChange(item)}
          />
          <span className="checkmark"></span>
          <span className="dietName">{item}</span>
        </label>
      </div>
    ))}
  </div>
</div>


      
    </div>
  );
};

export default Filters;