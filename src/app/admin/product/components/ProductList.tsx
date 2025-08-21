'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProductType } from '../../../../types/product'
import ActionMenu from '../../components/ActionMenu'

// Mock data for products
const MOCK_PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'Chicken Curry Katsudon',
    category: 'Main Dish',
    price: 14.99,
    image: '/images/menu/Chicken-Curry-Katsudon.jpg',
    //pack: 'Single',
    inStock: true
  },
  {
    id: 2,
    name: 'Chicken Katsudon',
    category: 'Main Dish',
    price: 12.99,
    image: '/images/menu/Chicken-Katsudon.jpg',
    //pack: 'Single',
    inStock: true
  },
  {
    id: 3,
    name: 'Karaage Dry Ramen',
    category: 'Ramen',
    price: 15.99,
    image: '/images/menu/Karaage-Dry-Ramen.jpg',
    //pack: 'Bowl',
    inStock: true
  },
  {
    id: 4,
    name: 'Legendary Chicken Ramen',
    category: 'Ramen',
    price: 16.99,
    image: '/images/menu/Legendary-Chicken-Ramen.jpg',
    //pack: 'Bowl',
    inStock: true
  },
  {
    id: 5,
    name: 'Mango Yakult',
    category: 'Beverage',
    price: 5.99,
    image: '/images/menu/Mango-Yakult.jpg',
    //pack: 'Glass',
    inStock: true
  },
  {
    id: 6,
    name: 'Nori Gyoza Skin',
    category: 'Appetizer',
    price: 8.99,
    image: '/images/menu/Nori-Gyoza-Skin.jpg',
    //pack: 'Plate',
    inStock: true
  },
  {
    id: 7,
    name: 'Seafood Maki Sushi Rolls',
    category: 'Sushi',
    price: 13.99,
    image: '/images/menu/Seafood-Maki-Sushi-Rolls.jpg',
    //pack: 'Plate',
    inStock: true
  },
  {
    id: 8,
    name: 'Seafood Spicy Crunchy Roll',
    category: 'Sushi',
    price: 14.99,
    image: '/images/menu/Seafood-Spicy-Cruncy-Roll.jpg',
    //pack: 'Plate',
    inStock: true
  }
];

const ProductList = ({ /* props */ }) => {
  const router = useRouter()
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const productsPerPage = 10

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/products')
        // const data = await response.json()
        
        // Using mock data instead
        setTimeout(() => {
          setProducts(MOCK_PRODUCTS)
          setTotalPages(Math.ceil(MOCK_PRODUCTS.length / productsPerPage))
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
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
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
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