const API_KEY = "59b4fe15ba9b4fec86b5be4313200724";
const API_URL = "https://api.spoonacular.com/recipes";

export const getRecipes = async (ingredients, filters) => {
    const ingredientList = ingredients.split(",").map((i) => i.trim()).join(",");
    const applianceList = filters.appliances.join(",");
    const dietList = filters.diet.join(",");
    const url = `${API_URL}/complexSearch?includeIngredients=${ingredientList}&number=3&maxReadyTime=${filters.cookTime}&diet=${dietList}&equipment=${applianceList}&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    const info = await response.json();
    
    const results = info.results.map(recipe => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            sourceUrl: `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`
        };
    });
    
    return {results};
};

export const getRecipeDetails = async (recipeId) => {
    const url = `${API_URL}/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
        id: data.id,
        title: data.title,
        image: data.image,
        sourceUrl: data.sourceUrl,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        ingredients: data.extendedIngredients.map(ing => ({
            id: ing.id,
            name: ing.original,
            amount: ing.amount,
            unit: ing.unit
        })),
        instructions: data.analyzedInstructions.length > 0 
            ? data.analyzedInstructions[0].steps.map(step => ({
                number: step.number,
                step: step.step
            })) 
            : [],
        summary: data.summary
    };
};