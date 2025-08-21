import { ProductType } from "../types/product";

// Map URL sort parameter to display text
export const getSortDisplayText = (param: string): string => {
  switch(param) {
    case 'price-asc': return 'Sort by price: low to high';
    case 'price-desc': return 'Sort by price: high to low';
    default: return 'Default Sorting';
  }
};

// Filter and sort products based on search, category, and sort parameters
export const getFilteredAndSortedProducts = (
  products: ProductType[],
  searchQuery: string,
  categoryParam: string,
  sortParam: string
): ProductType[] => {
  let filteredProducts = [...products];
  
  // Filter by search query if present
  if (searchQuery) {
    const searchTokens = searchQuery.toLowerCase().split(/\s+/).filter(token => token.length > 0);
    
    if (searchTokens.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();
        
        // Check if all search tokens are found in either name or category
        return searchTokens.every(token => 
          productName.includes(token) || productCategory.includes(token)
        );
      });
    }
  }
  
  // Filter by category if present
  if (categoryParam) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === categoryParam.toLowerCase()
    );
  }
  
  // Sort the filtered products
  if (sortParam === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortParam === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  
  return filteredProducts;
};