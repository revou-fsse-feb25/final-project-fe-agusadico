'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Image from 'next/image'
import BookingTimeDisplay from '../../../../components/BookingTimeDisplay'

type OrderItemType = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category?: string;
};

type OrderDataType = {
  guestName: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      image: string;
      price: number;
      category?: string;
    };
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  rounding: number;
  total: number;
  paymentMethod: string;
  orderDate: string;
  orderId: string;
};

export default function ManualBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [orderData, setOrderData] = useState<OrderDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('Waiting for Payment');
  const [bookingInfo, setBookingInfo] = useState<{ mode: 'NOW' | 'SCHEDULED'; iso?: string }>({ mode: 'NOW' });

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll get it from localStorage
    const fetchOrderData = () => {
      setLoading(true);
      try {
        const storedData = localStorage.getItem('manualOrderData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setOrderData(parsedData);
          
          // Get booking info from order data or localStorage
          if (parsedData.booking) {
            setBookingInfo(parsedData.booking);
          } else {
            // Fallback to localStorage
            const storedBookingInfo = localStorage.getItem('bookingInfo');
            if (storedBookingInfo) {
              setBookingInfo(JSON.parse(storedBookingInfo));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [id]);

  const getPaymentMethodName = (method: string) => {
    switch(method) {
      case 'qris': return 'QRIS';
      case 'bank_transfer': return 'Bank Transfer';
      case 'cash': return 'Cash';
      default: return '';
    }
  };

  const getPaymentInstructions = (method: string) => {
    switch(method) {
      case 'qris': 
        return 'Please scan the QR code to complete your payment.';
      case 'bank_transfer': 
        return 'Please transfer to our bank account to complete your payment.';
      case 'cash': 
        return 'Please pay with cash at the counter when you pick up your order.';
      default: 
        return '';
    }
  };

  const handleCompletePayment = () => {
    setPaymentStatus('Completed');
    // In a real app, this would update the database
    alert('Payment status updated successfully!');
    router.push('/admin/order');
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="flex-1 bg-gray-50">
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
            <h1 className="text-xl font-bold">Manual Booking Detail</h1>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-center text-gray-600">Order not found</p>
          </div>
        </div>
      </div>
    );
  }

  // Transform cart items to order items format
  const orderItems: OrderItemType[] = orderData.items.map(item => ({
    id: item.product.id,
    name: item.product.name,
    image: item.product.image,
    quantity: item.quantity,
    price: item.product.price
  }));

  return (
    <div className="flex-1 bg-gray-50">
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
          <h1 className="text-xl font-bold">Manual Booking Detail</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Customer Booking Time, Payment Method and Customer Info */}
          <div>
            {/* Customer Booking Time */}
            <BookingTimeDisplay bookingInfo={bookingInfo} />
            
            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">PAYMENT METHOD</h2>
              <div className="flex items-center mb-4">
                {orderData.paymentMethod === 'cash' && (
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                )}
                {orderData.paymentMethod === 'qris' && (
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                )}
                {orderData.paymentMethod === 'bank_transfer' && (
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{getPaymentMethodName(orderData.paymentMethod)} Payment</h3>
                  <p className="text-sm text-gray-500">{getPaymentInstructions(orderData.paymentMethod)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {orderData.paymentMethod === 'cash' && `Please pay Rp${orderData.total.toFixed(2)} at the counter when you pick up your order.`}
              </p>
              <p className="text-sm text-gray-600">
                Your order will be prepared once you arrive at the restaurant.
              </p>
            </div>
            
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">CUSTOMER INFORMATION</h2>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{orderData.guestName}</p>
                </div>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">ORDER STATUS</h2>
              <div className="flex items-center mb-4">
                <p className="text-sm text-gray-500 mr-4">Order ID</p>
                <p className="font-medium">{orderData.orderId}</p>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Dine-In</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded">
                    {paymentStatus}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCompletePayment}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Complete and Change Payment Status
              </button>
            </div>
          </div>
          
          {/* Right Column - Order Items and Summary */}
          <div>
            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold mb-4">ORDER ITEM(S)</h2>
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">12 fl oz. 10 Pack Bottles</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.quantity}x</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Tax Base Pay</p>
                  <p className="font-medium">Rp{orderData.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Restaurant Tax (10%)</p>
                  <p className="font-medium">Rp{orderData.tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Rounding</p>
                  <p className="font-medium">Rp{orderData.rounding.toFixed(2)}</p>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between">
                    <p className="font-bold">TOTAL</p>
                    <p className="font-bold">Rp{orderData.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}