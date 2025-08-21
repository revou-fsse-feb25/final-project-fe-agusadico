'use client'

import { useCart } from "../../context/CartContext";
import { getFilteredAndSortedProducts } from "../../utils/productUtils";
import { useMenuFilters } from "../../hooks/useMenuFilters";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/menu/Breadcrumb";
import CategorySidebar from "../../components/menu/CategorySidebar";
import ProductGrid from "../../components/menu/ProductGrid";
import { ProductType } from "../../types/product";

export default function MenuPage() {
  // Get cart functionality
  const { addToCart } = useCart();
  
  // Get menu filtering functionality
  const {
    searchQuery,
    debouncedSearchQuery,
    categoryParam,
    sortParam,
    handleSearchChange,
    handleSearchSubmit,
    handleCategoryClick,
    handleSortChange
  } = useMenuFilters();
  
  // Categories with counts
  const categories = [
    { name: "Ramen", count: 10 },
    { name: "Dry Ramen", count: 8 },
    { name: "Katsu Set", count: 6 },
    { name: "Donburi", count: 5 },
    { name: "Sushi", count: 9 },
    { name: "Agemono & Gyoza", count: 4 },
    { name: "Drinks", count: 3 },
    { name: "Topping", count: 7 },
  ];
  
  // Product data
  const products: ProductType[] = [
    {
      id: 1,
      name: "Legendary Chicken Ramen",
      category: "Ramen",
      price: 12.00,
      originalPrice: 14.00,
      discount: "14%",
      image: "/images/menu/Legendary-Chicken-Ramen.jpg",
      //pack: "12 fl oz, 10 Pack Bottles"
    },
    {
      id: 2,
      name: "Karaage Dry Ramen",
      category: "Dry Ramen",
      price: 6.00,
      originalPrice: 12.00,
      discount: "50%",
      image: "/images/menu/Karaage-Dry-Ramen.jpg",
      //pack: "12 fl oz, 10 Pack Bottles"
    },
    {
      id: 3,
      name: "Chicken Katsudon",
      category: "Donburi",
      price: 14.00,
      originalPrice: 16.00,
      discount: "13%",
      image: "/images/menu/Chicken-Katsudon.jpg",
      //pack: "12 fl oz, 10 Pack Bottles"
    },
    {
      id: 4,
      name: "Chicken Curry Katsudon",
      category: "Donburi",
      price: 14.00,
      originalPrice: 16.00,
      discount: "13%",
      image: "/images/menu/Chicken-Curry-Katsudon.jpg",
      //pack: "12 fl oz, 10 Pack Bottles"
    },
    {
      id: 5,
      name: "Seafood Spicy Crunchy Roll", // Fixed typo from "Cruncy" to "Crunchy"
      category: "Sushi",
      price: 10.00,
      originalPrice: 14.00,
      discount: "29%",
      image: "/images/menu/Seafood-Spicy-Cruncy-Roll.jpg",
      //pack: "12 fl oz, 10 Pack Bottles"
    },
    {
      id: 6,
      name: "Mango Yakult", 
      category: "Drinks",
      price: 34.00,
      originalPrice: 44.00,
      discount: "23%",
      image: "/images/menu/Mango-Yakult.jpg",
      //pack: "12 Count"
    },
    {
      id: 7,
      name: "Nori Gyoza Skin",
      category: "Agemono & Gyoza",
      price: 15.00,
      originalPrice: 20.00,
      discount: "25%",
      image: "/images/menu/Nori-Gyoza-Skin.jpg",
      //pack: "52 Fl Oz Bottle"
    },
    {
      id: 8,
      name: "Seafood Maki Sushi Rolls",
      category: "Sushi",
      price: 22.00,
      originalPrice: undefined, // Changed from null to undefined
      discount: undefined, // Changed from null to undefined
      image: "/images/menu/Seafood-Maki-Sushi-Rolls.jpg",
      //pack: "3.75 oz Canister"
    },
  ];

  // Get filtered and sorted products
  const filteredAndSortedProducts = getFilteredAndSortedProducts(
    products,
    debouncedSearchQuery,
    categoryParam,
    sortParam
  );

  return (
    <div className="min-h-screen flex flex-col mt-10 bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Breadcrumb */}
      <Breadcrumb 
        categoryParam={categoryParam} 
        searchQuery={debouncedSearchQuery} 
      />

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <CategorySidebar 
              categories={categories}
              categoryParam={categoryParam}
              handleCategoryClick={handleCategoryClick}
              productsCount={products.length}
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
              debouncedSearchQuery={debouncedSearchQuery}
            />

            {/* Product Grid */}
            <ProductGrid 
              products={filteredAndSortedProducts}
              searchQuery={debouncedSearchQuery}
              categoryParam={categoryParam}
              sortParam={sortParam}
              handleSortChange={handleSortChange}
              addToCart={addToCart}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}