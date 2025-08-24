'use client'

import Link from "next/link";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const subtotal = getCartTotal();
  const total = subtotal; // In a real app, you might add tax, shipping, etc.

  return (
    <div className="min-h-screen flex flex-col content-body">
      {/* Navigation */}
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 dark:border-gray-700 py-4 mt-25">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 dark:text-gray-200">Cart</span>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm text-center">
              <p className="text-lg mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</p>
              <Link href="/menu">
                <button className="bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-2 px-6 rounded-full transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Remove</th>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Thumbnail</th>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Product Title</th>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Price</th>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Quantity</th>
                        <th className="text-left p-4 text-gray-900 dark:text-gray-100">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.product.id} className="border-b border-gray-200 dark:border-gray-600">
                          <td className="p-4">
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                          <td className="p-4">
                            <div className="w-16 h-16 relative">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {item.product.sku || 'BG-1006'}</p>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-gray-100">${item.product.price.toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md w-min">
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                value={item.quantity} 
                                readOnly 
                                className="w-10 text-center border-x border-gray-300 dark:border-gray-600 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              />
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-gray-900 dark:text-gray-100">${(item.product.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Coupon Code */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    className="border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 flex-grow focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button className="bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Apply Coupon
                  </button>
                </div>
              </div>
              
              {/* Cart Totals */}
              <div className="lg:w-1/3">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cart Totals</h2>
                  
                  <div className="border-b border-gray-200 dark:border-gray-600 py-4">
                    <div className="flex justify-between mb-2 text-gray-900 dark:text-gray-100">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link href="/checkout">
                    <button className="w-full bg-[var(--primary-color)] hover:bg-[#990000] text-white font-medium py-3 px-6 rounded-md transition-colors mt-4">
                      Proceed to checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}