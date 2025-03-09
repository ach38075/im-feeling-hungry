import { useState } from 'react'
import './index.css'
import './App.css'
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Filters from "./components/Filters";
import { getRecipes } from "./api";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({
    cookTime: "90", 
    appliances: [],  // Default to empty array (no specific appliances)
    diet: []         
  });
  const [recipes, setRecipes] = useState([]);
  const [missingIngredients, setMissingIngredients] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearch = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const { results, missing } = await getRecipes(ingredients, filters);
      setRecipes(results);
      setMissingIngredients(missing);
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
      
      {!selectedRecipeId ? (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter ingredients (comma-separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Find Recipes"}
            </button>
          </div>
          
          <Filters filters={filters} setFilters={setFilters} />
          
          {error && <p className="error-message">{error}</p>}
          
          {loading ? (
            <p>Finding recipes for you...</p>
          ) : (
            <RecipeList 
              recipes={recipes} 
              missingIngredients={missingIngredients}
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

export default App;