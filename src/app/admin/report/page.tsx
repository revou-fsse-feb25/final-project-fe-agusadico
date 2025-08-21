'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getCurrentUser } from '../../../lib/auth/client'
import PeriodSelector from './components/PeriodSelector'
import RevenueChart from './components/RevenueChart'
import SalesSummary from './components/SalesSummary'
import OrderedItemsTable from './components/OrderedItemsTable'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

type Period = 'daily' | 'weekly' | 'monthly'

export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('daily')

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
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Analytics Report</h2>
        <PeriodSelector 
          selectedPeriod={selectedPeriod} 
          onChange={(period) => setSelectedPeriod(period as Period)} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Revenue</h3>
          <RevenueChart period={selectedPeriod} />
        </div>
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Sales Summary</h3>
          <SalesSummary period={selectedPeriod} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Most Ordered Items</h3>
          <OrderedItemsTable period={selectedPeriod} type="most" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Low Ordered Items</h3>
          <OrderedItemsTable period={selectedPeriod} type="least" />
        </div>
      </div>
    </div>
  )
}