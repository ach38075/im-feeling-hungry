import { useState } from 'react'
import '../index.css'
import '../App.css'
import RecipeList from "../components/RecipeList";
import RecipeDetails from "../components/RecipeDetails";
import Filters from "../components/Filters";
import { getRecipes } from "../api";
//import RecipePreview from "../api";
import Disk from "../components/Disk.jsx";
import Test from "../components/Test.jsx";

export function Home () {
    const [ingredients, setIngredients] = useState([
	{ name: "" },
	{ name: "" },
	{ name: "" },
	{ name: "" },
	{ name: "" }
    ]);

    const [hasSearchedRecipes, setHasSearchedRecipes] = useState(false);
    const [filters, setFilters] = useState({
      cookTime: "90", 
      diet: [],
      intolerances: [],
      mealType: "",
      cuisine: ""
    });
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const [showCards, setShowCards] = useState(false);

    const handleIntroText = () => {
	const allNamesEmpty = ingredients.every(ingredient => ingredient.name === "");
	if (!hasSearchedRecipes && recipes.length === 0 && allNamesEmpty) {
	    return (
		<p>
		    Plate empty. Enter some ingredients under <br />
		    'Grocery List' to start finding recipes!
		</p>
	    );
	}
	return null;
    };

    const handleAddIngredient = () => {
	setIngredients([...ingredients, { name: "", checked: false }]);
    };

    const handleIngredientChange = (index, value) => {
	const newIngredients = [...ingredients];
	newIngredients[index].name = value;
	setIngredients(newIngredients);
    };

    const handleRemoveIngredient = (index) => {
	const newIngredients = ingredients.filter((_, i) => i !== index);
	setIngredients(newIngredients);	
    };

    const validIngredients = ingredients
	  .filter(ingredient => ingredient.name.trim() !== "")
	  .map(ingredient => ingredient.name);

    const handleCookTimeChange = (e) => {
	const value = e.target.value;
	setFilters({...filters, cookTime: value === "" ? "" : Math.max(0, Number(value))});	
    };

    const handleMealTypeChange = (e) => {
	setFilters({ ...filters, mealType: e.target.value });
    };

    const handleCuisineChange = (e) => {
	setFilters({ ...filters, cuisine: e.target.value });
    };

    const handleSearch = async () => {
	setHasSearchedRecipes(true);

	if (validIngredients.length === 0) {
	  setError("Please enter at least one ingredient");
	  return;
	}

	try {
	  setLoading(true);
	  setError(null);

	  const { results } = await getRecipes(validIngredients.join(','), filters);
	  console.log("🐔 Raw results in home.jsx:", results);

	  setRecipes(results.slice(0, 6));
	  setSelectedRecipeId(null);

	  if (results.length === 0) {
		setError("No recipes found that match your filters. Try adjusting them.");
	  } else {
		setShowCards(true);
	  }

	} catch (err) {
	  setError("Error finding recipes. Please try again.");
	  console.error(err);
	} finally {
	  setLoading(false);
	}
    };

    const handleViewDetails = (recipeId) => {
      setSelectedRecipeId(recipeId);
    };

    const handleBackToList = () => {
      setSelectedRecipeId(null);
    };

    return (
    <div className="app-container">
	<h1>i'm feeling hungry...</h1>
	{handleIntroText()}

	  {!selectedRecipeId ? (
	  <>
	      <div className="layout">
	  	  <div className="left-col">
	  	      <div className="flex-container">
	  	  	  <h2>Grocery List</h2>
	  	  	  <p>Type in desired ingredients</p>
	  	  	  <hr className="solid" />
	  	  	  <div className="search-container">
	  	  	      {ingredients.map((ingredient, index) => (
	  	  	  	  <div key={index} className="ingredient-input">
	  	  	  	      <input
	  	  	  		  type="text"
	  	  	  		  placeholder="Enter Ingredient"
	  	  	  		  value={ingredient.name}
	  	  	  		  onChange={(e) => handleIngredientChange(index, e.target.value)}
	  	  	  	      /> 
	  	  	  	      <button
	  	  	  		  className="removeButton"
	  	  	  		  onClick={() => handleRemoveIngredient(index)}>&times;</button>
	  	  	  	  </div>
	  	  	      ))}
	  	  	      <button
	  	  	  	  className="addIngredientButton"
	  	  	  	  onClick={handleAddIngredient}>Add Ingredient</button>
	  	  	  </div> 
	  	      </div>
	  	      <div className="cook-time-container">
	  	  	  <label className="cookTime">Max Cook Time (minutes):</label>
	  	  	  <input
	  	  	      id="cookTime"
	  	  	      type="number"
	  	  	      placeholder="Max Cook Time"
	  	  	      min="0"
	  	  	      value={filters.cookTime === "" ? "" : filters.cookTime}
	  	  	      onChange={handleCookTimeChange}
	  	  	  />
	  	  </div>

	  	  <div className="meal-type-container">
	  	      <label className="cookTime">Meal Type:</label>
	  	      <select value={filters.mealType} onChange={handleMealTypeChange}>
	  		<option value="">-- Select --</option>
	  		<option value="main course">Main Course</option>
	  		<option value="side dish">Side Dish</option>
	  		<option value="dessert">Dessert</option>
	  		<option value="appetizer">Appetizer</option>
	  		<option value="salad">Salad</option> 
	  		<option value="breakfast">Breakfast</option>
	  		<option value="soup">Soup</option>
	  		<option value="snack">Snack</option>
	  	      </select>
	  	  </div>

	  	  <div className="cuisine-container">
	  	      <label className="cookTime">Cuisine:</label>
	  	      <select value={filters.cuisine} onChange={handleCuisineChange}>
	  		<option value="">-- Select --</option>
	  		<option value="american">American</option>
	  		<option value="british">British</option>
	  		<option value="caribbean">Caribbean</option>
	  		<option value="chinese">Chinese</option>
	  		<option value="french">French</option>
	  		<option value="greek">Greek</option>
	  		<option value="indian">Indian</option>
	  		<option value="italian">Italian</option>
	  		<option value="japanese">Japanese</option>
	  		<option value="mediterranean">Mediterranean</option>
	  		<option value="mexican">Mexican</option>
	  		<option value="middle eastern">Middle Eastern</option>
	  		<option value="southern">Southern</option>
	  		<option value="spanish">Spanish</option>
	  		<option value="thai">Thai</option>
	  		<option value="vietnamese">Vietnamese</option>
	  	      </select>
	  	  </div>
	  	  </div>

	  	  <div className="right-col">
	  	      <Filters filters={filters} setFilters={setFilters} />
	  	  </div>
	      </div>

	      <button className="searchButton" onClick={handleSearch} disabled={loading}>                    
                {loading ? "Searching..." : "Find Recipes"}                                 
            </button>   

            {error && <p className="error-message">{error}</p>}

            {loading ? (
	  <p>Finding recipes for you...</p>
            ) : (
	  <RecipeList 
	      recipes={recipes} 
	      onViewDetails={handleViewDetails}
	  />
            )}
        </>
      ) : (
          <RecipeDetails 
              recipeId={selectedRecipeId} 
              onBack={handleBackToList}
          />
      )}
	</div>
    );
}