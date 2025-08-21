'use client'

import { useState, useEffect } from 'react'

type StatData = {
  menus: { count: number, change: number, newItems?: number },
  orders: { count: number, change: number, newOrders?: number },
  customers: { count: number, change: number, newCustomers?: number },
  income: { amount: number, change: number, previousAmount?: number }
}

// Custom tooltip component
type TooltipProps = {
  content: React.ReactNode
  children: React.ReactNode
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 w-48 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg -top-1 left-full ml-2 transform -translate-y-full max-w-[90vw] sm:max-w-xs">
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
        </div>
      )}
    </div>
  )
}

export default function StatCards() {
  const [stats, setStats] = useState<StatData>({
    menus: { count: 0, change: 0, newItems: 0 },
    orders: { count: 0, change: 0, newOrders: 0 },
    customers: { count: 0, change: 0, newCustomers: 0 },
    income: { amount: 0, change: 0, previousAmount: 0 }
  })
  const [loading, setLoading] = useState(true)
  const [prevStats, setPrevStats] = useState<StatData | null>(null)
  
  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // await fetch('/api/admin/dashboard')
        
        // Save previous stats for animation
        if (!loading) {
          setPrevStats({...stats})
        }
        
        // Mock data
        setTimeout(() => {
          setStats({
            menus: { count: 56, change: 2.4, newItems: 3 },
            orders: { count: 785, change: 3.7, newOrders: 12 },
            customers: { count: 56, change: -1.5, newCustomers: 5 },
            income: { amount: 6231, change: -3.7, previousAmount: 6470 }
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setLoading(false)
      }
    }
    
    fetchStats()
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Card component for consistent styling
  const StatCard = ({ 
    title, 
    value, 
    change, 
    tooltipContent, 
    icon, 
    iconBg, 
    iconColor,
    ariaLabel
  }: { 
    title: string, 
    value: string | number, 
    change: number, 
    tooltipContent: React.ReactNode, 
    icon: React.ReactNode, 
    iconBg: string, 
    iconColor: string,
    ariaLabel: string
  }) => {
    // Check if value has changed for animation
    const hasChanged = prevStats && 
      ((title === "Income" && prevStats.income.amount !== stats.income.amount) ||
       (title === "Menus" && prevStats.menus.count !== stats.menus.count) ||
       (title === "Orders" && prevStats.orders.count !== stats.orders.count) ||
       (title === "Customers" && prevStats.customers.count !== stats.customers.count))
    
    return (
      <div 
        className={`bg-white p-6 rounded-lg shadow-md flex justify-between items-start transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-400 ${hasChanged ? 'animate-pulse-once' : ''} h-full`}
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <div className="flex flex-col justify-between h-full">
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold transition-all duration-300">{value}</h3>
          <div className="flex items-center mt-auto pt-3">
            <span 
              className={`text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}
              aria-label={`${change >= 0 ? 'Increased' : 'Decreased'} by ${Math.abs(change)}%`}
            >
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
        <Tooltip content={tooltipContent}>
          <div 
            className={`${iconBg} p-3 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            tabIndex={0}
          >
            <div className={`${iconColor} h-6 w-6`} aria-hidden="true">
              {icon}
            </div>
          </div>
        </Tooltip>
      </div>
    )
  }
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-lg shadow-md animate-pulse transition-all duration-300 h-[140px]"
            aria-label="Loading statistics"
          >
            <div className="flex justify-between items-start h-full">
              <div className="w-full flex flex-col justify-between h-full">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mt-auto"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-full flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 mb-8">
      {/* Menus Card */}
      <StatCard
        title="Menus"
        value={stats.menus.count}
        change={stats.menus.change}
        tooltipContent={
          <div>
            <p className="font-medium mb-1">Menu Statistics</p>
            <p>New items: {stats.menus.newItems}</p>
            <p>Growth rate: {stats.menus.change}%</p>
          </div>
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        }
        iconBg="bg-red-100"
        iconColor="text-red-600"
        ariaLabel={`Menu statistics: ${stats.menus.count} menus with ${stats.menus.change}% change`}
      />
      
      {/* Orders Card */}
      <StatCard
        title="Orders"
        value={stats.orders.count}
        change={stats.orders.change}
        tooltipContent={
          <div>
            <p className="font-medium mb-1">Order Statistics</p>
            <p>New orders: {stats.orders.newOrders}</p>
            <p>Growth rate: {stats.orders.change}%</p>
          </div>
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
        ariaLabel={`Order statistics: ${stats.orders.count} orders with ${stats.orders.change}% change`}
      />
      
      {/* Customers Card */}
      <StatCard
        title="Customers"
        value={stats.customers.count}
        change={stats.customers.change}
        tooltipContent={
          <div>
            <p className="font-medium mb-1">Customer Statistics</p>
            <p>New customers: {stats.customers.newCustomers}</p>
            <p>Growth rate: {stats.customers.change}%</p>
          </div>
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
        iconBg="bg-purple-100"
        iconColor="text-purple-600"
        ariaLabel={`Customer statistics: ${stats.customers.count} customers with ${stats.customers.change}% change`}
      />
      
      {/* Income Card */}
      <StatCard
        title="Income"
        value={`$${stats.income.amount}`}
        change={stats.income.change}
        tooltipContent={
          <div>
            <p className="font-medium mb-1">Income Statistics</p>
            <p>Previous: ${stats.income.previousAmount}</p>
            <p>Growth rate: {stats.income.change}%</p>
          </div>
        }
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        iconBg="bg-green-100"
        iconColor="text-green-600"
        ariaLabel={`Income statistics: $${stats.income.amount} with ${stats.income.change}% change`}
      />
    </div>
  )
}