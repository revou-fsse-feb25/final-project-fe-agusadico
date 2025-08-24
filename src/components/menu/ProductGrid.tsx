import { ProductType } from "../../types/product";
import ProductCard from "./ProductCard";
import SortSelector from "./SortSelector";

type ProductGridProps = {
  products: ProductType[];
  searchQuery: string;
  categoryParam: string;
  sortParam: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  addToCart: (product: ProductType, quantity: number) => void;
};

export default function ProductGrid({ 
  products, 
  searchQuery, 
  categoryParam,
  sortParam,
  handleSortChange,
  addToCart
}: ProductGridProps) {
  return (
    <div className="lg:w-3/4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {products.length === 0 ? (
                <span>No products found matching your search</span>
              ) : searchQuery ? (
                <span>Found <span className="font-medium">{products.length}</span> results for <span className="font-medium">"{searchQuery}"</span></span>
              ) : categoryParam ? (
                <span>Showing <span className="font-medium">{products.length}</span> results for <span className="font-medium capitalize">{categoryParam}</span></span>
              ) : (
                <span>Showing all {products.length} results</span>
              )}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <button className="border border-gray-300 dark:border-gray-600 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1 1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </button>
            </div>
            <SortSelector sortParam={sortParam} handleSortChange={handleSortChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}