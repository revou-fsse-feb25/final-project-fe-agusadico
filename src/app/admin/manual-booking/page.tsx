'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Header from '../components/Header'
import { useCart } from '../../../context/CartContext'
import { ProductType } from '../../../types/product'
import { useDebounce } from '../../../hooks/useDebounce'
import { getFilteredAndSortedProducts } from '../../../utils/productUtils'
import PaymentMethodModal from '../../../components/PaymentMethodModal'
import BookingTime from '../../../components/BookingTime'

// Mock products data (same as in menu page)
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
    name: "Seafood Spicy Cruncy Roll",
    category: "Sushi",
    price: 10.00,
    originalPrice: 14.00,
    discount: "29%",
    image: "/images/menu/Seafood-Spicy-Cruncy-Roll.jpg",
    //pack: "12 fl oz, 10 Pack Bottles"
  },
  {
    id: 6,
    name: "MangO Yakult",
    category: "Drinks",
    price: 34.00,
    originalPrice: 44.00,
    discount: "23%",
    image: "/images/menu/Mango-Yakult.jpg",
    //pack: "12 fl oz, 10 Pack Bottles"
  },
  {
    id: 7,
    name: "Gyoza",
    category: "Agemono & Gyoza",
    price: 8.00,
    originalPrice: 10.00,
    discount: "20%",
    image: "/images/menu/Nori-Gyoza-Skin.jpg",
    //pack: "12 fl oz, 10 Pack Bottles"
  },
  {
    id: 8,
    name: "Seafood Maki Sushi Rolls",
    category: "Sushi",
    price: 9.00,
    originalPrice: 12.00,
    discount: "25%",
    image: "/images/menu/Seafood-Maki-Sushi-Rolls.jpg",
    //pack: "12 fl oz, 10 Pack Bottles"
  }
];

// Categories with counts
const categories = [
  { name: "All Categories", count: products.length },
  { name: "Ramen", count: 10 },
  { name: "Dry Ramen", count: 8 },
  { name: "Katsu Set", count: 6 },
  { name: "Donburi", count: 5 },
  { name: "Sushi", count: 9 },
  { name: "Agemono & Gyoza", count: 4 },
  { name: "Drinks", count: 3 },
  { name: "Topping", count: 7 },
];

export default function ManualBookingPage() {
  const router = useRouter();
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [guestName, setGuestName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [bookingInfo, setBookingInfo] = useState<{ mode: 'NOW' | 'SCHEDULED'; iso?: string }>({ mode: 'NOW' });
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
  // Filter products based on search query and category
  const filteredProducts = getFilteredAndSortedProducts(
    products,
    debouncedSearchQuery,
    selectedCategory === 'All Categories' ? '' : selectedCategory,
    'default'
  );
  
  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const rounding = Math.ceil(subtotal + tax) - (subtotal + tax);
  const total = subtotal + tax + rounding;
  
  const handleSelectPayment = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
    setPaymentError(''); // Clear any previous error
  };
  
  const handleOrderNow = () => {
    // Validate payment method is selected
    if (!paymentMethod) {
      setPaymentError('Please select a payment method');
      return;
    }
    
    // In a real app, you would save the order to the database here
    // For now, we'll just simulate a successful order and redirect
    const orderData = {
      guestName,
      items: cartItems,
      subtotal,
      tax,
      rounding,
      total,
      paymentMethod,
      orderDate: new Date().toISOString(),
      orderId: Math.floor(Math.random() * 1000000).toString(),
      booking: bookingInfo // Add booking information to order data
    };
    
    // Save order data to localStorage for demo purposes
    localStorage.setItem('manualOrderData', JSON.stringify(orderData));
    localStorage.setItem('selectedPaymentMethod', paymentMethod);
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo)); // Save booking info
    
    // Clear the cart
    clearCart();
    
    
    // Redirect to manual booking detail page
    alert('Order placed successfully!');
    router.push(`/admin/manual-booking/${orderData.orderId}`);
  };
  
  // Helper function to get payment method display name
  const getPaymentMethodName = (method: string) => {
    switch(method) {
      case 'qris': return 'QRIS';
      case 'bank_transfer': return 'Bank Transfer';
      case 'cash': return 'Cash';
      default: return '';
    }
  };
  
  return (
    <div className="flex-1 p-8 overflow-auto">
      <Header user={null} />
      
      <div className="p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Manual Booking</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Guest Info, Product Search, and Product Grid */}
          <div>
            {/* Guest Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">GUEST INFO</h2>
              <div className="mb-4">
                <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guest name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            {/* Product Category & Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.slice(0, 8).map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-32 bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -{product.discount}
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-2 rounded-full transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Cart and Payment Details */}
          <div>
            {/* Cart Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md mr-4">
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 border-x border-gray-300">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-4">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Coupon Code */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border border-gray-300 rounded-md py-2 px-4 flex-grow focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                  Apply Coupon
                </button>
              </div>
            </div>
            
            {/* Customer Booking Time Section */}
            <BookingTime 
              defaultMode="NOW"
              onChange={(value) => setBookingInfo(value)}
            />
            
            {/* Payment Detail Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">PAYMENT DETAIL</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-4">
                <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md">
                  <span>{paymentMethod ? getPaymentMethodName(paymentMethod) : "Select payment method"}</span>
                  <button 
                    onClick={() => setShowPaymentModal(true)} 
                    className="text-red-600 font-medium"
                  >
                    Select
                  </button>
                </div>
                {paymentError && (
                  <p className="text-red-500 text-sm mt-1">{paymentError}</p>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax/Service (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Rounding</span>
                  <span>${rounding.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleOrderNow}
                disabled={cartItems.length === 0}
                className={`w-full ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white font-medium py-3 px-6 rounded-md transition-colors mt-6`}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Method Modal */}
      <PaymentMethodModal
        showModal={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPayment={paymentMethod}
        onSelectPayment={handleSelectPayment}
      />
    </div>
  );
}