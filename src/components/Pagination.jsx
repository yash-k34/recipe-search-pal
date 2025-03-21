
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    if (currentPage > 2) {
      pages.push(1);
    }
    
    // Calculate range of pages to show around current page
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);
    
    // Adjust if we're at the beginning or end
    if (currentPage <= 2) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage >= totalPages - 1) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page
    if (currentPage < totalPages - 1 && totalPages > 2) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full flex items-center justify-center mt-6 mb-4">
      <div className="flex items-center space-x-1">
        {/* Previous page button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            flex items-center justify-center rounded-md p-2
            transition-colors
            ${currentPage === 1
              ? 'text-muted-foreground cursor-not-allowed'
              : 'text-foreground hover:bg-accent'
            }
          `}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`
              flex items-center justify-center rounded-md p-2 min-w-[2rem]
              transition-colors
              ${page === currentPage
                ? 'bg-primary text-primary-foreground font-medium'
                : page === '...'
                  ? 'text-muted-foreground cursor-default'
                  : 'hover:bg-accent'
              }
            `}
            aria-label={typeof page === 'number' ? `Go to page ${page}` : 'More pages'}
          >
            {page}
          </button>
        ))}
        
        {/* Next page button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            flex items-center justify-center rounded-md p-2
            transition-colors
            ${currentPage === totalPages
              ? 'text-muted-foreground cursor-not-allowed'
              : 'text-foreground hover:bg-accent'
            }
          `}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
