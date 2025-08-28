'use client'

import { useState, useEffect } from 'react'
import { CustomerType } from '../../../../types/customer'
import ActionMenu from '../../components/ActionMenu'
import { useRouter } from 'next/navigation'

// Helper functions for formatting data
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString || '-';
  }
};

export default function CustomerList() {
  const [customers, setCustomers] = useState<CustomerType[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [customersPerPage] = useState(10)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch customers from real API
    const fetchCustomers = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005'
        const response = await fetch(`${apiUrl}/customers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        
        if (!response.ok) {
          throw new Error(`Error fetching customers: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        setCustomers(data)
        setTotalPages(Math.ceil(data.length / customersPerPage))
      } catch (error) {
        console.error('Failed to fetch customers:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch customers')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCustomers()
  }, [customersPerPage])

  // Get current customers for pagination
  const indexOfLastCustomer = currentPage * customersPerPage
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer)

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
  const handleAcceptOrder = (customerId: string) => {
    console.log('Accept order for customer:', customerId)
  }

  const handleRejectOrder = (customerId: string) => {
    console.log('Reject order for customer:', customerId)
  }

  // Inside the CustomerList component, add this line near other hooks
  const router = useRouter()
  
  // Then update the handleViewDetails function
  const handleViewDetails = (customerId: string) => {
    router.push(`/admin/customer/${customerId}`)
  }

  // Toggle menu
  const toggleMenu = (customerId: string) => {
    setActiveMenu(activeMenu === customerId ? null : customerId)
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
        <h2 className="text-xl font-bold mb-6">Customer List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4 font-medium">Customer ID</th>
              <th className="p-4 font-medium">Join Date</th>
              <th className="p-4 font-medium">Customer Name</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Total Spent</th>
              <th className="p-4 font-medium">Last Order</th>
              <th className="p-4 font-medium">Edit</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            ) : (
              currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{customer.customerId || '-'}</td>
                  <td className="p-4 text-gray-700">{customer.joinDate ? formatDate(customer.joinDate) : '-'}</td>
                  <td className="p-4 text-gray-700">{customer.name || '-'}</td>
                  <td className="p-4 text-gray-700">{customer.location || '-'}</td>
                  <td className="p-4 text-gray-700">{customer.totalSpent ? formatCurrency(customer.totalSpent) : '-'}</td>
                  <td className="p-4">
                    {customer.lastOrder && customer.lastOrder.amount ? (
                      <span className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded">
                        {formatCurrency(customer.lastOrder.amount)}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-4 relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => toggleMenu(customer.id)}
                      aria-label="Menu"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                    
                    {activeMenu === customer.id && (
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
                            onClick: () => handleAcceptOrder(customer.id),
                            color: 'text-green-500'
                          },
                          {
                            label: 'Reject order',
                            icon: (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            ),
                            onClick: () => handleRejectOrder(customer.id),
                            color: 'text-red-500'
                          },
                          {
                            label: 'View details',
                            icon: (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            ),
                            onClick: () => handleViewDetails(customer.id),
                            color: 'text-blue-500'
                          }
                        ]}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {!error && totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
