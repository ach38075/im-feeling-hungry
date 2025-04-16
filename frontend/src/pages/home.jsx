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
	{ name: ""},
	{ name: ""},
	{ name: ""},
	{ name: ""},
	{ name: ""}
    ]);
    const [hasSearchedRecipes, setHasSearchedRecipes] = useState(false);
    const [filters, setFilters] = useState({
      cookTime: "90", 
      appliances: [],  // Default to empty array (no specific appliances)
      diet: []         
    });
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    //intro text upon open
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

    //add new ingredient input box
    const handleAddIngredient = () => {
	setIngredients([...ingredients, { name: "", checked: false }]);
    };

    //adds new ingredient to ingredient list
    const handleIngredientChange = (index, value) => {
	const newIngredients = [...ingredients];
	newIngredients[index].name = value;
	setIngredients(newIngredients);
    };

    //remove ingredient from ingredient list
    const handleRemoveIngredient = (index) => {
	const newIngredients = ingredients.filter((_, i) => i !== index);
	setIngredients(newIngredients);	
    };

    const validIngredients = ingredients
	  .filter(ingredient => ingredient.name.trim() != "")
	  .map(ingredient => ingredient.name);

    const handleCookTimeChange = (e) => {
	const value = e.target.value;
	setFilters({...filters, cookTime: value == "" ? "" : Math.max(0, Number(value))});	
    };

	// Plate recipe cards
	const [recipeCards, setRecipeCards] = useState([]); //might be able to get rid of this?
	const [showCards, setShowCards] = useState(false);
	const handleReceiveCards = (cards) => {
		setRecipeCards(cards);
		setShowCards(true);
	};

	//handles Find Recipes button toggle
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
            setRecipes(results);
            setSelectedRecipeId(null); // Reset selected recipe when searching
        
			console.log(results.length);

            if (results.length === 0) {
		setError("No recipes found with these ingredients and filters. Try adjusting your search.");
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
	
      {/*<Disk />*/}
	  {/*<Test />*/}
	  {/*<Disk {...(showCards ? { cards: recipeCards } : {})} />*/}
	  

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
			      value={filters.cookTime == "" ? "" : filters.cookTime}
			      onChange={handleCookTimeChange}
			  />
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
			  sendCards={handleReceiveCards}
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
