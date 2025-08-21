'use client'

import Image from "next/image";
import { ProductType } from "../types/product";

type RelatedProductsProps = {
  products?: ProductType[];
  // Optional fallback products if no related products are provided
  fallbackProducts?: ProductType[];
};

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 3,
    name: "Organic Fresh Broccoli",
    category: "Vegetables",
    price: 3.99,
    image: "/images/veg_3-150x150.png",
    //pack: "1 lb"
  },
  {
    id: 4,
    name: "Organic Carrots",
    category: "Vegetables",
    price: 2.49,
    image: "/images/veg_4-150x150.png",
    //pack: "2 lb bag"
  }
];

export default function RelatedProducts({ products, fallbackProducts }: RelatedProductsProps) {
  // Use provided products, fallback products, or sample products
  const displayProducts = products || fallbackProducts || sampleProducts;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 relative">
              <div className="relative group">
                <div className="relative h-48 mb-4 flex items-center justify-center bg-gray-50 rounded">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={150} 
                    height={150}
                    className="object-contain max-h-full"
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-1">{product.category}</div>
              <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">{product.name}</h3>
              {/* <div className="text-xs text-gray-500 mb-2">{product.pack}</div> */}
              <div className="flex items-center mb-3">
                <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-col space-y-2">
                <button className="w-full bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-1.5 px-4 rounded-full transition-colors text-sm">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}