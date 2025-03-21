
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import LoadingSpinner from './LoadingSpinner';

const RecipeList = ({ recipes, loading, error }) => {
  const [renderedRecipes, setRenderedRecipes] = useState([]);

  // Staggered rendering of recipes for smooth animation
  useEffect(() => {
    if (!recipes || loading) return;

    setRenderedRecipes([]);
    
    const timer = setTimeout(() => {
      const intervals = recipes.map((_, index) => {
        return setTimeout(() => {
          setRenderedRecipes(prev => [...prev, recipes[index]]);
        }, index * 100); // Stagger by 100ms
      });
      
      return () => intervals.forEach(clearTimeout);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [recipes, loading]);

  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-destructive">Error loading recipes. Please try again.</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-muted-foreground">No recipes found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {renderedRecipes.map((recipe) => (
        <div 
          key={recipe.id} 
          className="animate-slide-up"
        >
          <RecipeCard recipe={recipe} />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
