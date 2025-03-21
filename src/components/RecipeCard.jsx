
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../utils/favorites';

const RecipeCard = ({ recipe }) => {
  const [favorite, setFavorite] = useState(isFavorite(recipe.id));
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = toggleFavorite(recipe);
    setFavorite(isFavorite(recipe.id));
    
    // Could add toast notification here
  };

  // Create a clean excerpt from the recipe summary
  const createExcerpt = (summary) => {
    // Remove HTML tags
    const text = summary.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative overflow-hidden rounded-xl 
        bg-card border border-border
        transition-all duration-300 ease-out
        ${isHovered ? 'shadow-lg transform -translate-y-1' : 'shadow-sm'}
      `}>
        {/* Image container with overlay */}
        <div className="relative aspect-video overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer" />
          )}
          
          <img
            src={recipe.image}
            alt={recipe.title}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover transition-transform duration-500
              ${isHovered ? 'scale-105' : 'scale-100'}
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            className={`
              absolute top-3 right-3 p-2
              rounded-full bg-white/80 backdrop-blur-sm
              transition-all duration-300
              ${favorite ? 'text-red-500' : 'text-gray-500'}
              hover:bg-white hover:shadow-md
            `}
          >
            <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {createExcerpt(recipe.summary)}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.readyInMinutes} min</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
