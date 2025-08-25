'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProductType } from '../../../../types/product'
import ActionMenu from '../../components/ActionMenu'
import { list } from '../../../../lib/api/products'

// Mock data removed - now using real API data

const ProductList = ({ /* props */ }) => {
  const router = useRouter()
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const productsPerPage = 10

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const data = await list()
        setProducts(data)
        setTotalPages(Math.ceil(data.length / productsPerPage))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products')
        setLoading(false)
        // Keep the table shell but show error message
      }
    }
    
    fetchProducts()
  }, [])

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Action handlers
  const handleAcceptOrder = (productId: number) => {
    console.log('Accept order for product:', productId)
  }

  const handleRejectOrder = (productId: number) => {
    console.log('Reject order for product:', productId)
  }

  const handleViewDetails = (productId: number) => {
    router.push(`/admin/product/${productId}`)
  }

  // Toggle menu
  const toggleMenu = (productId: number) => {
    setActiveMenu(activeMenu === productId ? null : productId)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Product List</h2>
        <Link href="/admin/product/new" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Add New Product
        </Link>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="px-6 pb-4">
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
            {error}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-4 font-medium">Product ID</th>
              <th className="p-4 font-medium">Image Product</th>
              <th className="p-4 font-medium">Product Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-gray-700">#{product.id}</td>
                <td className="p-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized={true}
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/ramenpresident-logo.png"; // Use local image as fallback
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        <span className="text-center">No Image</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 text-gray-700">{product.name}</td>
                <td className="p-4 text-gray-700">{product.category}</td>
                <td className="p-4">
                  <span className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="p-4 relative">
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => toggleMenu(product.id)}
                    aria-label="Menu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  
                  {activeMenu === product.id && (
                    <ActionMenu
                      isOpen={true}
                      onClose={() => setActiveMenu(null)}
                      actions={[
                        {
                          label: 'Edit Product',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          ),
                          onClick: () => handleViewDetails(product.id),
                          color: 'text-blue-500'
                        },
                        {
                          label: 'Delete Product',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleRejectOrder(product.id),
                          color: 'text-red-500'
                        },
                        {
                          label: 'View Details',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          ),
                          onClick: () => handleViewDetails(product.id),
                          color: 'text-gray-500'
                        },
                      ]}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="p-4 flex justify-between items-center border-t">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products.length)} of {products.length} entries
        </div>
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded">{currentPage}</span>
          <button 
            onClick={goToNextPage} 
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export { ProductList };
export default ProductList;