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
}

// This is a mock product data - in a real app, you would fetch this from an API
const products: Product[] = [
  {
    id: 1,
    name: "Legendary Chicken Ramen",
    category: "Ramen",
    price: 12,
    originalPrice: 14,
    discount: "5%",
    image: "/images/menu/Legendary-Chicken-Ramen.jpg",
    //pack: "12 oz",
    description:
      "Rich, flavorful chicken broth paired with premium ramen noodles, juicy grilled chicken, and perfectly cooked egg. Every bowl promises an authentic, legendary ramen experience.",
    features: [
      "Slow-cooked chicken broth for deep flavor",
      "Premium ramen noodles with perfect texture",
      "Topped with tender grilled chicken & fresh toppings",
    ],
    sku: "RAM-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [2, 3, 4],
  },
  {
    id: 2,
    name: "Karaage Dry Ramen",
    category: "Dry Ramen",
    price: 6,
    originalPrice: 12,
    discount: "5%",
    image: "/images/menu/Karaage-Dry-Ramen.jpg",
    //pack: "12 oz",
    description:
      "Irresistibly crispy Japanese fried chicken atop dry ramen, tossed with a savory, aromatic sauce and fresh garnishes for a bold, modern flavor twist.",
    features: [
      "Crispy karaage chicken chunks",
      "Rich, umami-packed dry sauce",
      "Fresh veggies & signature Japanese seasoning",
    ],
    sku: "DRYRM-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [1, 3, 4],
  },
  {
    id: 3,
    name: "Chicken Katsudon",
    category: "Donburi",
    price: 10,
    originalPrice: 12,
    discount: "5%",
    image: "/images/menu/Chicken-Katsudon.jpg",
    //pack: "12 oz",
    description:
      "Classic Japanese rice bowl with crispy chicken cutlet, savory-sweet sauce, and fluffy steamed rice. Comforting and satisfying in every bite.",
    features: [
      "Golden fried chicken cutlet",
      "Homemade katsudon sauce",
      "Served over fluffy Japanese rice",
    ],
    sku: "KTSD-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [1, 2, 4],
  },
  {
    id: 4,
    name: "Chicken Curry Katsudon",
    category: "Donburi",
    price: 10,
    originalPrice: 12,
    discount: "5%",
    image: "/images/menu/Chicken-Curry-Katsudon.jpg",
    //pack: "12 oz",
    description:
      "A fusion of crispy chicken katsu, savory Japanese curry, and steamed rice. Each bowl delivers hearty flavor with a touch of spice.",
    features: [
      "Crispy chicken katsu cutlet",
      "Rich Japanese curry sauce",
      "Hearty, filling rice bowl meal",
    ],
    sku: "KTSD-002",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [1, 2, 3],
  },
  {
    id: 5,
    name: "Seafood Spicy Crunchy Roll",
    category: "Sushi",
    price: 40000,
    originalPrice: 45000,
    discount: "5%",
    image: "/images/menu/Seafood-Spicy-Cruncy-Roll.jpg",
    //pack: "12 oz",
    description:
      "A delectable roll packed with fresh seafood, a kick of spice, and a crispy crunch in every bite. Perfect for sushi lovers who crave bold flavor.",
    features: [
      "Premium mixed seafood filling",
      "Crispy tempura crunch topping",
      "Spicy mayo drizzle for an extra kick",
    ],
    sku: "SSH-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [6, 7, 8],
  },
  {
    id: 6,
    name: "Mango Yakult",
    category: "Drinks",
    price: 40000,
    originalPrice: 45000,
    discount: "5%",
    image: "/images/menu/Mango-Yakult.jpg",
    //pack: "12 oz",
    description:
      "Refreshing blend of sweet mango and tangy Yakult, served cold for a revitalizing, probiotic-packed drink that energizes your day.",
    features: [
      "Made with real mango puree",
      "Probiotic-rich Yakult base",
      "Naturally sweet & tangy flavor combo",
    ],
    sku: "DRK-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [1, 5, 7],
  },
  {
    id: 7,
    name: "Nori Gyoza Skin",
    category: "Agemono & Gyoza",
    price: 40000,
    originalPrice: 45000,
    discount: "5%",
    image: "/images/menu/Nori-Gyoza-Skin.jpg",
    //pack: "12 oz",
    description:
      "Crispy pan-fried gyoza wrapped in nori-infused skin, filled with juicy chicken and savory spices. Ideal as an appetizer or main dish.",
    features: [
      "Unique nori seaweed-infused skin",
      "Juicy, seasoned chicken filling",
      "Perfectly crisped for delicious texture",
    ],
    sku: "AGM-001",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [3, 5, 8],
  },
  {
    id: 8,
    name: "Seafood Maki Sushi Rolls",
    category: "Sushi",
    price: 40000,
    originalPrice: 45000,
    discount: "5%",
    image: "/images/menu/Seafood-Maki-Sushi-Rolls.jpg",
    //pack: "12 oz",
    description:
      "Classic maki sushi rolls featuring a generous portion of fresh seafood, wrapped in vinegared rice and seaweed. A must-try for sushi enthusiasts.",
    features: [
      "Fresh mixed seafood selection",
      "Traditional vinegared sushi rice",
      "Hand-rolled in premium nori sheets",
    ],
    sku: "SSH-002",
    rating: 4.5,
    reviewCount: 125,
    inStock: true,
    relatedProducts: [5, 6, 7],
  },
];

export default function ProductDetail() {
  const params = useParams();
  const productId = Number(params.id);
  const [loading, setLoading] = useState(false);
  const product = products.find((p) => p.id === productId) || products[0];
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Create an array of images for the product
  const productImages = [
    product.image,
    "/images/menu/legendary-ramen-2.jpg",
    "/images/menu/legendary-ramen-3.jpg",
    "/images/menu/legendary-ramen-4.jpg",
  ];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

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
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-25">
      {/* Navigation */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/menu" className="hover:text-red-600">
              Menu
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Images */}
              <div className="md:w-2/5">
                <div className="sticky top-4">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-contain max-h-[400px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {/* Thumbnail images */}
                    {productImages.map((image, index) => (
                      <div 
                        key={index}
                        className={`border rounded p-2 cursor-pointer ${
                          selectedImage === image 
                            ? 'border-red-500' 
                            : 'border-gray-200 hover:border-red-500'
                        }`}
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="md:w-3/5">
                <div className="text-sm text-gray-500 mb-2">
                  {product.category}
                </div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
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
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded ml-2">
                      -{product.discount}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="text-gray-600 mb-6">{product.description}</div>

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
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SKU & Stock */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">SKU:</span> {product.sku}
                  </div>
                  <div className="text-sm">
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
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-12 text-center border-x border-gray-300 py-2"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100"
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
                  <div className="text-sm font-medium mb-2">
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
                  <span className="text-sm font-medium">Share:</span>
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
          <RelatedProducts products={products} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


