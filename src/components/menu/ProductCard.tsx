import Link from "next/link";
import { ProductType } from "../../types/product";

type ProductCardProps = {
  product: ProductType;
  addToCart: (product: ProductType, quantity: number) => void;
};

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 relative">
        <div className="relative group">
          <div className="relative h-48 mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-contain max-h-full max-w-full"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{product.category}</div>
        <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10 text-gray-900 dark:text-gray-100">{product.name}</h3>
        {/* <div className="text-xs text-gray-500 mb-2">{product.pack}</div> */}
        <div className="flex items-center mb-3">
          <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm ml-2">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={() => addToCart(product, 1)} 
            className="w-full bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-1.5 px-4 rounded-full transition-colors text-sm"
          >
            Add To Cart
          </button>
          <Link href={`/${product.id}`} className="w-full">
            <button className="w-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-medium py-1.5 px-4 rounded-full transition-colors text-sm">
              View Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}