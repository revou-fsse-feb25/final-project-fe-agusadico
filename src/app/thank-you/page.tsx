'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ProductType } from '../../types/product';
import { notifySuccess } from '@/lib/notifications';

// Define types for the component
type CartItem = {
  product: ProductType;
  quantity: number;
};

type CustomerData = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

type BookingInfo = {
  mode: 'NOW' | 'SCHEDULED';
  iso?: string;
};

type OrderData = {
  orderItems: CartItem[];
  orderID: string;
  pickupNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  customerData?: CustomerData;
  isMember?: boolean;
  paymentMethod?: string;
  orderType?: string;
  orderLocation?: string;
  booking?: BookingInfo;
};

export default function ThankYouPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    mode: 'NOW',
    iso: new Date().toISOString()
  });
  
  useEffect(() => {
    // Show order success notification when the page loads
    notifySuccess('Order placed successfully! Thank you for your purchase.');
    // Get order data from localStorage
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      try {
        const parsedOrderData = JSON.parse(storedOrderData) as OrderData;
        setOrderData(parsedOrderData);
        
        // If order has booking info, use that
        if (parsedOrderData.booking) {
          setBookingInfo(parsedOrderData.booking);
        } else {
          // Otherwise try to get booking info from localStorage
          const storedBookingInfo = localStorage.getItem('bookingInfo');
          if (storedBookingInfo) {
            try {
              setBookingInfo(JSON.parse(storedBookingInfo));
            } catch (error) {
              console.error('Error parsing booking info:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    } else {
      // If no order data, try to get booking info from localStorage
      const storedBookingInfo = localStorage.getItem('bookingInfo');
      if (storedBookingInfo) {
        try {
          setBookingInfo(JSON.parse(storedBookingInfo));
        } catch (error) {
          console.error('Error parsing booking info:', error);
        }
      }
    }
    setLoading(false);
  }, []);
  
  // Format the scheduled date for display
  const formatScheduledDate = (isoString: string) => {
    const date = new Date(isoString);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
    
    return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">No order data found</h1>
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            Return to Home
          </button>
        </Link>
      </div>
    );
  }
  
  const { 
    orderItems = [], 
    orderID, 
    pickupNumber, 
    subtotal = 0, 
    tax = 0, 
    total = 0, 
    customerData, 
    isMember,
    paymentMethod,
    orderType,
    orderLocation 
  } = orderData;
  
  return (
    <div className="min-h-screen flex flex-col content-body mt-25">
      {/* Navigation */}
      <Navbar />
      
      {/* Thank You Content */}
      <div className="flex-1 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-6 rounded-lg shadow-sm mb-6 text-center">
            <div className="w-20 h-20 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 dark:text-white">Thank You for Your Order!</h1>
            <p className="text-lg dark:text-gray-300">Your order has been successfully placed.</p>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
            
            {/* Booking Time Display */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 text-center">
              <h3 className="font-bold mb-2 dark:text-white">Your Time Booking</h3>
              <div className="mb-1">
                {bookingInfo.mode === 'NOW' ? (
                  <span className="font-medium dark:text-white">Book Now — ASAP</span>
                ) : (
                  <span className="font-medium dark:text-white">Scheduled</span>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {bookingInfo.iso && formatScheduledDate(bookingInfo.iso)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Order ID and Pickup Number */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Order ID:</span>
                  <span className="font-medium dark:text-white">{orderID}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pickup Number:</span>
                  <span className="font-bold text-red-600">{pickupNumber}</span>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                  <span className="font-medium dark:text-white">
                    {paymentMethod === 'qris' && 'QRIS'}
                    {paymentMethod === 'bank_transfer' && 'Bank Transfer'}
                    {paymentMethod === 'cash' && 'Cash'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs px-2 py-1 rounded font-medium">Completed</span>
                </div>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mt-4">
              <h3 className="font-bold mb-3 dark:text-white">Order Status</h3>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium dark:text-white">{orderType || 'Dine-In'}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{orderLocation || 'TEBET'}</p>
                </div>
                <div className="ml-auto bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs px-2 py-1 rounded">
                  Order Placed
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <h3 className="font-bold mb-3 mt-6 dark:text-white">Order Items</h3>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-md overflow-hidden mr-3 relative">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium dark:text-white">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.product.description || 'Standard'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium dark:text-white">{item.quantity}x</span>
                      <p className="text-sm text-gray-600 dark:text-gray-300">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                  <p>No items in this order.</p>
                </div>
              )}
            </div>
            
            {/* Order Totals */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{isMember ? "Member Information" : "Customer Information"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name - shown for both guest and member */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm text-gray-600">Customer Name</h4>
                  <p className="font-medium">{customerData?.name || 'Guest'}</p>
                </div>
              </div>
              
              {/* Additional information shown only for members */}
              {isMember && (
                <>
                  {/* Phone Number */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-600">Phone Number</h4>
                      <p className="font-medium">{customerData?.phone || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-600">Email</h4>
                      <p className="font-medium">{customerData?.email || 'N/A'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Feedback Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">How was your experience?</h2>
            <p className="text-gray-600 mb-4">We'd love to hear your feedback! Please take a moment to rate your experience and leave a review on Google.</p>
            
            <a 
              href="https://maps.app.goo.gl/gR5zxcNVCVYGJeAE7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors text-center"
            >
              Leave a Review on Google
            </a>
          </div>
          
          {/* Return to Home */}
          <div className="text-center">
            <Link href="/">
              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-md transition-colors">
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}