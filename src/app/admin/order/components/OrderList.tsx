'use client'

import { useState, useEffect } from 'react'
import { OrderType } from '../../../../types/order'
import ActionMenu from '../../components/ActionMenu'
import { useRouter } from 'next/navigation'

// Mock data for orders
const MOCK_ORDERS: OrderType[] = [
  {
    id: '1',
    orderId: '#5552311',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Olivia Shine',
    typeOrder: 'Dine In',
    amount: 82.46,
    status: 'PENDING'
  },
  {
    id: '2',
    orderId: '#5552322',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Samantha Bake',
    typeOrder: 'Take Away',
    amount: 22.18,
    status: 'DELIVERED'
  },
  {
    id: '3',
    orderId: '#5552323',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Veronica',
    typeOrder: 'Dine In',
    amount: 74.92,
    status: 'PENDING'
  },
  {
    id: '4',
    orderId: '#5552349',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Roberto Carlo',
    typeOrder: 'Take Away',
    amount: 34.41,
    status: 'PENDING'
  },
  {
    id: '5',
    orderId: '#5552351',
    date: '26 March 2023, 12:42 AM',
    customerName: 'James Whiteley',
    typeOrder: 'Dine In',
    amount: 194.82,
    status: 'DELIVERED'
  },
  {
    id: '6',
    orderId: '#5552356',
    date: '26 March 2023, 03:12 AM',
    customerName: 'Randy Greenlea',
    typeOrder: 'Take Away',
    amount: 44.99,
    status: 'PENDING'
  },
  {
    id: '7',
    orderId: '#5552358',
    date: '26 March 2023, 01:42 PM',
    customerName: 'David Holsten',
    typeOrder: 'Dine In',
    amount: 24.55,
    status: 'DELIVERED'
  },
  {
    id: '8',
    orderId: '#5552366',
    date: '26 March 2023, 12:42 AM',
    customerName: 'Randy Greenlea',
    typeOrder: 'Dine In',
    amount: 44.99,
    status: 'DELIVERED'
  },
  {
    id: '9',
    orderId: '#5552368',
    date: '26 March 2023, 01:42 PM',
    customerName: 'David Holsten',
    typeOrder: 'Take Away',
    amount: 24.55,
    status: 'PENDING'
  },
  {
    id: '10',
    orderId: '#5552375',
    date: '26 March 2023, 03:12 AM',
    customerName: 'Emilia Johanson',
    typeOrder: 'Dine In',
    amount: 251.16,
    status: 'CANCELED'
  },
];

export default function OrderList() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderType[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const ordersPerPage = 10
  
  // Cache for parsed dates
  const [parsedDates, setParsedDates] = useState<{[key: string]: Date}>({})

  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/orders')
        // const data = await response.json()
        
        // Using mock data instead
        setTimeout(() => {
          setOrders(MOCK_ORDERS)
          setTotalPages(Math.ceil(MOCK_ORDERS.length / ordersPerPage))
          
          // Parse dates once and cache them
          const dateCache: {[key: string]: Date} = {}
          MOCK_ORDERS.forEach(order => {
            if (!dateCache[order.id]) {
              // Try to parse from ISO string if available (createdAt or bookedAtIso)
              if (order.createdAt) {
                dateCache[order.id] = new Date(order.createdAt)
              } else if (order.bookedAtIso) {
                dateCache[order.id] = new Date(order.bookedAtIso)
              } else {
                // Parse from date string (e.g., "26 March 2023, 12:42 AM")
                try {
                  const dateParts = order.date.split(', ')
                  if (dateParts.length === 2) {
                    const [datePart, timePart] = dateParts
                    // Convert to a format JavaScript can parse
                    const dateStr = `${datePart} ${timePart}`
                    dateCache[order.id] = new Date(dateStr)
                  }
                } catch (error) {
                  console.error('Error parsing date:', error)
                }
              }
            }
          })
          
          setParsedDates(dateCache)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  // Format date with weekday
  const formatDate = (date: Date | undefined) => {
    if (!date || isNaN(date.getTime())) return 'Invalid date'
    
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Format time
  const formatTime = (date: Date | undefined) => {
    if (!date || isNaN(date.getTime())) return 'Invalid time'
    
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Action handlers
  const handleAcceptOrder = (orderId: string) => {
    console.log('Accept order:', orderId)
  }

  const handleRejectOrder = (orderId: string) => {
    console.log('Reject order:', orderId)
  }

  const handleViewDetails = (id: string) => {
    // Navigate to order detail page
    router.push(`/admin/order/${id}`)
  }

  // Toggle menu
  const toggleMenu = (orderId: string) => {
    setActiveMenu(activeMenu === orderId ? null : orderId)
  }

  // Get status badge color
  const getStatusBadgeClass = (status: OrderType['status']) => {
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
  }

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
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Order List</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Time</th>
              <th className="p-4 font-medium">Customer Name</th>
              <th className="p-4 font-medium">Type Order</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status Order</th>
              <th className="p-4 font-medium">Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-700">{order.orderId}</td>
                <td className="p-4 text-gray-700">{formatDate(parsedDates[order.id])}</td>
                <td className="p-4 text-gray-700">{formatTime(parsedDates[order.id])}</td>
                <td className="p-4 text-gray-700">{order.customerName}</td>
                <td className="p-4 text-gray-700">{order.typeOrder}</td>
                <td className="p-4 text-gray-700">${order.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 relative">
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => toggleMenu(order.id)}
                    aria-label="Menu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  
                  {activeMenu === order.id && (
                    <ActionMenu
                      isOpen={true}
                      onClose={() => setActiveMenu(null)}
                      actions={[
                        {
                          label: 'Accept order',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleAcceptOrder(order.id),
                          color: 'text-green-500'
                        },
                        {
                          label: 'Reject order',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleRejectOrder(order.id),
                          color: 'text-red-500'
                        },
                        {
                          label: 'View Details',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleViewDetails(order.id),
                          color: 'text-gray-500'
                        },
                      ]}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 flex justify-between items-center border-t">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, orders.length)} of {orders.length} entries
        </div>
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">{currentPage}</span>
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}