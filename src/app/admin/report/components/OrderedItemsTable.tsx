'use client'

import { useState, useEffect } from 'react'

type OrderedItem = {
  id: number
  name: string
  image: string
  quantity: number
  percentage: number
}

type OrderedItemsTableProps = {
  period: 'daily' | 'weekly' | 'monthly'
  type: 'most' | 'least'
}

export default function OrderedItemsTable({ period, type }: OrderedItemsTableProps) {
  const [items, setItems] = useState<OrderedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  
  useEffect(() => {
    const fetchOrderedItems = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/admin/ordered-items?period=${period}&type=${type}`)
        // const data = await response.json()
        
        // Mock data
        const mockMostOrdered: OrderedItem[] = [
          {
            id: 1,
            name: 'Legendary Chicken Ramen',
            image: '/images/menu/Legendary-Chicken-Ramen.jpg',
            quantity: 145,
            percentage: 85
          },
          {
            id: 2,
            name: 'Karaage Dry Ramen',
            image: '/images/menu/Karaage-Dry-Ramen.jpg',
            quantity: 120,
            percentage: 70
          },
          {
            id: 3,
            name: 'Chicken Katsudon',
            image: '/images/menu/Chicken-Katsudon.jpg',
            quantity: 95,
            percentage: 55
          },
          {
            id: 4,
            name: 'Chicken Curry Katsudon',
            image: '/images/menu/Chicken-Curry-Katsudon.jpg',
            quantity: 85,
            percentage: 50
          },
          {
            id: 5,
            name: 'Beef Curry Udon',
            image: '/images/menu/Legendary-Chicken-Ramen.jpg',
            quantity: 75,
            percentage: 45
          },
          {
            id: 6,
            name: 'Chicken Teriyaki Don',
            image: '/images/menu/Karaage-Dry-Ramen.jpg',
            quantity: 65,
            percentage: 40
          },
          {
            id: 7,
            name: 'Salmon Sushi',
            image: '/images/menu/Chicken-Katsudon.jpg',
            quantity: 60,
            percentage: 35
          },
          {
            id: 8,
            name: 'Tuna Sushi',
            image: '/images/menu/Chicken-Curry-Katsudon.jpg',
            quantity: 55,
            percentage: 30
          },
          {
            id: 9,
            name: 'Gyoza',
            image: '/images/menu/Legendary-Chicken-Ramen.jpg',
            quantity: 50,
            percentage: 25
          },
          {
            id: 10,
            name: 'Takoyaki',
            image: '/images/menu/Karaage-Dry-Ramen.jpg',
            quantity: 45,
            percentage: 20
          }
        ]
        
        const mockLeastOrdered: OrderedItem[] = [
          {
            id: 11,
            name: 'Vegetable Tempura',
            image: '/images/menu/Chicken-Katsudon.jpg',
            quantity: 10,
            percentage: 5
          },
          {
            id: 12,
            name: 'Miso Soup',
            image: '/images/menu/Chicken-Curry-Katsudon.jpg',
            quantity: 15,
            percentage: 10
          },
          {
            id: 13,
            name: 'Green Tea',
            image: '/images/menu/Legendary-Chicken-Ramen.jpg',
            quantity: 20,
            percentage: 15
          },
          {
            id: 14,
            name: 'Edamame',
            image: '/images/menu/Karaage-Dry-Ramen.jpg',
            quantity: 25,
            percentage: 20
          },
          {
            id: 15,
            name: 'Seaweed Salad',
            image: '/images/menu/Chicken-Katsudon.jpg',
            quantity: 30,
            percentage: 25
          },
          {
            id: 16,
            name: 'Tamago',
            image: '/images/menu/Chicken-Curry-Katsudon.jpg',
            quantity: 35,
            percentage: 30
          },
          {
            id: 17,
            name: 'Wakame Soup',
            image: '/images/menu/Legendary-Chicken-Ramen.jpg',
            quantity: 40,
            percentage: 35
          },
          {
            id: 18,
            name: 'Sake',
            image: '/images/menu/Karaage-Dry-Ramen.jpg',
            quantity: 45,
            percentage: 40
          },
          {
            id: 19,
            name: 'Matcha Ice Cream',
            image: '/images/menu/Chicken-Katsudon.jpg',
            quantity: 50,
            percentage: 45
          },
          {
            id: 20,
            name: 'Mochi',
            image: '/images/menu/Chicken-Curry-Katsudon.jpg',
            quantity: 55,
            percentage: 50
          }
        ]
        
        // Simulate API delay
        setTimeout(() => {
          setItems(type === 'most' ? mockMostOrdered : mockLeastOrdered)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error(`Error fetching ${type} ordered items:`, error)
        setLoading(false)
      }
    }
    
    fetchOrderedItems()
  }, [period, type])
  
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center p-3 border-b border-gray-100">
            <div className="w-12 h-12 bg-gray-200 rounded-md mr-3"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }
  
  // Display only top 3 items if not expanded, otherwise show all 10
  const displayItems = expanded ? items : items.slice(0, 3)
  
  return (
    <div>
      <div className="space-y-4">
        {displayItems.map((item) => (
          <div key={item.id} className="flex items-center p-3 border-b border-gray-100">
            <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <div className="mt-2 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-red-600 h-2.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{item.quantity}x</p>
              <p className="text-xs text-gray-500">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button 
          className="text-red-600 text-sm font-medium flex items-center justify-center mx-auto"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'View Less' : 'View More'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transform ${expanded ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}