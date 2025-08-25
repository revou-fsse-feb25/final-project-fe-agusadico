'use client'
// Remove the next/image import
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ProductType } from '../types/product';
import { list as listProducts } from '@/lib/api/products';

type UiProduct = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  isTop?: boolean;
};

const MenuCard = () => {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [products, setProducts] = useState<UiProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
        const asAbsolute = (url: string | undefined) => {
          if (!url) return '/images/menu/Legendary-Chicken-Ramen.jpg';
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
          return `${apiBase}/${url.replace(/^\//, '')}`;
        };

        const data = await listProducts();
        const mapped: UiProduct[] = (data as any[]).map((p) => ({
          id: p.id ?? p.productId ?? p._id ?? 0,
          name: p.name ?? p.title ?? 'Untitled',
          description: p.description ?? '',
          price: Number(p.price ?? p.unitPrice ?? 0),
          image: asAbsolute(p.image ?? p.imageUrl ?? p.thumbnail),
          category: String(p.category ?? p.categoryName ?? 'General').toUpperCase(),
          isTop: Boolean(p.isTop),
        }));
        setProducts(mapped);
      } catch (e: any) {
        console.error('Failed to load products', e);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'ALL') {
      const result: UiProduct[] = [];
      for (const cat of categories) {
        const items = products
          .filter((p) => p.category === cat)
          .sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
          .slice(0, 3);
        result.push(...items);
      }
      return result.slice(0, 9);
    }
    return products
      .filter((p) => p.category === activeCategory)
      .sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
      .slice(0, 3);
  }, [activeCategory, categories, products]);

  const renderCategoryIcon = (category: string) => {
    const name = category.toUpperCase();
    if (name === 'RAMEN') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
          <path d="M4.5 12C4.5 12 8 8 12 8C16 8 19.5 12 19.5 12" strokeWidth="1.5"/>
          <path d="M8 12L9 14M12 12L13 15M16 12L15 14" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (name === 'DRY RAMEN') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <path d="M4 10H20V14H4V10Z" strokeWidth="1.5"/>
          <path d="M4 14H20V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V14Z" strokeWidth="1.5"/>
          <path d="M4 10H20V7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V10Z" strokeWidth="1.5"/>
          <path d="M6 14V18" strokeWidth="1.5"/>
          <path d="M18 14V18" strokeWidth="1.5"/>
        </svg>
      );
    }
    if (name === 'SPICY') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <path d="M12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6Z" strokeWidth="1.5"/>
          <path d="M12 12C8 12 5 15 5 19H19C19 15 16 12 12 12Z" strokeWidth="1.5"/>
          <path d="M7 9C7 9 8 7 10 6" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M17 9C17 9 16 7 14 6" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (name === 'DONBURI') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <path d="M12 5C15.866 5 19 8.13401 19 12H5C5 8.13401 8.13401 5 12 5Z" strokeWidth="1.5"/>
          <path d="M5 12H19V14C19 17.866 15.866 21 12 21C8.13401 21 5 17.866 5 14V12Z" strokeWidth="1.5"/>
          <path d="M9 9C9 9 10 10 12 10C14 10 15 9 15 9" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    }
    if (name === 'SUSHI') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <path d="M8 3H16L15 12L17 14V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19V14L9 12L8 3Z" strokeWidth="1.5"/>
          <path d="M7 14H17" strokeWidth="1.5"/>
          <path d="M12 3V7" strokeWidth="1.5"/>
        </svg>
      );
    }
    if (name === 'PACKAGE') {
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
          <path d="M8 6C8 4.89543 8.89543 4 10 4H14C15.1046 4 16 4.89543 16 6V8H8V6Z" strokeWidth="1.5"/>
          <path d="M5 10C5 8.89543 5.89543 8 7 8H17C18.1046 8 19 8.89543 19 10V16C19 18.2091 17.2091 20 15 20H9C6.79086 20 5 18.2091 5 16V10Z" strokeWidth="1.5"/>
          <path d="M12 8V20" strokeWidth="1.5"/>
          <path d="M5 14H19" strokeWidth="1.5"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" stroke="currentColor">
        <path d="M12 4L4 8L12 12L20 8L12 4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12L12 16L20 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 16L12 20L20 16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  return (
    <div className="py-16 content-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-600 dark:text-white">Favorite Menu</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-items-center">
          {/* All */}
          <div 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => setActiveCategory('ALL')}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <div className={`${activeCategory === 'ALL' ? 'text-yellow-500' : 'text-gray-400 dark:text-white hover:text-red-500'}`}>
                {renderCategoryIcon('ALL')}
              </div>
            </div>
            <span className={`font-medium ${activeCategory === 'ALL' ? 'text-yellow-500' : 'text-gray-400 dark:text-white hover:text-red-500'}`}>All</span>
          </div>
          {categories.map((cat) => (
            <div 
              key={cat}
              className="flex flex-col items-center cursor-pointer" 
              onClick={() => setActiveCategory(cat)}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <div className={`${activeCategory === cat ? 'text-red-500' : 'text-gray-400 dark:text-white hover:text-red-500'}`}>
                  {renderCategoryIcon(cat)}
                </div>
              </div>
              <span className={`font-medium ${activeCategory === cat ? 'text-red-500' : 'text-gray-400 dark:text-white hover:text-red-500'}`}>{cat}</span>
            </div>
          ))}
        </div>
        
        {/* Food Menu Cards Section */}
        <div className="mt-16">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                  <div className="p-6">
                    <div className="relative w-full h-84 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="rounded-3xl w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-500 dark:text-gray-300">{product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
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
                        className="bg-yellow-400 hover:bg-yellow-500 text-red-700 dark:bg-red-900 dark:hover:bg-red-950 dark:text-black font-bold py-2 px-4 rounded-full transition-colors"
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
              <p className="text-gray-500 dark:text-gray-400 text-xl">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;