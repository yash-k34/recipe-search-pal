
const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-6 w-6 border-2",
    medium: "h-10 w-10 border-3",
    large: "h-16 w-16 border-4"
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClass} rounded-full border-primary/30 border-t-primary animate-spin`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
