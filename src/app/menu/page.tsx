'use client'

import { useEffect, useMemo, useState, Suspense } from "react";
import { useCart } from "../../context/CartContext";
import { getFilteredAndSortedProducts } from "../../utils/productUtils";
import { useMenuFilters } from "../../hooks/useMenuFilters";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Breadcrumb from "../../components/menu/Breadcrumb";
import CategorySidebar from "../../components/menu/CategorySidebar";
import ProductGrid from "../../components/menu/ProductGrid";
import { ProductType } from "../../types/product";
import { listProducts } from "@/lib/api/products";

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  );
}

function MenuContent() {
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
  
  // Product data from backend
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await listProducts();
        // Map backend response to ProductType if necessary
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
        const asAbsolute = (url: string | undefined) => {
          if (!url) return '/images/menu/Legendary-Chicken-Ramen.jpg';
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
          return `${apiBase}/${url.replace(/^\//, '')}`;
        };

        const mapped: ProductType[] = data.map((p: any) => ({
          id: p.id ?? p.productId ?? p._id ?? 0,
          name: p.name ?? p.title ?? 'Untitled',
          category: p.category ?? p.categoryName ?? 'General',
          price: Number(p.price ?? p.unitPrice ?? 0),
          originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
          discount: p.discount ?? undefined,
          image: asAbsolute(p.image ?? p.imageUrl ?? p.thumbnail),
          description: p.description,
          sku: p.sku,
          rating: p.rating,
          reviewCount: p.reviewCount,
          inStock: p.inStock,
          relatedProducts: p.relatedProducts,
          slug: p.slug,
          categories: p.categories,
          galleryImages: p.galleryImages,
          tags: p.tags,
        }));
        setProducts(mapped);
      } catch (e: any) {
        console.error('Failed to load products', e);
        setError('Failed to load products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Categories with counts, derived from products
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      const key = p.category || 'General';
      counts[key] = (counts[key] || 0) + 1;
    }
    const list = Object.entries(counts).map(([name, count]) => ({ name, count }));
    // Fallback to common categories if none loaded yet
    if (list.length === 0) {
      return [
        { name: "Ramen", count: 0 },
        { name: "Dry Ramen", count: 0 },
        { name: "Katsu Set", count: 0 },
        { name: "Donburi", count: 0 },
        { name: "Sushi", count: 0 },
        { name: "Agemono & Gyoza", count: 0 },
        { name: "Drinks", count: 0 },
        { name: "Topping", count: 0 },
      ];
    }
    return list;
  }, [products]);

  // Get filtered and sorted products
  const filteredAndSortedProducts = getFilteredAndSortedProducts(
    products,
    debouncedSearchQuery,
    categoryParam,
    sortParam
  );

  return (
    <div className="min-h-screen flex flex-col mt-10 content-body">
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
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : error ? (
              <div className="flex-1 text-center text-red-500 py-8">{error}</div>
            ) : (
              <ProductGrid 
                products={filteredAndSortedProducts}
                searchQuery={debouncedSearchQuery}
                categoryParam={categoryParam}
                sortParam={sortParam}
                handleSortChange={handleSortChange}
                addToCart={addToCart}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}