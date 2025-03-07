import { useState } from 'react'
import './index.css'
import './App.css'
import RecipeList from "./components/RecipeList";
import Filters from "./components/Filters";
import { getRecipes } from "./api";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({cookTime: "", appliances: "", diet: ""});
  const [recipes, setRecipes] = useState([])
  const [missingIngredients, setMissingIngredients] = useState({});

  const handleSearch = async () => {
    const { results, missing } = await getRecipes(ingredients, filters);
    setRecipes(results);
    setMissingIngredients(missing);
  };

  return (
    <div className="app-container">
       <h1>i'm feeling hungry...</h1>
       <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <Filters filters={filters} setFilters={setFilters} />
      <button onClick={handleSearch}>Find Recipes</button>
      <RecipeList recipes={recipes} missingIngredients={missingIngredients} />
    </div>
  );
};

export default App;
