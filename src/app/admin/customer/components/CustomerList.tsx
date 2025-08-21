'use client'

import { useState, useEffect } from 'react'
import { CustomerType } from '../../../../types/customer'
import ActionMenu from '../../components/ActionMenu'
import { useRouter } from 'next/navigation'

// Mock data for customers
const MOCK_CUSTOMERS: CustomerType[] = [
  {
    id: '1',
    customerId: '#5552351',
    name: 'James Whiteley',
    email: 'james.whiteley@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: 'Corner Street 5th London',
    totalSpent: 194.82,
    lastOrder: {
      amount: 14.85,
      date: '2023-10-15'
    }
  },
  {
    id: '2',
    customerId: '#5552323',
    name: 'Veronica',
    email: 'veronica@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: '21 King Street London',
    totalSpent: 74.92,
    lastOrder: {
      amount: 9.13,
      date: '2023-10-12'
    }
  },
  {
    id: '3',
    customerId: '#5552375',
    name: 'Emilia Johanson',
    email: 'emilia.johanson@example.com',
    joinDate: '26 March 2020, 03:12 AM',
    location: '67 St. John\'s Road London',
    totalSpent: 251.16,
    lastOrder: {
      amount: 13.91,
      date: '2023-10-10'
    }
  },
  {
    id: '4',
    customerId: '#5552311',
    name: 'Olivia Shine',
    email: 'olivia.shine@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: '35 Station Road London',
    totalSpent: 52.46,
    lastOrder: {
      amount: 14.85,
      date: '2023-10-08'
    }
  },
  {
    id: '5',
    customerId: '#5552388',
    name: 'Jessica Wong',
    email: 'jessica.wong@example.com',
    joinDate: '26 March 2020, 03:12 AM',
    location: '11 Church Road',
    totalSpent: 24.17,
    lastOrder: {
      amount: 11.41,
      date: '2023-10-05'
    }
  },
  {
    id: '6',
    customerId: '#5552358',
    name: 'David Holsten',
    email: 'david.holsten@example.com',
    joinDate: '26 March 2020, 01:42 PM',
    location: '981 St. John\'s Road London',
    totalSpent: 24.55,
    lastOrder: {
      amount: 17.37,
      date: '2023-10-03'
    }
  },
  {
    id: '7',
    customerId: '#5552322',
    name: 'Samantha Bake',
    email: 'samantha.bake@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: '79 The Drive London',
    totalSpent: 22.18,
    lastOrder: {
      amount: 11.41,
      date: '2023-09-29'
    }
  },
  {
    id: '8',
    customerId: '#5552397',
    name: 'Franky Sihotang',
    email: 'franky.sihotang@example.com',
    joinDate: '26 March 2020, 03:12 AM',
    location: '6 The Avenue London',
    totalSpent: 45.86,
    lastOrder: {
      amount: 18.98,
      date: '2023-09-25'
    }
  },
  {
    id: '9',
    customerId: '#5552349',
    name: 'Roberto Carlo',
    email: 'roberto.carlo@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: '544 Manor Road London',
    totalSpent: 34.41,
    lastOrder: {
      amount: 11.41,
      date: '2023-09-20'
    }
  },
  {
    id: '10',
    customerId: '#5552356',
    name: 'Randy Greenlea',
    email: 'randy.greenlea@example.com',
    joinDate: '26 March 2020, 03:12 AM',
    location: '32 The Green London',
    totalSpent: 44.99,
    lastOrder: {
      amount: 19.98,
      date: '2023-09-15'
    }
  },
];

export default function CustomerList() {
  const [customers, setCustomers] = useState<CustomerType[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const customersPerPage = 10

  useEffect(() => {
    // Simulate API call to fetch customers
    const fetchCustomers = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/customers')
        // const data = await response.json()
        
        // Using mock data instead
        setTimeout(() => {
          setCustomers(MOCK_CUSTOMERS)
          setTotalPages(Math.ceil(MOCK_CUSTOMERS.length / customersPerPage))
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching customers:', error)
        setLoading(false)
      }
    }
    
    fetchCustomers()
  }, [])

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
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-700">{customer.customerId}</td>
                <td className="p-4 text-gray-700">{customer.joinDate}</td>
                <td className="p-4 text-gray-700">{customer.name}</td>
                <td className="p-4 text-gray-700">{customer.location}</td>
                <td className="p-4 text-gray-700">${customer.totalSpent.toFixed(2)}</td>
                <td className="p-4">
                  <span className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded">
                    ${customer.lastOrder.amount.toFixed(2)}
                  </span>
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
                          label: 'View Details',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleViewDetails(customer.id),
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
          Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, customers.length)} of {customers.length} entries
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