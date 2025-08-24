'use client'

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OrderTypeSelector from '../../components/OrderTypeSelector';
import OrderOptions from '../../components/OrderOptions';
import BookingTime from '../../components/BookingTime'; // Add this import
import { useCart } from '../../context/CartContext';
import PaymentMethodModal from '../../components/PaymentMethodModal';
import { useRouter } from 'next/navigation';

type FormInputs = {
  name: string;
  phone: string;
  email: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

type GuestFormInputs = {
  name: string;
};

export default function CheckoutPage() {
  const { cartItems, getCartTotal, updateQuantity } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('Dine-In');
  const [orderLocation, setOrderLocation] = useState<string>('TEBET');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [orderOption, setOrderOption] = useState<string>('guest'); // 'guest', 'form', or 'login'
  const [guestName, setGuestName] = useState<string>('');
  const [bookingInfo, setBookingInfo] = useState<{ mode: 'NOW' | 'SCHEDULED'; iso?: string }>({ mode: 'NOW' }); // Add this state
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginInputs>();

  const {
    register: registerGuest,
    handleSubmit: handleSubmitGuest,
    formState: { errors: guestErrors },
    watch: watchGuest,
  } = useForm<GuestFormInputs>();
  
  // Watch for changes in the guest name field
  useEffect(() => {
    const subscription = watchGuest((value, { name }) => {
      if (name === 'name') {
        setGuestName(value.name || '');
      }
    });
    return () => subscription.unsubscribe();
  }, [watchGuest]);
  
  // Update the onSubmit function in the checkout page
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // Store payment method in localStorage before redirecting
    localStorage.setItem('selectedPaymentMethod', paymentMethod);
    
    // Store order type and location in localStorage
    localStorage.setItem('orderType', orderType);
    localStorage.setItem('orderLocation', orderLocation);
    
    // Store booking information in localStorage
    localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    
    // Store customer data based on order option
    if (orderOption === 'guest' && guestName) {
      localStorage.setItem('customerData', JSON.stringify({
        name: guestName,
        isMember: false
      }));
    } else if (orderOption === 'form') {
      localStorage.setItem('customerData', JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        isMember: true
      }));
    }
    
    // Here you would typically process the order
    router.push('/orderdetail');
  };

  const onLoginSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log('Login data:', data);
    // Here you would typically authenticate the user
    alert('Logged in successfully!');
    // After successful login, you might want to load user data
  };

  const handleOrderTypeChange = (type: string) => {
    setOrderType(type);
  };

  const handleSelectPayment = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
  };

  const handleOrderOptionChange = (option: string) => {
    setOrderOption(option);
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  // Add this handler for booking time changes
  const handleBookingTimeChange = (value: { mode: 'NOW' | 'SCHEDULED'; iso?: string }) => {
    setBookingInfo(value);
    console.log('Booking info updated:', value);
  };

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
            <Link href="/cart" className="hover:text-red-600">Cart</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 dark:text-gray-200">Checkout</span>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Back button */}
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <Link href="/cart">
                <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  DINE-IN - TEBET
                </button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Customer Info */}
            <div className="lg:w-1/2">
              {/* Order Options Component */}
              <OrderOptions 
                orderOption={orderOption}
                onOrderOptionChange={handleOrderOptionChange}
                registerGuest={registerGuest}
              />
              
              {/* Order Type Selector Component */}
              <OrderTypeSelector 
                orderType={orderType}
                orderLocation={orderLocation}
                onOrderTypeChange={handleOrderTypeChange}
              />
              
              {/* Order List - Moved here from Payment Detail section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">ORDER LIST</h2>
                
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-3 relative">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.product.name}</h3>
                        {/* <p className="text-sm text-gray-500">{item.product.pack || 'Standard'}</p> */}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md mr-4">
                        <button 
                          className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 border-x border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <button className="text-red-600 text-sm font-medium hover:text-red-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Add More
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-900 dark:text-gray-100">Purchase more to get FREE PRODUCT.</span>
                  <button className="text-red-600 text-sm font-medium ml-auto">More Details</button>
                </div>
              </div>
            </div>
            
            {/* Payment Detail */}
            <div className="lg:w-1/2">
              <div className="sticky top-30 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all duration-300">
                {/* Add BookingTime component here, above the Payment Detail heading */}
                <BookingTime 
                  defaultMode="NOW"
                  onChange={handleBookingTimeChange}
                />
                
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">PAYMENT DETAIL</h2>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-gray-900 dark:text-gray-100">{paymentMethod ? getPaymentMethodName(paymentMethod) : "Select payment method"}</span>
                    <button 
                      onClick={() => setShowPaymentModal(true)} 
                      className="text-red-600 font-medium"
                    >
                      Select
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between mb-2 text-gray-900 dark:text-gray-100">
                    <span className="text-gray-600 dark:text-gray-400">Tax Base Pay</span>
                    <span>Rp{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-900 dark:text-gray-100">
                    <span className="text-gray-600 dark:text-gray-400">Restaurant Tax (10%)</span>
                    <span>Rp{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-900 dark:text-gray-100">
                    <span className="text-gray-600 dark:text-gray-400">Rounding</span>
                    <span>Rp0</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                  <div className="flex justify-between items-center text-gray-900 dark:text-gray-100">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">Rp{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors mt-6"
                >
                  Order Now!
                </button>
              </div>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

const getPaymentMethodName = (method: string) => {
  switch(method) {
    case 'qris':
      return 'QRIS';
    case 'bank_transfer':
      return 'Bank Transfer';
    case 'cash':
      return 'Cash';
    default:
      return 'Select payment method';
  }
};