'use client'

import { useState } from 'react'
import useSWR from 'swr'

type Order = {
  id: string
  customerName: string
  location: string
  price: number
  quantity: number
  status: 'PENDING' | 'DELIVERED' | 'CANCELED'
  productName: string
  productImage: string
}

// Mock data fetcher function
const fetchOrders = async (): Promise<Order[]> => {
  // In a real app, this would be an API call
  // const response = await fetch('/api/admin/orders')
  // if (!response.ok) throw new Error('Failed to fetch orders')
  // return response.json()
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return mock data
  return [
    {
      id: '#0010235',
      customerName: 'Jimmy Kuari',
      location: 'South Corner #41256 London',
      price: 7.4,
      quantity: 3,
      status: 'PENDING',
      productName: 'Legendary Chicken Ramen',
      productImage: '/images/menu/Legendary-Chicken-Ramen.jpg'
    },
    {
      id: '#0010299',
      customerName: 'Kinda Alexa',
      location: 'Blue Ocean st.41551 London',
      price: 8.2,
      quantity: 1,
      status: 'DELIVERED',
      productName: 'Karaage Dry Ramen',
      productImage: '/images/menu/Karaage-Dry-Ramen.jpg'
    },
    {
      id: '#0010236',
      customerName: 'Peter Parkur',
      location: 'Franklin Avenue st.66525 London',
      price: 4.2,
      quantity: 2,
      status: 'CANCELED',
      productName: 'Chicken Katsudon',
      productImage: '/images/menu/Chicken-Katsudon.jpg'
    },
    {
      id: '#0010235',
      customerName: 'Jimmy Kuari',
      location: 'South Corner #41256 London',
      price: 7.4,
      quantity: 3,
      status: 'PENDING',
      productName: 'Legendary Ramen',
      productImage: '/images/menu/Legendary-Chicken-Ramen.jpg'
    },
    {
      id: '#0010299',
      customerName: 'Cindy Alexa',
      location: 'Blue Ocean st.41551 London',
      price: 8.2,
      quantity: 1,
      status: 'CANCELED',
      productName: 'Chicken Katsudon',
      productImage: '/images/menu/Chicken-Katsudon.jpg'
    }
  ]
}

export default function RecentOrderList() {
  const [sortBy, setSortBy] = useState('newest')
  
  // Use SWR for data fetching with automatic revalidation
  const { data: orders, error, isLoading, isValidating } = useSWR<Order[]>(
    '/api/admin/orders', 
    fetchOrders, 
    {
      refreshInterval: 10000, // Refresh every 5 seconds
      revalidateOnFocus: true, // Revalidate when tab becomes active
      dedupingInterval: 2000, // Deduplicate requests within 2 seconds
      errorRetryCount: 3, // Retry 3 times on error
      errorRetryInterval: 5000, // Wait 5 seconds between retries
    }
  )
  
  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'CANCELED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  
  // Sort orders based on selected option
  const sortedOrders = orders ? [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.id.localeCompare(b.id)
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      case 'newest':
      default:
        return b.id.localeCompare(a.id)
    }
  }) : []
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Order Request</h3>
          <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center p-3 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-200 rounded-md mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Order Request</h3>
        </div>
        <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Error loading orders. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm font-medium text-red-700 hover:text-red-900"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  // Empty state
  if (sortedOrders.length === 0 && !isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold">Recent Order Request</h3>
        </div>
        <div className="py-8 text-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>No orders found</p>
        </div>
      </div>
    )
  }
  
  // Data loaded successfully
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Recent Order Request</h3>
        <div className="relative">
          <select 
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background refreshing indicator */}
      {isValidating && !isLoading && (
        <div className="mb-4">
          <div className="h-0.5 bg-blue-200 overflow-hidden">
            <div className="w-full h-full bg-blue-600 animate-pulse"></div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {sortedOrders.map((order, index) => (
          <div key={`${order.id}-${index}`} className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
                <img 
                  src={order.productImage} 
                  alt={order.productName} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">{order.productName}</h4>
                <p className="text-xs text-gray-500">{order.id}</p>
              </div>
            </div>
            
            <div className="flex-1 mx-6">
              <p className="font-medium text-sm">{order.customerName}</p>
              <p className="text-xs text-gray-500">{order.location}</p>
            </div>
            
            <div className="text-right">
              <p className="font-medium">${order.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500">x{order.quantity}</p>
            </div>
            
            <div className="ml-6">
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <button className="ml-4 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-red-600 text-sm font-medium flex items-center justify-center mx-auto">
          View More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}