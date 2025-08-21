'use client'

import { useState, useEffect } from 'react'
import { OrderDetailType } from '../../../../types/order'
import { useParams } from 'next/navigation'
import Image from 'next/image'

// Mock data for order details
const MOCK_ORDER_DETAILS: { [key: string]: OrderDetailType } = {
  '1': {
    id: '1',
    orderId: '#5552311',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Olivia Shine',
    typeOrder: 'Dine In',
    amount: 82.46,
    status: 'PENDING',
    items: [
      {
        id: '101',
        name: 'Mango Yakult',
        image: '/images/menu/Mango-Yakult.jpg',
        quantity: 1,
        price: 4.12
      },
      {
        id: '102',
        name: 'Chicken Katsudon',
        image: '/images/menu/Chicken-Katsudon.jpg',
        quantity: 3,
        price: 14.99
      },
      {
        id: '103',
        name: 'Legendary Ramen',
        image: '/images/menu/Legendary-Chicken-Ramen.jpg',
        quantity: 2,
        price: 15.44
      }
    ],
    customer: {
      id: '4',
      name: 'Olivia Shine',
      email: 'olivia.shine@example.com',
      phone: '+1 (555) 123-4567',
      address: '35 Station Road London',
      image: '/images/profile-pic.webp'
    },
    billing: {
      name: 'Olivia Shine',
      address: '35 Station Road, Marylebone, London',
      postalCode: 'W1U 4AA'
    },
    shipping: {
      name: 'Olivia Shine',
      address: '35 Station Road, Marylebone, London',
      postalCode: 'W1U 4AA'
    },
    note: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s.'
  },
  '2': {
    id: '2',
    orderId: '#5552322',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Samantha Bake',
    typeOrder: 'Take Away',
    amount: 22.18,
    status: 'DELIVERED',
    items: [
      {
        id: '201',
        name: 'Chicken Katsudon',
        image: '/images/menu/Chicken-Katsudon.jpg',
        quantity: 1,
        price: 12.99
      },
      {
        id: '202',
        name: 'No Nori Gyoza Skin',
        image: '/images/menu/No-Nori-Gyoza-Skin.jpg',
        quantity: 2,
        price: 4.59
      }
    ],
    customer: {
      id: '5',
      name: 'Samantha Bake',
      email: 'samantha.bake@example.com',
      phone: '+1 (555) 987-6543',
      address: '42 Baker Street London',
      image: '/images/profile-pic.webp'
    },
    billing: {
      name: 'Samantha Bake',
      address: '42 Baker Street, Westminster, London',
      postalCode: 'W1U 6TY'
    },
    shipping: {
      name: 'Samantha Bake',
      address: '42 Baker Street, Westminster, London',
      postalCode: 'W1U 6TY'
    },
    note: 'Please deliver to the reception desk.'
  },
  // Add more mock data for other order IDs
  '3': {
    id: '3',
    orderId: '#5552323',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Veronica',
    typeOrder: 'Dine In',
    amount: 74.92,
    status: 'PENDING',
    items: [
      {
        id: '301',
        name: 'Legendary Chicken Ramen',
        image: '/images/menu/Legendary-Chicken-Ramen.jpg',
        quantity: 2,
        price: 16.99
      },
      {
        id: '302',
        name: 'Nori Gyoza Skin',
        image: '/images/menu/Nori-Gyoza-Skin.jpg',
        quantity: 1,
        price: 8.99
      },
      {
        id: '303',
        name: 'Mango Yakult',
        image: '/images/menu/Mango-Yakult.jpg',
        quantity: 2,
        price: 5.99
      }
    ],
    customer: {
      id: '2',
      name: 'Veronica',
      email: 'veronica@example.com',
      phone: '+1 (555) 456-7890',
      address: '21 King Street London',
      image: '/images/profile-pic.webp'
    },
    billing: {
      name: 'Veronica',
      address: '21 King Street, Chelsea, London',
      postalCode: 'SW3 4RP'
    },
    shipping: {
      name: 'Veronica',
      address: '21 King Street, Chelsea, London',
      postalCode: 'SW3 4RP'
    },
    note: 'Extra chopsticks please.'
  },
  // Add more mock data for other order IDs as needed
};

