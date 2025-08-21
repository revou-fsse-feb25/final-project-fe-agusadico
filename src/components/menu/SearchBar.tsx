type SearchBarProps = {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  debouncedSearchQuery: string;
};

export default function SearchBar({ 
  searchQuery, 
  handleSearchChange, 
  handleSearchSubmit,
  debouncedSearchQuery 
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-1 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      {debouncedSearchQuery && (
        <div className="mt-2 text-sm text-gray-500">
          Showing results for: <span className="font-medium">{debouncedSearchQuery}</span>
        </div>
      )}
    </div>
  );
}