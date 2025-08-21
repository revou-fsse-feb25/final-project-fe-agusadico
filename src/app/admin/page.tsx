'use client'

import { Suspense, useEffect, useState } from 'react'
import Header from './components/Header'
import StatCards from './components/StatCards'
import RecentOrderList from './components/RecentOrderList'
import TrendingMenuWrapper from './components/TrendingMenuWrapper'
import { getCurrentUser } from '../../lib/auth/client';

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

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
      {/* <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mb-8"> */}
        <StatCards />
      {/* </div> */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentOrderList />
        </div>
        <div className="lg:col-span-1">
          <TrendingMenuWrapper />
        </div>
      </div>
    </div>
  )
}