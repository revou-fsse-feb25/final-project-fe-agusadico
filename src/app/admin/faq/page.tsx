'use client'

// Remove the revalidatePath import if it exists
// import { revalidatePath } from 'next/cache'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import { getCurrentUser } from '../../../lib/auth/client'
import FAQList from './components/FAQList'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function AdminFAQPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [activeCategory, setActiveCategory] = useState('account')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in as admin
    const checkAdminAuth = async () => {
      try {
        setIsLoading(true);
        
        // First check client-side token
        const clientUser = getCurrentUser();
        
        // If we have a valid client-side token, use it immediately
        if (clientUser) {
          setUser(clientUser);
          setIsLoading(false);
          return;
        }
        
        // If no client-side token, verify with server
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Admin auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <Header user={user} />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage FAQ Page</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Left sidebar with category tabs */}
          <div className="md:col-span-1">
            <div className="sticky top-4 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <button 
                className={`w-full text-left px-4 py-3 border-l-4 ${activeCategory === 'account' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent hover:bg-gray-50'}`}
                onClick={() => setActiveCategory('account')}
              >
                Account
              </button>
              <button 
                className={`w-full text-left px-4 py-3 border-l-4 ${activeCategory === 'refund' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent hover:bg-gray-50'}`}
                onClick={() => setActiveCategory('refund')}
              >
                Refund
              </button>
              <button 
                className={`w-full text-left px-4 py-3 border-l-4 ${activeCategory === 'order' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent hover:bg-gray-50'}`}
                onClick={() => setActiveCategory('order')}
              >
                Order
              </button>
              <button 
                className={`w-full text-left px-4 py-3 border-l-4 ${activeCategory === 'payment' ? 'border-red-500 bg-red-50 text-red-700' : 'border-transparent hover:bg-gray-50'}`}
                onClick={() => setActiveCategory('payment')}
              >
                Payment
              </button>
            </div>
          </div>
          
          {/* Right content area */}
          <div className="md:col-span-3">
            <FAQList category={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  )
}