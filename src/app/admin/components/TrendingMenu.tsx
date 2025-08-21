'use client'

import { useState, useEffect } from 'react'

type MenuItem = {
  id: number
  name: string
  price: number
  orderCount: number
  image: string
}

function getTrendingMenus(): Promise<MenuItem[]> {
  // In a real app, this would be a fetch call to an API
  // return fetch('/api/admin/trending-menus').then(res => res.json())
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Legendary Ramen',
          price: 12.00,
          orderCount: 81,
          image: '/images/menu/Legendary-Chicken-Ramen.jpg'
        },
        {
          id: 2,
          name: 'Karaage Ramen',
          price: 6.00,
          orderCount: 67,
          image: '/images/menu/Karaage-Dry-Ramen.jpg'
        },
        {
          id: 3,
          name: 'Chicken Katsudon',
          price: 12.3,
          orderCount: 55,
          image: '/images/menu/Chicken-Katsudon.jpg'
        },
        {
          id: 4,
          name: 'Chicken Curry Katsudon',
          price: 12.3,
          orderCount: 45,
          image: '/images/menu/Chicken-Curry-Katsudon.jpg'
        },
        {
          id: 5,
          name: 'Seafood Spicy Crunchy Roll',
          price: 12.3,
          orderCount: 41,
          image: '/images/menu/Seafood-Spicy-Cruncy-Roll.jpg'
        }
      ])
    }, 1000)
  })
}

export default function TrendingMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getTrendingMenus()
      .then(data => {
        setMenuItems(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching trending menus:', error)
        setLoading(false)
      })
  }, [])
  
  if (loading) {
    return <div className="p-4 border rounded-lg">Loading trending menus...</div>
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Daily Trending Menus</h3>
      </div>
      
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-sm font-bold text-red-600">${item.price}</p>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Order: {item.orderCount}x
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}