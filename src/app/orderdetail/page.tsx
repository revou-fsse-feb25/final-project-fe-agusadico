'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EmailReceiptModal from '../../components/EmailReceiptModal';
import BookingTimeDisplay from '../../components/BookingTimeDisplay';
import ReceiptPrintWrapper from '../../components/ReceiptPrintWrapper';
import { useCart } from '../../context/CartContext';

export default function OrderDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [orderID, setOrderID] = useState('02M07VZNZSA005');
  const [pickupNumber, setPickupNumber] = useState('NA005');
  const [paymentTimeLeft, setPaymentTimeLeft] = useState(54 * 60 + 3); // 54 minutes and 3 seconds
  const [orderItems, setOrderItems] = useState<typeof cartItems>([]);
  const [paymentMethod, setPaymentMethod] = useState('qris'); // Default to QRIS
  
  // Order type and location state
  const [orderType, setOrderType] = useState('Dine-In'); // Default to Dine-In
  const [orderLocation, setOrderLocation] = useState('TEBET'); // Default location
  
  // Booking information state
  const [bookingInfo, setBookingInfo] = useState<{
    mode: 'NOW' | 'SCHEDULED';
    iso?: string;
  }>({
    mode: 'NOW',
    iso: new Date().toISOString()
  });
  
  // Customer data state
  const [isMember, setIsMember] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "Guest",
    phone: "",
    email: "",
    city: "",
    address: ""
  });
  
  // Email receipt modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Save cart items to orderItems, get payment method, and get customer data on component mount
  useEffect(() => {
    // Save the current cart items before clearing
    setOrderItems(cartItems);
    
    // Get the selected payment method from localStorage
    const storedPaymentMethod = localStorage.getItem('selectedPaymentMethod');
    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
    
    // Get order type and location from localStorage
    const storedOrderType = localStorage.getItem('orderType');
    if (storedOrderType) {
      setOrderType(storedOrderType);
    }
    
    const storedOrderLocation = localStorage.getItem('orderLocation');
    if (storedOrderLocation) {
      setOrderLocation(storedOrderLocation);
    }
    
    // Get booking information from localStorage
    const storedBookingInfo = localStorage.getItem('bookingInfo');
    if (storedBookingInfo) {
      try {
        const parsedBookingInfo = JSON.parse(storedBookingInfo);
        setBookingInfo(parsedBookingInfo);
      } catch (error) {
        console.error("Error parsing booking info:", error);
        // If there's an error, set default booking info with current time
        setBookingInfo({
          mode: 'NOW',
          iso: new Date().toISOString()
        });
      }
    } else {
      // If no booking info in localStorage, set default with current time
      setBookingInfo({
        mode: 'NOW',
        iso: new Date().toISOString()
      });
    }
    
    // If user is authenticated with customer role, use session data
    if (status === 'authenticated' && session?.user?.role === 'customer') {
      setIsMember(true);
      setCustomerData({
        name: session.user.name || "Guest",
        phone: customerData.phone,
        email: session.user.email || "",
        city: customerData.city,
        address: customerData.address
      });
    } else {
      // Get customer data from localStorage for non-authenticated users
      const storedCustomerData = localStorage.getItem('customerData');
      if (storedCustomerData) {
        try {
          const parsedData = JSON.parse(storedCustomerData);
          setIsMember(parsedData.isMember || false);
          
          // Update customer data
          setCustomerData({
            name: parsedData.name || "Guest",
            phone: parsedData.phone || "",
            email: parsedData.email || "",
            city: parsedData.city || "",
            address: parsedData.address || ""
          });
        } catch (error) {
          console.error("Error parsing customer data:", error);
        }
      }
    }
    
    // Clear the cart
    clearCart();
    
    // Remove cart from localStorage to ensure it's cleared across sessions
    localStorage.removeItem('cart');
  }, [status, session]);
  
  // Calculate order summary
  const subtotal = orderItems.length > 0 
    ? orderItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    : getCartTotal(); // Fallback to cart total if orderItems not yet set
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  // Format time remaining for payment
  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} secs`;
  };
  
  // Countdown timer for payment
  useEffect(() => {
    // Skip setting up timer if payment time is 0 or payment method is cash
    if (paymentTimeLeft <= 0 || paymentMethod === 'cash') return;
    
    // Create interval only once when the component mounts
    const timer = setInterval(() => {
      setPaymentTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, []);

  // Get payment method display name
  const getPaymentMethodName = (method: string) => {
    switch(method) {
      case 'qris':
        return 'QRIS';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return 'QRIS';
    }
  };
  
  // Handle sending receipt via email
  const handleSendReceipt = (name: string, email: string) => {
    // In a real application, you would send an API request here
    console.log(`Sending receipt to ${name} at ${email}`);
    
    // Close the modal and show success message
    setIsEmailModalOpen(false);
    setEmailSent(true);
    
    // Update customer data with the email for future use
    setCustomerData(prev => ({
      ...prev,
      name,
      email
    }));
    
    // Store updated customer data in localStorage
    localStorage.setItem('customerData', JSON.stringify({
      ...customerData,
      name,
      email
    }));
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  };
  
  // Handle finish order
  const handleFinishOrder = () => {
    // Store order data in localStorage for the thank-you page
    localStorage.setItem('orderData', JSON.stringify({
      orderItems,
      orderID,
      pickupNumber,
      subtotal,
      tax,
      total,
      customerData,
      isMember,
      paymentMethod,
      orderType,
      orderLocation
    }));
    
    // Redirect to thank-you page
    router.push('/thank-you');
  };
  
  return (
    <div className="min-h-screen flex flex-col content-body">
      {/* Navigation */}
      <Navbar />
      
      {/* Order Detail Content */}
      <div className="flex-1 py-6 px-4 mt-25">
        <div className="max-w-6xl mx-auto"> {/* Increased max-width for better desktop layout */}
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Link href="/">
              <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ORDER DETAIL
              </button>
            </Link>
          </div>
          
          {/* Success message when email is sent */}
          {emailSent && (
            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-md mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Receipt has been sent to your email successfully!</span>
            </div>
          )}
          
          {/* Booking Time Display - Full Width at Top */}
          <BookingTimeDisplay bookingInfo={bookingInfo} />
          
          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Payment Method Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              {paymentTimeLeft > 0 && paymentMethod !== 'cash' && (
                <div className="bg-red-100 dark:bg-red-900/20 text-red-600 p-3 rounded-md mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    <p>Please complete the payment in:</p>
                    <p className="mt-1 text-xl font-semibold text-red-600">
                      {formatTimeRemaining(paymentTimeLeft)}
                    </p>
                  </div>
                </div>
              )}
              
              <h3 className="text-center font-bold mb-3 dark:text-white">PAYMENT METHOD</h3>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-4">
                {paymentMethod === 'qris' && 'Please scan this QR to make a payment or Download this QR'}
                {paymentMethod === 'bank_transfer' && 'Please transfer to the bank account below'}
                {paymentMethod === 'cash' && 'Please pay with cash at the counter'}
              </p>
              
              {/* QRIS Payment */}
              {paymentMethod === 'qris' && (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                      {/* QR Code Image */}
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                        alt="QRIS Payment QR Code" 
                        className="w-40 h-40"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button className="flex items-center text-red-600 font-medium">
                      <span>Download QR</span>
                      <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
              
              {/* Bank Transfer Payment */}
              {paymentMethod === 'bank_transfer' && (
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Bank BCA</p>
                      <p className="text-sm text-gray-600">Restaurant Account</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md mb-3">
                    <p className="text-sm text-gray-600 mb-1">Account Number:</p>
                    <div className="flex justify-between items-center">
                      <p className="font-medium">1234 5678 9012 3456</p>
                      <button className="text-red-600 text-sm">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                          <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600 mb-1">Account Name:</p>
                    <p className="font-medium">PT Restaurant Indonesia</p>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">
                    Please transfer the exact amount of <span className="font-medium">${total.toFixed(2)}</span> and include your Order ID <span className="font-medium">{orderID}</span> in the transfer description.
                  </p>
                </div>
              )}
              
              {/* Cash Payment */}
              {paymentMethod === 'cash' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium mb-2">Cash Payment</p>
                  <p className="text-sm text-gray-600">
                    Please pay <span className="font-medium">${total.toFixed(2)}</span> at the counter when you pick up your order.
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Your order will be prepared once you arrive at the restaurant.
                  </p>
                </div>
              )}
            </div>
            
            {/* Right Column - Order Items and Summary */}
            <div className="space-y-4">
              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-bold mb-4">ORDER ITEM(S)</h3>
                
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">{item.product.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{item.quantity}x</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h3 className="font-bold mb-3">ORDER SUMMARY</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax Base Pay</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Restaurant Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold mt-4">
                  <span>TOTAL</span>
                  <span>Rp{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Row beneath with Pickup Number and Order Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Pickup Number */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">PICKUP NUMBER</h3>
                <span className="font-bold text-red-600">{pickupNumber}</span>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-bold mb-3">ORDER STATUS</h3>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Order ID</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{orderID}</span>
                  <button className="text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-sm font-medium">{orderType}</span>
                  <p className="text-xs text-gray-500">{orderLocation}</p>
                </div>
                <div className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                  Waiting for Payment
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Information - Full Width */}
          <div className="bg-white rounded-lg shadow-sm p-5 mt-4">
            <h3 className="font-bold mb-3">{status === 'authenticated' && session?.user?.role === 'customer' ? "MEMBER INFORMATION" : "CUSTOMER INFORMATION"}</h3>
            
            <div className="space-y-3">
              {/* Customer Name - shown for both guest and member */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Customer Name</h4>
                  <p className="text-sm text-gray-600">
                    {status === 'authenticated' && session?.user?.role === 'customer' 
                      ? session.user.name 
                      : customerData.name}
                  </p>
                </div>
              </div>
              
              {/* Role - shown only for authenticated users */}
              {status === 'authenticated' && session?.user?.role === 'customer' && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Role</h4>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>
              )}
              
              {/* Email - shown for authenticated users */}
              {status === 'authenticated' && session?.user?.role === 'customer' && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-600">{session.user.email}</p>
                  </div>
                </div>
              )}
              
              {/* Additional information shown only for members from localStorage */}
              {isMember && !session && (
                <>
                  {/* Phone Number */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Phone Number</h4>
                      <p className="text-sm text-gray-600">{customerData.phone}</p>
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
                    <div className="flex-1">
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-gray-600">{customerData.email}</p>
                    </div>
                  </div>
                  
                  {/* City */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">City</h4>
                      <p className="text-sm text-gray-600">{customerData.city}</p>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden mr-3 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Address</h4>
                      <p className="text-sm text-gray-600">{customerData.address}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Action Buttons - Full Width */}
          <div className="mt-6">
            <button 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              onClick={() => {
                // Trigger print functionality
                console.log('Print button clicked');
                console.log('printReceipt function available:', !!(window as any).printReceipt);
                if ((window as any).printReceipt) {
                  (window as any).printReceipt();
                } else {
                  console.error('Print function not available');
                }
              }}
            >
              Print Receipt
            </button>
            {/* Send Receipt to Email Button */}
            <button 
              className="w-full bg-orange-400 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-md transition-colors mt-2"
              onClick={() => setIsEmailModalOpen(true)}
            >
              Send Receipt to My Email
            </button>
            {/* Finish Order Button */}
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition-colors mt-2"
              onClick={handleFinishOrder}
            >
              Finish Order
            </button>
          </div>
          
          {/* Contact Us */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4 flex justify-between items-center">
            <span className="text-sm">Having trouble?</span>
            <span className="text-red-600 font-bold">Contact Us: 081234567890</span>
          </div>
        </div>
      </div>

      {/* Receipt Print Wrapper - Hidden but accessible for printing */}
      <ReceiptPrintWrapper
        orderID={orderID}
        pickupNumber={pickupNumber}
        customerName={customerData.name}
        orderItems={orderItems}
        orderType={orderType}
        orderLocation={orderLocation}
        paymentMethod={paymentMethod}
        bookingInfo={{
          mode: bookingInfo.mode,
          iso: bookingInfo.mode === 'NOW' ? new Date().toISOString() : (bookingInfo.iso || new Date().toISOString())
        }}
        total={total}
        onPrint={() => console.log('Receipt printed successfully')}
      />

      {/* Email Receipt Modal */}
      <EmailReceiptModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        customerName={customerData.name}
        customerEmail={customerData.email}
        onSend={handleSendReceipt}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