// Status Dropdown Component
const StatusDropdown = ({ 
  initialStatus, 
  orderId, 
  onStatusChange 
}: { 
  initialStatus: OrderDetailType['status'], 
  orderId: string,
  onStatusChange: (newStatus: OrderDetailType['status']) => void 
}) => {
  const [status, setStatus] = useState<OrderDetailType['status']>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const getStatusClass = (statusValue: OrderDetailType['status']) => {
    switch (statusValue) {
      case 'PENDING':
        return 'bg-yellow-500 text-white';
      case 'DELIVERED':
        return 'bg-green-500 text-white';
      case 'CANCELED':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderDetailType['status'];
    setStatus(newStatus);
    setIsUpdating(true);
    
    try {
      // Since the API endpoint doesn't exist yet, we'll simulate a successful response
      // In a real implementation, uncomment this code and create the API endpoint
      /*
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update parent component state
      onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
      // Revert to previous status on error
      setStatus(initialStatus);
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <span className="inline-block relative">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none cursor-pointer text-xs font-medium px-2 py-1 rounded ${getStatusClass(status)} pr-8`}
      >
        <option value="PENDING" className="bg-white text-black">PENDING</option>
        <option value="DELIVERED" className="bg-white text-black">DELIVERED</option>
        <option value="CANCELED" className="bg-white text-black">CANCELED</option>
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1">
        <svg className="fill-current h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>
      {isUpdating && (
        <span className="ml-2 text-xs text-gray-500">Updating...</span>
      )}
    </span>
  );
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [orderDetail, setOrderDetail] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [parsedDate, setParsedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderDetail = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/orders/${id}`);
        // const data = await response.json();
        
        // Using mock data instead
        setTimeout(() => {
          const detail = MOCK_ORDER_DETAILS[id] || null;
          setOrderDetail(detail);
          
          // Parse the date
          if (detail) {
            // Try to parse from ISO string if available
            if (detail.createdAt) {
              setParsedDate(new Date(detail.createdAt));
            } else if (detail.bookedAtIso) {
              setParsedDate(new Date(detail.bookedAtIso));
            } else {
              // Parse from date string (e.g., "26 March 2023, 12:42 AM")
              try {
                const dateParts = detail.date.split(', ');
                if (dateParts.length === 2) {
                  const [datePart, timePart] = dateParts;
                  // Convert to a format JavaScript can parse
                  const dateStr = `${datePart} ${timePart}`;
                  setParsedDate(new Date(dateStr));
                }
              } catch (error) {
                console.error('Error parsing date:', error);
              }
            }
          }
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setLoading(false);
      }
    };
    
    fetchOrderDetail();
  }, [id]);

  // Format date with weekday
  const formatDate = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format time
  const formatTime = (date: Date | null) => {
    if (!date || isNaN(date.getTime())) return 'Invalid time';
    
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Calculate totals
  const calculateSubtotal = () => {
    if (!orderDetail) return 0;
    return orderDetail.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const grandTotal = subtotal + tax;

  // Get status badge color
  const getStatusBadgeClass = (status: OrderDetailType['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500 text-white';
      case 'DELIVERED':
        return 'bg-green-500 text-white';
      case 'CANCELED':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Handle status change
  const handleStatusChange = (newStatus: OrderDetailType['status']) => {
    if (orderDetail) {
      setOrderDetail({
        ...orderDetail,
        status: newStatus
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!orderDetail) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Order Not Found</h3>
          <p className="text-gray-500">The order you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Order Detail</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Left Content - 3 columns */}
        <div className="lg:col-span-3">
          {/* General Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">General</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Order Information</h4>
                <p className="mb-1"><span className="font-medium">Order ID:</span> {orderDetail.orderId}</p>
                <p className="mb-1"><span className="font-medium">Date:</span> {formatDate(parsedDate)}</p>
                <p className="mb-1"><span className="font-medium">Time:</span> {formatTime(parsedDate)}</p>
                <p className="mb-1"><span className="font-medium">Type Order:</span> {orderDetail.typeOrder}</p>
                <div className="mb-1 flex items-center">
                  <span className="font-medium">Status:</span> 
                  <StatusDropdown 
                    initialStatus={orderDetail.status} 
                    orderId={orderDetail.id}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </div>
              
              {/* Billing */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Billing</h4>
                <p className="mb-1"><span className="font-medium">Name:</span> {orderDetail.billing.name}</p>
                <p className="mb-1"><span className="font-medium">Address:</span> {orderDetail.billing.address}</p>
                <p className="mb-1"><span className="font-medium">Postal Code:</span> {orderDetail.billing.postalCode}</p>
                <p className="mb-1"><span className="font-medium">Email address:</span> {orderDetail.customer.email}</p>
                <p className="mb-1"><span className="font-medium">Phone:</span> {orderDetail.customer.phone}</p>
              </div>
              
              {/* Shipping */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Shipping</h4>
                <p className="mb-1"><span className="font-medium">Name:</span> {orderDetail.shipping.name}</p>
                <p className="mb-1"><span className="font-medium">Address:</span> {orderDetail.shipping.address}</p>
                <p className="mb-1"><span className="font-medium">Postal Code:</span> {orderDetail.shipping.postalCode}</p>
              </div>
            </div>
            
            {/* Chat Customer Button */}
            <div className="mt-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Chat Customer
              </button>
            </div>
          </div>
          
          {/* Items Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="p-4 font-medium">Item</th>
                    <th className="p-4 font-medium">Qty</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Total Price</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.items.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">${item.price.toFixed(2)}</td>
                      <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-4">
                        <button className="text-red-500 hover:text-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Order Totals */}
            <div className="mt-6 flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="border-t border-b border-gray-200 py-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Tax (10% PPN):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                {orderDetail.customer.image && (
                  <img 
                    src={orderDetail.customer.image} 
                    alt={orderDetail.customer.name} 
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div>
                <h4 className="font-medium">{orderDetail.customer.name}</h4>
                <p className="text-sm text-gray-500">Customer</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{orderDetail.customer.phone}</span>
              </div>
              
              <div className="flex items-start mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{orderDetail.customer.address}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium mb-2">Note Order</h4>
              <p className="text-sm text-gray-600">{orderDetail.note || 'No notes for this order.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}