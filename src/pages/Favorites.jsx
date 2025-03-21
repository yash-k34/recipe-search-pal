
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Trash2 } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, removeFavorite } from '../utils/favorites';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  
  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      const favoritesData = getFavorites();
      setFavorites(favoritesData);
      setFilteredFavorites(favoritesData);
    };
    
    loadFavorites();
    
    // Add event listener to update favorites when localStorage changes
    const handleStorageChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Filter favorites based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFavorites(favorites);
      return;
    }
    
    const filtered = favorites.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredFavorites(filtered);
  }, [searchTerm, favorites]);
  
  const handleRemoveFavorite = (id) => {
    removeFavorite(id);
    setFavorites(prev => prev.filter(recipe => recipe.id !== id));
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Your Favorite Recipes</h1>
        
        {favorites.length > 0 ? (
          <>
            {/* Search input */}
            <div className="relative w-full max-w-md mb-8">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your favorites..."
                className="w-full pl-10 pr-10 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Favorites list */}
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFavorites.map((recipe) => (
                  <div key={recipe.id} className="animate-slide-up">
                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No recipes match your search. Try a different term.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              Save your favorite recipes to access them quickly later
            </p>
            
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Find recipes
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
