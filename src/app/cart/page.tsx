'use client'

import Image from "next/image";
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-4 mt-25">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">Cart</span>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-lg mb-4">Your cart is empty</p>
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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-4">Remove</th>
                        <th className="text-left p-4">Thumbnail</th>
                        <th className="text-left p-4">Product Title</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Quantity</th>
                        <th className="text-left p-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.product.id} className="border-b border-gray-200">
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
                              <Image 
                                src={item.product.image} 
                                alt={item.product.name} 
                                fill
                                className="object-contain"
                              />
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-gray-500">SKU: {item.product.sku || 'BG-1006'}</p>
                            </div>
                          </td>
                          <td className="p-4">${item.product.price.toFixed(2)}</td>
                          <td className="p-4">
                            <div className="flex items-center border border-gray-300 rounded-md w-min">
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <input 
                                type="text" 
                                value={item.quantity} 
                                readOnly 
                                className="w-10 text-center border-x border-gray-300 py-1"
                              />
                              <button 
                                onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-4">${(item.product.price * item.quantity).toFixed(2)}</td>
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
                    className="border border-gray-300 rounded-md py-2 px-4 flex-grow focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
                  
                  <div className="border-b border-gray-200 py-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className="flex justify-between font-bold">
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