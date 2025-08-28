'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '../../components/Header'
import ProductForm from '../components/ProductForm'
import { ProductType } from '../../../../types/product'

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const isNewProduct = id === 'new';
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(!isNewProduct);
  
  useEffect(() => {
    // Only fetch product data if not a new product
    if (!isNewProduct) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
            cache: 'no-store'
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.status}`);
          }
          
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProduct();
    }
  }, [id, isNewProduct]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header user={null} />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header user={null} />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            {isNewProduct ? 'Add New Product' : 'Edit Product'}
          </h1>
          
          <ProductForm 
            product={product} 
            isNewProduct={isNewProduct} 
          />
        </div>
      </main>
    </div>
  )
}