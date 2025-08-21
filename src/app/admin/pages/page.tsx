'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import { getCurrentUser } from '../../../lib/auth/client'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function AdminPages() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
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

  const navigateTo = (path: string) => {
    router.push(path);
  };

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
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Manage Pages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Event Button */}
          <button 
            onClick={() => navigateTo('/admin/pages/event')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-medium">Event</span>
          </button>
          
          {/* About Button */}
          <button 
            onClick={() => navigateTo('/admin/about')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.95-4.419 2.95A1 1 0 014 16V4zm4 1a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-medium">About</span>
          </button>
          
          {/* Promo Button */}
          <button 
            onClick={() => navigateTo('/admin/pages/promo')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-medium">Promo</span>
          </button>
          
          {/* FAQ Button */}
          <button 
            onClick={() => navigateTo('/admin/faq')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-medium">FAQ</span>
          </button>
          
          {/* Contact Button */}
          <button 
            onClick={() => navigateTo('/admin/contact')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <span className="text-xl font-medium">Contact</span>
          </button>
          
          {/* Setting Button */}
          <button 
            onClick={() => navigateTo('/admin/pages/setting')}
            className="restaurant-bg text-white rounded-lg p-6 flex flex-col items-center justify-center hover:bg-rose-600 transition-colors h-48"
          >
            <div className="w-20 h-20 mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-medium">Setting</span>
          </button>
        </div>
      </div>
    </div>
  )
}