
// Utility functions for managing favorite recipes using localStorage

const FAVORITES_KEY = 'recipe-favorites';

// Get all favorite recipes
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error retrieving favorites:', error);
    return [];
  }
};

// Check if a recipe is favorited
export const isFavorite = (recipeId) => {
  const favorites = getFavorites();
  return favorites.some(favorite => favorite.id === recipeId);
};

// Add a recipe to favorites
export const addFavorite = (recipe) => {
  try {
    const favorites = getFavorites();
    
    // Check if already in favorites
    if (!favorites.some(favorite => favorite.id === recipe.id)) {
      // Add only essential information to save space
      const simplifiedRecipe = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary,
      };
      
      // Save updated favorites list
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, simplifiedRecipe]));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

// Remove a recipe from favorites
export const removeFavorite = (recipeId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

// Toggle favorite status
export const toggleFavorite = (recipe) => {
  if (isFavorite(recipe.id)) {
    return removeFavorite(recipe.id);
  } else {
    return addFavorite(recipe);
  }
};
