const API_KEY = "0eb27123386c42b19046163250ba48aa";
const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const getRecipes = async (ingredients, filters) => {
    const ingredientList = ingredients.split(",").map((i)=> i.trim()).join(",");
    const applianceList = filters.appliances.join(",");
    const dietList = filters.diet.join(",");
    const url = `${API_URL}?includeIngredients=${ingredientList}&number=3&maxReadyTime=${filters.cookTime}&diet=${dietList}&equipment=${applianceList}&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    const info = await response.json();
    
    const results = info.results.map(recipe => {
        const missing = recipe.missedIngredients ? recipe.missedIngredients.map(ing => ing.name) : [];
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            sourceUrl: `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`, missing
        };
    });
    const missingIngredients = results.reduce((acc, recipe) => {
        acc[recipe.id] = recipe.missing;
        return acc;
    }, {});
    return {results, missing: missingIngredients};
}