'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import UserSidebar from './components/UserSidebar'

export default function AccountPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()
  
  // Handle authentication status changes
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  // Show loading state
  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </>
    )
  }
  
  // Don't render anything if not authenticated (will redirect in useEffect)
  if (status === 'unauthenticated') {
    return null
  }

  // Render appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-2 dark:text-white">Orders</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">View and track your orders</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-2 dark:text-white">Addresses</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your delivery addresses</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium text-lg mb-2 dark:text-white">Account Details</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Update your profile and preferences</p>
              </div>
            </div>
          </div>
        )
      case 'orders':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Orders</h1>
            <p className="text-gray-600 dark:text-gray-300">View and track your order history.</p>
            {/* Order history would go here */}
            <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="dark:text-gray-300">You haven't placed any orders yet.</p>
            </div>
          </div>
        )
      case 'address':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Addresses</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your shipping and billing addresses.</p>
            {/* Address management would go here */}
            <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="dark:text-gray-300">No addresses saved yet.</p>
            </div>
          </div>
        )
      case 'account':
        return (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Details</h1>
            <p className="text-gray-600 dark:text-gray-300">Update your account information.</p>
            {/* Account details form would go here */}
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                <p className="font-medium dark:text-white">{session?.user?.name}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium dark:text-white">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Select a tab from the sidebar</div>
    }
  }

  // Customer dashboard for authenticated customers
  return (
    <>
      <Navbar />
      <div className="min-h-screen content-body py-10 mt-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Sidebar */}
            <UserSidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              userName={session?.user?.name || 'User'} 
            />
            
            {/* Main content area */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}