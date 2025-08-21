'use client'

import { useState, useEffect } from 'react'

type RevenueData = {
  date: string
  amount: number
}

type RevenueChartProps = {
  period: 'daily' | 'weekly' | 'monthly'
}

export default function RevenueChart({ period }: RevenueChartProps) {
  const [data, setData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchRevenueData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/revenue?period=${period}`)
        // const data = await response.json()
        
        // Mock data based on period
        let mockData: RevenueData[] = []
        
        if (period === 'daily') {
          mockData = [
            { date: 'Jan', amount: 4000 },
            { date: 'Feb', amount: 3000 },
            { date: 'Mar', amount: 5000 },
            { date: 'Apr', amount: 4000 },
            { date: 'May', amount: 3000 },
            { date: 'Jun', amount: 7000 },
            { date: 'Jul', amount: 5000 }
          ]
        } else if (period === 'weekly') {
          mockData = [
            { date: 'Week 1', amount: 12000 },
            { date: 'Week 2', amount: 9000 },
            { date: 'Week 3', amount: 15000 },
            { date: 'Week 4', amount: 18000 }
          ]
        } else {
          mockData = [
            { date: 'Jan', amount: 45000 },
            { date: 'Feb', amount: 52000 },
            { date: 'Mar', amount: 49000 },
            { date: 'Apr', amount: 62000 },
            { date: 'May', amount: 55000 },
            { date: 'Jun', amount: 70000 }
          ]
        }
        
        // Simulate API delay
        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Error fetching revenue data:', error)
        setLoading(false)
      }
    }
    
    fetchRevenueData()
  }, [period])
  
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse h-full w-full bg-gray-200 rounded"></div>
      </div>
    )
  }
  
  // Find max value for scaling
  const maxValue = Math.max(...data.map(item => item.amount))
  const chartHeight = 250
  
  return (
    <div className="h-64 relative">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
        <div>${maxValue}</div>
        <div>${Math.round(maxValue * 0.75)}</div>
        <div>${Math.round(maxValue * 0.5)}</div>
        <div>${Math.round(maxValue * 0.25)}</div>
        <div>$0</div>
      </div>
      
      {/* Chart area */}
      <div className="ml-12 h-full flex items-end">
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 60} ${chartHeight}`} preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1={chartHeight} x2={data.length * 60} y2={chartHeight} stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1={chartHeight * 0.75} x2={data.length * 60} y2={chartHeight * 0.75} stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1={chartHeight * 0.5} x2={data.length * 60} y2={chartHeight * 0.5} stroke="#e5e7eb" strokeWidth="1" />
          <line x1="0" y1={chartHeight * 0.25} x2={data.length * 60} y2={chartHeight * 0.25} stroke="#e5e7eb" strokeWidth="1" />
          
          {/* Line chart */}
          <path
            d={data.map((point, index) => {
              const x = index * 60 + 30
              const y = chartHeight - (point.amount / maxValue) * chartHeight
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
            }).join(' ')}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3"
          />
          
          {/* Area under the line */}
          <path
            d={`
              ${data.map((point, index) => {
                const x = index * 60 + 30
                const y = chartHeight - (point.amount / maxValue) * chartHeight
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
              }).join(' ')}
              L ${(data.length - 1) * 60 + 30} ${chartHeight}
              L 30 ${chartHeight}
              Z
            `}
            fill="url(#gradient)"
            fillOpacity="0.2"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = index * 60 + 30
            const y = chartHeight - (point.amount / maxValue) * chartHeight
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#f43f5e"
                stroke="white"
                strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>
      
      {/* X-axis labels */}
      <div className="ml-12 mt-2 flex justify-between text-xs text-gray-500">
        {data.map((point, index) => (
          <div key={index} style={{ width: `${100 / data.length}%` }} className="text-center">
            {point.date}
          </div>
        ))}
      </div>
    </div>
  )
}