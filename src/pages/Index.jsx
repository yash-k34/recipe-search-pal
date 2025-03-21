
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import Pagination from '../components/Pagination';
import { searchRecipes } from '../utils/api';
import { ChefHat } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showIntro, setShowIntro] = useState(true);
  
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    if (query) {
      setSearchQuery(query);
      setCurrentPage(page);
      setShowIntro(false);
      performSearch(query, page);
    } else {
      setShowIntro(true);
      setRecipes([]);
    }
  }, [location.search]);
  
  const handleSearch = (query) => {
    if (query.trim()) {
      setCurrentPage(1);
      updateSearchParams(query, 1);
    }
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateSearchParams(searchQuery, page);
  };
  
  const updateSearchParams = (query, page) => {
    const params = new URLSearchParams();
    params.set('q', query);
    params.set('page', page.toString());
    navigate(`?${params.toString()}`);
  };
  
  const performSearch = async (query, page) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchRecipes(query, page, resultsPerPage);
      console.log("Search results:", data);
      setRecipes(data.results);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const popularSearches = [
    'pasta', 'chicken', 'vegetarian', 'dessert', 'quick dinner'
  ];
  
  const handlePopularSearch = (term) => {
    handleSearch(term);
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="w-full py-8 md:py-12 flex flex-col items-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Find Your Perfect Recipe
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xl">
            Search thousands of recipes for any meal, cuisine, or ingredient
          </p>
          
          <SearchBar 
            onSearch={handleSearch} 
            initialQuery={searchQuery} 
          />
          
          {showIntro && (
            <div className="w-full max-w-xl mt-8 flex flex-col items-center">
              <div className="mb-6 text-primary opacity-80">
                <ChefHat size={48} />
              </div>
              
              <h2 className="text-xl font-medium mb-4 text-center">
                Popular Searches
              </h2>
              
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearch(term)}
                    className="px-4 py-2 rounded-full text-sm bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Results section */}
        {(searchQuery && !showIntro) && (
          <div className="mt-4 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">
                {loading ? 'Searching...' : `Results for "${searchQuery}"`}
              </h2>
              
              {!loading && totalResults > 0 && (
                <p className="text-sm text-muted-foreground">
                  {totalResults} {totalResults === 1 ? 'recipe' : 'recipes'} found
                </p>
              )}
            </div>
            
            <RecipeList 
              recipes={recipes}
              loading={loading}
              error={error}
            />
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
