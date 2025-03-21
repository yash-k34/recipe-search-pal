
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ChefHat } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 animate-fade-in">
        <div className="mx-auto h-24 w-24 mb-6 rounded-full bg-muted/50 flex items-center justify-center">
          <ChefHat className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Oops! We couldn't find that recipe.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground 
                   hover:bg-primary/90 transition-colors inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
