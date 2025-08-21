'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ProductType } from '../types/product';

// Define product type
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'ALL' | 'RAMEN' | 'DRY RAMEN' | 'SPICY' | 'DONBURI' | 'SUSHI' | 'PACKAGE';
  isTop: boolean;
};

// Define category type
type Category = 'ALL' | 'RAMEN' | 'DRY RAMEN' | 'SPICY' | 'DONBURI' | 'SUSHI' | 'PACKAGE';

// Product data
const products: Product[] = [
  {
    id: 1,
    name: 'Karaage Ramen',
    description: 'Irresistibly crispy Japanese fried chicken atop dry ramen, tossed with a savory, aromatic sauce and fresh garnishes for a bold, modern flavor twist',
    price: 12.95,
    image: '/images/menu/Karaage-Dry-Ramen.jpg',
    category: 'RAMEN',
    isTop: true
  },
  {
    id: 2,
    name: 'Curry Ramen',
    description: 'A fusion of crispy chicken katsu, savory Japanese curry, and steamed rice. Each bowl delivers hearty flavor with a touch of spice.',
    price: 12.95,
    image: '/images/menu/Legendary-Chicken-Ramen.jpg',
    category: 'RAMEN',
    isTop: true
  },
  {
    id: 3,
    name: 'Ebi Tempura Dry Ramen',
    description: 'A crispy tempura-style ebi, seasoned with soy sauce, mirin, and garlic, served over steamed rice with a touch of sesame oil',
    price: 12.95,
    image: '/images/menu/Chicken-Katsudon.jpg',
    category: 'DRY RAMEN',
    isTop: true
  },
  {
    id: 4,
    name: 'Spicy Miso Ramen',
    description: 'Spicy miso-based broth with tender chicken, bamboo shoots, and green onions',
    price: 13.95,
    image: '/images/menu/Legendary-Chicken-Ramen.jpg',
    category: 'SPICY',
    isTop: true
  },
  {
    id: 5,
    name: 'Chicken Katsudon',
    description: 'Crispy chicken cutlet served over rice with egg and onions',
    price: 11.95,
    image: '/images/menu/Chicken-Katsudon.jpg',
    category: 'DONBURI',
    isTop: true
  },
  {
    id: 6,
    name: 'Salmon Sushi',
    description: 'Fresh salmon nigiri sushi, 2 pieces',
    price: 8.95,
    image: '/images/menu/Karaage-Dry-Ramen.jpg',
    category: 'SUSHI',
    isTop: true
  },
  {
    id: 7,
    name: 'Instant Ramen Package',
    description: 'Take-home package with 5 servings of our signature ramen',
    price: 15.95,
    image: '/images/menu/Legendary-Chicken-Ramen.jpg',
    category: 'PACKAGE',
    isTop: true
  },
  {
    id: 8,
    name: 'Tonkotsu Ramen',
    description: 'Rich beef bone broth with chashu, egg, and vegetables',
    price: 14.95,
    image: '/images/menu/Karaage-Dry-Ramen.jpg',
    category: 'RAMEN',
    isTop: false
  },
  {
    id: 9,
    name: 'Vegetable Dry Ramen',
    description: 'Stir-fried ramen noodles with seasonal vegetables',
    price: 10.95,
    image: '/images/menu/Chicken-Katsudon.jpg',
    category: 'DRY RAMEN',
    isTop: false
  }
];

const MenuCard = () => {
  // State for active category
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const { addToCart } = useCart();

  // Function to filter products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === 'ALL') {
      // For ALL category, get top 3 products from each category
      const categories: Category[] = ['RAMEN', 'DRY RAMEN', 'SPICY', 'DONBURI', 'SUSHI', 'PACKAGE'];
      const allTopProducts: Product[] = [];
      
      categories.forEach(category => {
        const categoryProducts = products
          .filter(product => product.category === category)
          .sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
          .slice(0, 3);
          
        allTopProducts.push(...categoryProducts);
      });
      
      return allTopProducts.slice(0, 9); // Limit to 9 products total (3 per row)
    } else {
      // For specific category, filter and sort by isTop
      return products
        .filter(product => product.category === activeCategory)
        .sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
        .slice(0, 3); // Limit to 3 products
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-600">Favorite Menu</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
          {/* All */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('ALL')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'ALL' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M12 4L4 8L12 12L20 8L12 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12L12 16L20 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 16L12 20L20 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'ALL' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>All</span>
          </div>
          
          {/* RAMEN */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('RAMEN')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'RAMEN' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                <path d="M4.5 12C4.5 12 8 8 12 8C16 8 19.5 12 19.5 12" strokeWidth="1.5"/>
                <path d="M8 12L9 14M12 12L13 15M16 12L15 14" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'RAMEN' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>RAMEN</span>
          </div>
          
          {/* DRY RAMEN */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('DRY RAMEN')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'DRY RAMEN' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M4 10H20V14H4V10Z" strokeWidth="1.5"/>
                <path d="M4 14H20V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V14Z" strokeWidth="1.5"/>
                <path d="M4 10H20V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V10Z" strokeWidth="1.5"/>
                <path d="M6 14V18" strokeWidth="1.5"/>
                <path d="M18 14V18" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'DRY RAMEN' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>DRY RAMEN</span>
          </div>
          
          {/* SPICY */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('SPICY')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'SPICY' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6Z" strokeWidth="1.5"/>
                <path d="M12 12C8 12 5 15 5 19H19C19 15 16 12 12 12Z" strokeWidth="1.5"/>
                <path d="M7 9C7 9 8 7 10 6" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M17 9C17 9 16 7 14 6" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'SPICY' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>SPICY</span>
          </div>
          
          {/* DONBURI */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('DONBURI')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'DONBURI' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M12 5C15.866 5 19 8.13401 19 12H5C5 8.13401 8.13401 5 12 5Z" strokeWidth="1.5"/>
                <path d="M5 12H19V14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14V12Z" strokeWidth="1.5"/>
                <path d="M9 9C9 9 10 10 12 10C14 10 15 9 15 9" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'DONBURI' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>DONBURI</span>
          </div>
          
          {/* SUSHI */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('SUSHI')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'SUSHI' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M8 3H16L15 12L17 14V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V14L9 12L8 3Z" strokeWidth="1.5"/>
                <path d="M7 14H17" strokeWidth="1.5"/>
                <path d="M12 3V7" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'SUSHI' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>SUSHI</span>
          </div>
          
          {/* PACKAGE */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('PACKAGE')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" className={`w-12 h-12 ${activeCategory === 'PACKAGE' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`} stroke="currentColor">
                <path d="M8 6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8H8V6Z" strokeWidth="1.5"/>
                <path d="M5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V16C19 18.2091 17.2091 20 15 20H9C6.79086 20 5 18.2091 5 16V10Z" strokeWidth="1.5"/>
                <path d="M12 8V20" strokeWidth="1.5"/>
                <path d="M5 14H19" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className={`font-medium ${activeCategory === 'PACKAGE' ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>PACKAGE</span>
          </div>
        </div>
        
        {/* Food Menu Cards Section */}
        <div className="mt-16">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="p-6">
                    <div className="relative w-full h-84 mb-4">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        style={{ objectFit: 'contain' }}
                        className="rounded-3xl"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-500">{product.name}</h3>
                    <p className="text-gray-500 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-500 font-bold text-xl">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => {
                          // Convert Product to ProductType
                          const productToAdd: ProductType = {
                            id: product.id,
                            name: product.name,
                            category: product.category,
                            price: product.price,
                            image: product.image,
                            description: product.description
                          };
                          addToCart(productToAdd, 1);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-xl">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;