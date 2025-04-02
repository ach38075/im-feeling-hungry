import { useState } from 'react'
import '../index.css'
import '../App.css'
import RecipeList from "../components/RecipeList";
import RecipeDetails from "../components/RecipeDetails";
import Filters from "../components/Filters";
import { getRecipes } from "../api";
//import RecipePreview from "../api";
import Disk from "../components/Disk";

export function Home () {
    const [ingredients, setIngredients] = useState([
	{ name: "", checked: false },
	{ name: "", checked: false },
	{ name: "", checked: false }
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
	handleIngredientCheck(index);
	const newIngredients = ingredients.filter((_, i) => i !== index);
	setIngredients(newIngredients);	
    };

    //handles ingredients checkbox toggle
    const handleIngredientCheck = (index) => {
	const newIngredients = [...ingredients];
	newIngredients[index].checked = !newIngredients[index].checked;
	setIngredients(newIngredients);
    };
    
    const handleSearch = async () => {
	setHasSearchedRecipes(true);
	const checkedIngredients = ingredients
	      .filter(ingredient => ingredient.checked && ingredient.name.trim() !== "")
	      .map(ingredient => ingredient.name); 

	if (checkedIngredients.length === 0) {
            setError("Please enter at least one ingredient");
            return;
	}
      
	try {
            setLoading(true);
            setError(null);
	    //use checkedIngredients or just ingredients?
            const { results } = await getRecipes(checkedIngredients.join(','), filters);
            setRecipes(results);
            setSelectedRecipeId(null); // Reset selected recipe when searching
        
            if (results.length === 0) {
		setError("No recipes found with these ingredients and filters. Try adjusting your search.");
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

      {!selectedRecipeId ? (
	  <>
	      <div className="flex-container">
		  <h2>Grocery List</h2>
		  <p>Type in desired ingredients</p>
		  <hr className="solid" />
		  <div className="search-container">
		      {ingredients.map((ingredient, index) => (
			  <div key={index} className="ingredient-input">
			      <label className="custom-checkbox">
				  <input
				      type="checkbox"
				      checked={ingredient.checked}
				      onChange={() => handleIngredientCheck(index)}
				  />
			      	  <span className="checkmark"></span>
			      </label>
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
		      <button onClick={handleAddIngredient}>Add Ingredient</button>
		      <button onClick={handleSearch} disabled={loading}>
			  {loading ? "Searching..." : "Find Recipes"}
		      </button>
		  </div>
              </div>
	      
              <Filters filters={filters} setFilters={setFilters} />
          
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
