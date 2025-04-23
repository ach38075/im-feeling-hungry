/* all valid keys, must swap between when one runs out
   TODO: implement way to auto swap to another key when one is out */
export const API_KEY = "0eb27123386c42b19046163250ba48aa";
// export const API_KEY = "59b4fe15ba9b4fec86b5be4313200724";
// export const API_KEY = "336f05f01b06462b8b7cb4ec5172840f";
const API_URL = "https://api.spoonacular.com/recipes";

export const getRecipes = async (ingredients, filters) => {
  const ingredientList = ingredients.split(",").map((i) => i.trim()).join(",");
  const dietParam = filters.diet.length > 0 ? `&diet=${filters.diet.join(",")}` : "";
  const intoleranceParam = filters.intolerances.length > 0 ? `&intolerances=${filters.intolerances.join(",")}` : "";
  const cookTimeParam = filters.cookTime ? `&maxReadyTime=${filters.cookTime}` : "";
  const mealTypeParam = filters.mealType ? `&type=${filters.mealType}` : "";
  const cuisineParam = filters.cuisine ? `&cuisine=${filters.cuisine}` : "";

  // First attempt with full data
  let url = `${API_URL}/complexSearch?includeIngredients=${ingredientList}&number=6${cookTimeParam}${dietParam}${intoleranceParam}${mealTypeParam}${cuisineParam}&addRecipeInformation=true&apiKey=${API_KEY}`;
  console.log("🧪 First attempt URL:", url);

  let response = await fetch(url);
  let info = await response.json();
  console.log("✅ First response:", info);

  // Fallback if no results
  if (info.results.length === 0) {
    console.warn("⚠️ No results with full query. Retrying simplified fallback...");

    url = `${API_URL}/complexSearch?includeIngredients=${ingredientList}&number=12${cookTimeParam}${dietParam}${intoleranceParam}${mealTypeParam}${cuisineParam}&apiKey=${API_KEY}`;
    console.log("🧪 Fallback URL:", url);

    response = await fetch(url);
    info = await response.json();
    console.log("✅ Fallback response:", info);
  }

  const results = info.results.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    analyzedInstructions: recipe.analyzedInstructions,
    sourceUrl: `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`
  }));

  return { results };
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
