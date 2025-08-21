'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import ProductForm from '../components/ProductForm'
import { ProductType } from '../../../../types/product'
import { getCurrentUser } from '../../../../lib/auth/client'

// Mock products data for development
const MOCK_PRODUCTS: { [key: string]: ProductType | null } = {
  'new': null,
  '1': {
    id: 1,
    name: "Legendary Chicken Ramen",
    category: "Ramen",
    price: 12.00,
    originalPrice: 14.00,
    discount: "14%",
    image: "/images/menu/Legendary-Chicken-Ramen.jpg",
    //pack: "12 fl oz, 10 Pack Bottles",
    description: "Rich, flavorful chicken broth paired with premium ramen noodles.",
    features: ["Premium ingredients", "Authentic recipe"],
    sku: "SKU-12345",
    inStock: true
  },
  // Add more mock products as needed
}

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string
  const [product, setProduct] = useState<ProductType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNewProduct, setIsNewProduct] = useState(false)
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
        } else {
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
        }
        
        // Check if this is a new product or editing existing
        if (productId === 'new') {
          setIsNewProduct(true)
          setProduct(null)
        } else {
          // In a real app, fetch product data from API
          // For now, use mock data
          setProduct(MOCK_PRODUCTS[productId] || null)
        }
      } catch (error) {
        console.error('Admin auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAuth();
  }, [productId]);

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
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h1 className="text-2xl font-bold mb-6">
          {isNewProduct ? 'Add New Product' : 'Edit Product'}
        </h1>
        <ProductForm 
          product={product} 
          isNewProduct={isNewProduct} 
        />
      </div>
    </div>
  )
}