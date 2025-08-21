import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebounce } from './useDebounce';

export function useMenuFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Get search query from URL or default to empty string
  const initialSearchQuery = searchParams.get('q') || "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  // Get category and sort parameters from URL
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'default';
  
  // Update URL when debounced search query changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearchQuery) {
      params.set('q', debouncedSearchQuery);
    } else {
      params.delete('q');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearchQuery, pathname, router, searchParams]);
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sortParam = 'default';
    
    if (value === 'Sort by price: low to high') {
      sortParam = 'price-asc';
    } else if (value === 'Sort by price: high to low') {
      sortParam = 'price-desc';
    }
    
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove the sort parameter
    if (sortParam === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sortParam);
    }
    
    // Update the URL
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Handle category click
  const handleCategoryClick = (categoryName: string) => {
    // Create new URLSearchParams object to preserve existing parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // If "All Categories" is clicked or empty category name is provided
    if (!categoryName || categoryName.toLowerCase() === 'all categories') {
      // Remove the category parameter from URL
      params.delete('category');
    } else {
      // Set the category parameter to the lowercase category name
      params.set('category', categoryName.toLowerCase());
    }
    
    // Update the URL with the new parameters
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    searchQuery,
    debouncedSearchQuery,
    categoryParam,
    sortParam,
    handleSearchChange,
    handleSearchSubmit,
    handleCategoryClick,
    handleSortChange
  };
}