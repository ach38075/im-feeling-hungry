import { useState } from 'react'
import './index.css'
import './App.css'
import RecipeList from "./components/RecipeList";
import Filters from "./components/Filters";
import RecipePreview from "./components/RecipePreview";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [filters, setFilters] = useState({cookTime: "", appliances: "", diet: ""});
  const [recipes, setRecipes] = useState([])

  const handleButtonClick = () => {
    alert("generate recipe function not yet available");
  };

  return (

    /* this is temporary to show a prototype of the wesbite,
    these boxes and buttons are not actually tied to the Filters and
    RecipeCards yet, need to implement functionality */

    <div className="app-container">
      <h1>i'm feeling hungry...</h1>
       
      <div className="filters-row">
      <input
        type="text"
        placeholder="enter ingredients"
      />
      <select name = "appliances" multiple >
        <option value="default" selected>select appliances (ctrl+click) </option>
        <option value="">oven </option>
        <option value="">airfryer </option>
      </select>
      <select name = "diet" multiple >
        <option value="default" selected>select diet (ctrl+click) </option>
        <option value="">vegan </option>
        <option value="">dairy-free </option>
      </select>
      <input
        type="number"
        placeholder="max cook time (minutes)"
      />
       </div>
      <button onClick = {handleButtonClick}>generate recipes</button>

      <RecipePreview /> 

    </div>
  );
};

export default App;
