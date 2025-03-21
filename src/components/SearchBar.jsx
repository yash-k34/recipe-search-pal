import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative w-full max-w-2xl mx-auto transition-all duration-300 ${
        isFocused ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <div className={`
        flex items-center w-full overflow-hidden rounded-full 
        border border-input bg-background
        transition-all duration-300
        ${isFocused ? 'shadow-md border-primary/20' : ''}
      `}>
        <div className="flex items-center justify-center h-10 w-10 text-muted-foreground">
          <Search size={18} />
        </div>
        
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search recipes..."
          className="flex-1 h-12 px-2 bg-transparent outline-none border-none text-foreground"
        />
        
        <button
          type="submit"
          className={`
            h-9 px-4 mr-1.5 rounded-full font-medium
            bg-primary text-primary-foreground
            hover:bg-primary/90 transition-colors
            ${!query.trim() ? 'opacity-70 cursor-not-allowed' : ''}
          `}
          disabled={!query.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
