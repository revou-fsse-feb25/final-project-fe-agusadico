import Header from '../../components/Header'
import ProductForm from '../components/ProductForm'
import { ProductType } from '../../../../types/product'
import { get } from '../../../../lib/api/products'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const isNewProduct = id === 'new'
  
  let product: ProductType | null = null
  
  if (!isNewProduct) {
    try {
      product = await get(id)
    } catch (error) {
      console.error('Error fetching product:', error)
      // Product not found or error - will be handled by the form
    }
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <Header user={null} />
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