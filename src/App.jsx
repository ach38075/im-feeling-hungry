import { useState } from 'react'
import './index.css'
import './App.css'
import RecipeList from "./RecipeList";
import Filters from "./Filters";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({cookTime: "", appliances: "", diet: ""});
  const [recipes, setRecipes] = useState([])

  return (
    <div> 
      <h1>i'm feeling hungry...</h1>
      <input>
        type="text"
        placeholder="Enter ingredients"
      </input>
    </div>
  );
};

export default App;
