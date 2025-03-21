import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Users, ChevronLeft, Heart, 
  BookOpen, Utensils, BarChart, Info
} from 'lucide-react';
import { getRecipeDetails } from '../utils/api';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
        setFavorite(isFavorite(data.id));
      } catch (err) {
        setError('Failed to load recipe details. Please try again.');
        console.error('Error fetching recipe details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipeDetails();
  }, [id]);
  
  const handleFavoriteToggle = () => {
    if (!recipe) return;
    
    const result = toggleFavorite(recipe);
    setFavorite(isFavorite(recipe.id));
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Create clean HTML from recipe instructions
  const createInstructionsList = (instructions) => {
    if (!instructions) return null;
    
    // Remove HTML tags but keep line breaks
    const cleanedInstructions = instructions
      .replace(/<[^>]*>?/gm, '')
      .replace(/\n\s*\n/g, '\n');
    
    // Split by numbers or newlines
    const steps = cleanedInstructions
      .split(/(?:\r?\n|\d+\.)/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
    
    return steps;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 px-4">
        <p className="text-destructive mb-4">{error || 'Recipe not found'}</p>
        <button
          onClick={handleGoBack}
          className="flex items-center text-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Go back
        </button>
      </div>
    );
  }
  
  const instructionSteps = createInstructionsList(recipe.instructions);
  
  return (
    <div className="min-h-screen flex flex-col pt-16">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 animate-fade-in">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="flex items-center mt-6 mb-4 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to results
        </button>
        
        {/* Recipe header */}
        <div className="flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1 text-muted-foreground" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1 text-muted-foreground" />
              <span>{recipe.servings} servings</span>
            </div>
            
            <button
              onClick={handleFavoriteToggle}
              className={`
                flex items-center gap-1 px-3 py-1
                rounded-full border transition-all
                ${favorite 
                  ? 'text-red-500 border-red-200 bg-red-50' 
                  : 'text-muted-foreground border-muted hover:border-muted-foreground'
                }
              `}
            >
              <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
              <span>{favorite ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Image and summary */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden mb-6 bg-card shadow-sm border border-border">
              {!imageLoaded && (
                <div className="aspect-video shimmer" />
              )}
              <img
                src={recipe.image}
                alt={recipe.title}
                className={`w-full aspect-video object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-medium mb-3">About this recipe</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
                className="text-muted-foreground"
              />
            </div>
            
            {/* Nutrition info (smaller screens) */}
            <div className="lg:hidden mt-8">
              <h3 className="text-xl font-medium mb-3">Nutrition Facts</h3>
              
              <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                {recipe.nutrition?.nutrients?.slice(0, 6).map((nutrient) => (
                  <div 
                    key={nutrient.name}
                    className="flex justify-between py-2 border-b border-border last:border-0"
                  >
                    <span>{nutrient.name}</span>
                    <span className="font-medium">
                      {Math.round(nutrient.amount)} {nutrient.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right side - Tabs for ingredients and instructions */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex space-x-1 border-b">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`
                    flex items-center px-4 py-2 -mb-px font-medium text-sm
                    border-b-2 transition-colors
                    ${activeTab === 'ingredients'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Ingredients
                </button>
                
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`
                    flex items-center px-4 py-2 -mb-px font-medium text-sm
                    border-b-2 transition-colors
                    ${activeTab === 'instructions'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Utensils className="h-4 w-4 mr-2" />
                  Instructions
                </button>
                
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`
                    flex items-center px-4 py-2 -mb-px font-medium text-sm
                    border-b-2 transition-colors hidden lg:flex
                    ${activeTab === 'nutrition'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Nutrition
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="mt-6 animate-fade-in">
              {/* Ingredients tab */}
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-xl font-medium mb-4">Ingredients</h3>
                  
                  <ul className="space-y-2">
                    {recipe.extendedIngredients?.map((ingredient, index) => (
                      <li 
                        key={index}
                        className="flex items-start"
                      >
                        <div className="h-5 w-5 mr-2 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        </div>
                        <span>{ingredient.original}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Instructions tab */}
              {activeTab === 'instructions' && (
                <div>
                  <h3 className="text-xl font-medium mb-4">Instructions</h3>
                  
                  {instructionSteps && instructionSteps.length > 0 ? (
                    <ol className="space-y-6">
                      {instructionSteps.map((step, index) => (
                        <li 
                          key={index}
                          className="flex"
                        >
                          <div className="mr-4 flex-shrink-0">
                            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary font-medium">
                              {index + 1}
                            </div>
                          </div>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="flex items-center text-muted-foreground">
                      <Info className="h-5 w-5 mr-2" />
                      <p>No detailed instructions available for this recipe.</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Nutrition tab */}
              {activeTab === 'nutrition' && (
                <div>
                  <h3 className="text-xl font-medium mb-4">Nutrition Facts</h3>
                  
                  {recipe.nutrition?.nutrients?.length > 0 ? (
                    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        {recipe.nutrition.nutrients.slice(0, 12).map((nutrient) => (
                          <div 
                            key={nutrient.name}
                            className="flex justify-between py-2 border-b border-border last:border-0"
                          >
                            <span>{nutrient.name}</span>
                            <span className="font-medium">
                              {Math.round(nutrient.amount)} {nutrient.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center text-muted-foreground">
                      <Info className="h-5 w-5 mr-2" />
                      <p>No nutrition information available for this recipe.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
