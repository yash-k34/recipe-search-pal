// Spoonacular API key - in a real application, this would be in an environment variable
const API_KEY = '1';
const BASE_URL = 'https://api.spoonacular.com';

// Fallback data in case API calls fail or for development
const FALLBACK_RECIPES = [
  {
    id: 716429,
    title: "Pasta",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    readyInMinutes: 45,
    servings: 2,
    summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with 636 calories, 21g of protein, and 20g of fat each.",
  },
  {
    id: 715538,
    title: "Bruschetta Style Pork & Pasta",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    readyInMinutes: 35,
    servings: 4,
    summary: "What to make for dinner tonight?? Bruschetta Style Pork & Pasta might be a good recipe to expand your main course recipe box. This recipe makes 4 servings with 693 calories, 47g of protein, and 33g of fat each.",
  },
  {
    id: 716429,
    title: "Simple Macaroni and Cheese vegetarian",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
    readyInMinutes: 45,
    servings: 2,
    summary: "Simple Macaroni and Cheese is a delicious and traditional dish that combines elbow macaroni with a rich and creamy cheese sauce.",
  },
  {
    id: 663559,
    title: "Tomato and Basil Pasta",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
    readyInMinutes: 35,
    servings: 4,
    summary: "Tomato and Basil Pasta is a simple Italian dish featuring fresh tomatoes, aromatic basil, and al dente pasta for a light and flavorful meal.",
  },
  {
    id: 640819,
    title: "Crispy Salmon with Creamed Spinach",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1963&q=80", 
    readyInMinutes: 30,
    servings: 2,
    summary: "Crispy Salmon with Creamed Spinach pairs perfectly seared salmon fillets with rich, creamy spinach for a delicious and nutritious dinner option.",
  },
  {
    id: 1697583,
    title: "Roasted Vegetable Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    readyInMinutes: 40,
    servings: 4,
    summary: "This Roasted Vegetable Quinoa Bowl combines protein-rich quinoa with seasonal roasted vegetables and a tangy dressing for a wholesome meal.",
  },
  {
    id: 638038,
    title: "Chicken Enchilada Casserole",
    image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    readyInMinutes: 55,
    servings: 6,
    summary: "Chicken Enchilada Casserole is a family-friendly dish featuring layers of tortillas, seasoned chicken, beans, and cheese baked to perfection.",
  },
  {
    id: 659681,
    title: "quick dinner",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    readyInMinutes: 25,
    servings: 2,
    summary: "Sage Browned Butter Pasta combines the nutty flavor of browned butter with aromatic sage for a simple yet sophisticated pasta dish.",
  },
  {
    id: 123456,
    title: "Chocolate Lava Cake dessert",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    readyInMinutes: 30,
    servings: 4,
    summary: "Chocolate Lava Cake is a rich and decadent dessert with a gooey chocolate center, perfect for satisfying your sweet tooth.",
  }
];

const FALLBACK_RECIPE_DETAILS = {
  id: 716429,
  title: "Pasta",
  image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
  readyInMinutes: 45,
  servings: 2,
  summary: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for. This recipe makes 2 servings with 636 calories, 21g of protein, and 20g of fat each.",
  instructions: "Bring a large pot of salted water to a boil. Add pasta and cook according to package directions. Drain, reserving 1/2 cup of the pasta cooking water. Meanwhile, heat oil in a large skillet over medium heat. Add scallions and garlic and cook until soft and fragrant, about 2 minutes. Add cauliflower, salt, and pepper and cook until cauliflower begins to soften, about 5 minutes. Add breadcrumbs and cook until lightly toasted, about 3 minutes. Add pasta and reserved cooking water to the skillet and toss to combine. Serve hot.",
  extendedIngredients: [
    { id: 11677, original: "2 medium scallions, thinly sliced" },
    { id: 11215, original: "2 cloves garlic, minced" },
    { id: 11135, original: "1 head cauliflower, cut into small florets" },
    { id: 1002047, original: "1 teaspoon salt" },
    { id: 1002030, original: "1/2 teaspoon black pepper" },
    { id: 18079, original: "1/3 cup breadcrumbs" },
    { id: 20420, original: "8 ounces pasta" },
    { id: 4053, original: "2 tablespoons olive oil" }
  ],
  nutrition: {
    nutrients: [
      { name: "Calories", amount: 636, unit: "kcal" },
      { name: "Fat", amount: 20, unit: "g" },
      { name: "Carbohydrates", amount: 93, unit: "g" },
      { name: "Protein", amount: 21, unit: "g" },
      { name: "Sodium", amount: 1051, unit: "mg" }
    ]
  }
};

// Search recipes
export const searchRecipes = async (query, page = 1, resultsPerPage = 8) => {
  try {
    const offset = (page - 1) * resultsPerPage;

    // If query is empty, return all fallback data paginated
    if (!query.trim()) {
      return {
        results: FALLBACK_RECIPES.slice(offset, offset + resultsPerPage),
        totalResults: FALLBACK_RECIPES.length,
        offset,
        number: resultsPerPage,
      };
    }

    const response = await fetch(
      `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${resultsPerPage}&offset=${offset}&addRecipeInformation=true`
    );
    
    if (!response.ok) {
      console.error('API request failed:', response.status);

      // Filter fallback data based on the query
      const filteredResults = FALLBACK_RECIPES.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );

      return {
        results: filteredResults.slice(offset, offset + resultsPerPage),
        totalResults: filteredResults.length,
        offset,
        number: resultsPerPage,
      };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);

    // Filter fallback data based on the query
    const filteredResults = FALLBACK_RECIPES.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filteredResults.slice(0, resultsPerPage),
      totalResults: filteredResults.length,
      offset: 0,
      number: resultsPerPage,
    };
  }
};

// Get recipe details
export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`
    );
    
    if (!response.ok) {
      console.error('API request failed:', response.status);
      // Return fallback data
      return FALLBACK_RECIPE_DETAILS;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return FALLBACK_RECIPE_DETAILS;
  }
};
