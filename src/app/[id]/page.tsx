'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RelatedProducts from "../../components/RelatedProducts";
import ProductTabs from "../../components/ProductTabs";
import { useCart } from "../../context/CartContext";
import { get as getProduct } from "@/lib/api/products";

// Types
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  description: string;
  features: string[];
  sku: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  relatedProducts: number[];
  galleryImages?: string[]; 
}

export default function ProductDetail() {
  const params = useParams();
  const productId = Number(params.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
        const asAbsolute = (url: string | undefined) => {
          if (!url) return '/images/menu/Legendary-Chicken-Ramen.jpg';
          if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
          return `${apiBase}/${url.replace(/^\//, '')}`;
        };

        const data = await getProduct(productId);
        
        // Map backend response to Product interface
        const mapped: Product = {
          id: (data as any).id ?? (data as any).productId ?? (data as any)._id ?? productId,
          name: (data as any).name ?? (data as any).title ?? 'Untitled Product',
          category: (data as any).category ?? (data as any).categoryName ?? 'General',
          price: Number((data as any).price ?? (data as any).unitPrice ?? 0),
          originalPrice: (data as any).originalPrice ? Number((data as any).originalPrice) : undefined,
          discount: (data as any).discount ?? undefined,
          image: asAbsolute((data as any).image ?? (data as any).imageUrl ?? (data as any).thumbnail),
          description: (data as any).description ?? 'No description available.',
          features: (data as any).features ?? [
            'Premium quality ingredients',
            'Authentic Japanese recipe',
            'Carefully prepared and packaged'
          ],
          sku: (data as any).sku ?? `PROD-${(data as any).id ?? productId}`,
          rating: (data as any).rating ?? 4.5,
          reviewCount: (data as any).reviewCount ?? 0,
          inStock: (data as any).inStock ?? true,
          relatedProducts: (data as any).relatedProducts ?? [],
          galleryImages: (data as any).galleryImages ? 
            (data as any).galleryImages.map((img: string) => asAbsolute(img)) : 
            undefined,
        };
        
        setProduct(mapped);
      } catch (e: any) {
        console.error('Failed to load product', e);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);
  
  // Create an array of images for the product
  const productImages = product ? [
    product.image,
    // Use backend gallery images if available, otherwise fallback to main image
    ...(product.galleryImages && product.galleryImages.length > 0 
      ? product.galleryImages.slice(0, 3) // Limit to 3 additional images
      : [product.image, product.image] // Duplicate main image as fallback
    )
  ] : [];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState('');
  
  // Update selectedImage when product changes
  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Product not found'}</p>
          <Link href="/menu" className="text-blue-600 hover:underline">
            Return to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col content-body mt-25">
      {/* Navigation */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/menu" className="hover:text-red-600">
              Menu
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Images */}
              <div className="md:w-2/5">
                <div className="sticky top-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <img
                      src={selectedImage || "/images/menu/Legendary-Chicken-Ramen.jpg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-contain max-h-[400px] w-auto h-auto"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Thumbnail images */}
                    {productImages.map((image, index) => (
                      <div
                        key={`thumbnail-${index}`}
                        className={`border rounded-md p-1 cursor-pointer transition-all ${
                          selectedImage === image 
                            ? 'border-red-500' 
                            : 'border-gray-200 dark:border-gray-600 hover:border-red-500'
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image || "/images/menu/Legendary-Chicken-Ramen.jpg"}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-contain w-20 h-20"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-3/5">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {product.category}
                </div>
                <h1 className="text-2xl font-bold mb-2 dark:text-white">{product.name}</h1>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    {product.reviewCount} Customer Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice !== undefined && (
                    <span className="text-gray-400 line-through text-lg ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 dark:bg-red-900/20 text-red-600 text-xs font-bold px-2 py-1 rounded ml-2">
                      -{product.discount}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</div>

                {/* Features */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="dark:text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SKU & Stock */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">SKU:</span> {product.sku}
                  </div>
                  <div className="text-sm dark:text-white">
                    <span className="font-medium">Availability:</span>
                    <span
                      className={product.inStock ? "text-green-600" : "text-red-600"}
                    >
                      {product.inStock ? " In Stock" : " Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-x border-gray-300 dark:border-gray-600 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (product) addToCart(product, quantity);
                    }}
                    className="bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-2 px-6 rounded-full transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Secure Checkout */}
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2 dark:text-white">
                    Guaranteed Safe Checkout
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/images/payment-method-qris.jpg"
                      alt="Visa"
                      width={58}
                      height={25}
                    />
                    <Image
                      src="/images/payment-method-bca.jpg"
                      alt="American Express"
                      width={58}
                      height={25}
                    />
                    <Image
                      src="/images/payment-method-atmbersama.jpg"
                      alt="PayPal"
                      width={58}
                      height={25}
                    />
                  </div>
                </div>

                {/* Share */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium dark:text-white">Share:</span>
                  <div className="flex gap-2">
                    <a href="#" className="text-gray-400 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-red-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Related Products */}
          <RelatedProducts products={[product]} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


