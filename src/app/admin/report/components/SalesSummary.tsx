'use client'

import { useState, useEffect } from 'react'

type SalesSummaryData = {
  totalOrders: number
  totalRevenue: number
}

type SalesSummaryProps = {
  period: 'daily' | 'weekly' | 'monthly'
}

export default function SalesSummary({ period }: SalesSummaryProps) {
  const [data, setData] = useState<SalesSummaryData | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchSalesSummary = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/sales-summary?period=${period}`)
        // const data = await response.json()
        
        // Mock data based on period
        let mockData: SalesSummaryData
        
        if (period === 'daily') {
          mockData = {
            totalOrders: 85,
            totalRevenue: 4875
          }
        } else if (period === 'weekly') {
          mockData = {
            totalOrders: 320,
            totalRevenue: 18250
          }
        } else {
          mockData = {
            totalOrders: 1250,
            totalRevenue: 67325
          }
        }
        
        // Simulate API delay
        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching sales summary:', error)
        setLoading(false)
      }
    }
    
    fetchSalesSummary()
  }, [period])
  
  if (loading || !data) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse h-full w-full bg-gray-200 rounded"></div>
      </div>
    )
  }
  
  // Calculate average order value
  const averageOrderValue = data.totalRevenue / data.totalOrders
  
  return (
    <div className="h-64 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        {/* Circular progress chart */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="10"
            />
            
            {/* Revenue progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="10"
              strokeDasharray="251.2"
              strokeDashoffset="62.8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            
            {/* Orders progress circle */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="10"
              strokeDasharray="188.4"
              strokeDashoffset="94.2"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
            
            {/* Inner circle */}
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="10"
              strokeDasharray="125.6"
              strokeDashoffset="31.4"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-medium text-gray-500">Avg. Order</span>
            <span className="text-lg font-bold">${averageOrderValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-500">Total Orders</span>
          </div>
          <p className="text-xl font-bold mt-1">{data.totalOrders}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <span className="text-sm text-gray-500">Revenue</span>
          </div>
          <p className="text-xl font-bold mt-1">${data.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}