type Category = {
  name: string;
  count: number;
};

type CategorySidebarProps = {
  categories: Category[];
  categoryParam: string;
  handleCategoryClick: (categoryName: string) => void;
  productsCount: number;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  debouncedSearchQuery: string;
};

import SearchBar from './SearchBar';

export default function CategorySidebar({ 
  categories, 
  categoryParam, 
  handleCategoryClick,
  productsCount,
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
  debouncedSearchQuery
}: CategorySidebarProps) {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <SearchBar 
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          debouncedSearchQuery={debouncedSearchQuery}
        />

        <div>
          <h3 className="text-lg font-bold mb-4">Shop by Categories</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <button 
                className={`text-left hover:text-red-600 ${categoryParam === '' ? 'text-red-600 font-medium' : 'text-gray-700'}`}
                onClick={() => handleCategoryClick('')}
              >
                All Categories
              </button>
              <span className="text-gray-400 text-sm">({productsCount})</span>
            </li>
            {categories.map((category) => (
              <li key={category.name} className="flex justify-between items-center">
                <button 
                  className={`text-left hover:text-red-600 ${categoryParam === category.name.toLowerCase() ? 'text-red-600 font-medium' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </button>
                <span className="text-gray-400 text-sm">({category.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}