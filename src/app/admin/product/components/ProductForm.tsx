'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { ProductType } from '../../../../types/product'
import Accordion, { AccordionItem } from '../../../../components/Accordion'

type ProductFormProps = {
  product: ProductType | null
  isNewProduct: boolean
}

type FormInputs = {
  name: string
  slug: string
  category: string
  price: number
  originalPrice?: number
  discount?: string
  image: string
  description?: string
  features?: string
  sku?: string
  inStock: boolean
  tags?: string[]
  categories?: string[]
  galleryImages?: string[]
}

export default function ProductForm({ product, isNewProduct }: ProductFormProps) {
  const [activeTab, setActiveTab] = useState('general')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '')
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(product?.galleryImages || [])
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [calculatedDiscount, setCalculatedDiscount] = useState<string>('')
  const router = useRouter()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue,
    watch,
    getValues
  } = useForm<FormInputs>({
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      category: product?.category || '',
      price: product?.price || 0,
      originalPrice: product?.originalPrice || undefined,
      discount: product?.discount || undefined,
      image: product?.image || '',
      description: product?.description || '',
      features: product?.features?.join('\n') || '',
      sku: product?.sku || '',
      inStock: product?.inStock !== undefined ? product.inStock : true,
      tags: product?.tags || [],
      categories: product?.categories || [],
      galleryImages: product?.galleryImages || []
    }
  })
  
  // Watch price and originalPrice to calculate discount
  const price = watch('price')
  const originalPrice = watch('originalPrice')
  
  // Auto-generate slug from product name
  const productName = watch('name')
  
  // Calculate discount when price or originalPrice changes
  useEffect(() => {
    if (originalPrice && price && originalPrice > price) {
      const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100)
      setCalculatedDiscount(`${discountPercent}%`)
    } else {
      setCalculatedDiscount('')
    }
  }, [price, originalPrice])
  
  // Auto-generate slug from product name
  useEffect(() => {
    const slug = getValues('slug')
    if (!slug && productName) {
      const generatedSlug = productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setValue('slug', generatedSlug)
    }
  }, [productName, setValue, getValues])
  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    // Auto-generate slug if empty
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/products/${isNewProduct ? '' : product?.id}`, {
      //   method: isNewProduct ? 'POST' : 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     features: data.features ? data.features.split('\n').filter(f => f.trim()) : []
      //   }),
      // })
      
      // if (!response.ok) {
      //   throw new Error('Failed to save product')
      // }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      setSubmitSuccess(true)
      
      // Redirect to product list after 1 second
      setTimeout(() => {
        router.push('/admin/product')
      }, 1000)
    } catch (error) {
      console.error('Error saving product:', error)
      setSubmitError('Failed to save product. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server or cloud storage
      // For now, we'll just create a local URL for preview
      const url = URL.createObjectURL(file)
      setImagePreview(url)
      setValue('image', url) // In a real app, this would be the URL returned from the server
    }
  }

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newGalleryImages = [...galleryPreviews]
      
      // Limit to 3 images total
      for (let i = 0; i < files.length && newGalleryImages.length < 3; i++) {
        const url = URL.createObjectURL(files[i])
        newGalleryImages.push(url)
      }
      
      setGalleryPreviews(newGalleryImages)
      setValue('galleryImages', newGalleryImages)
    }
  }

  const removeGalleryImage = (index: number) => {
    const newGalleryImages = [...galleryPreviews]
    newGalleryImages.splice(index, 1)
    setGalleryPreviews(newGalleryImages)
    setValue('galleryImages', newGalleryImages)
  }
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = getValues('tags') || []
      if (!currentTags.includes(tagInput.trim())) {
        setValue('tags', [...currentTags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    const currentTags = getValues('tags') || []
    setValue('tags', currentTags.filter(t => t !== tag))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = getValues('categories') || []
    if (checked && !currentCategories.includes(category)) {
      setValue('categories', [...currentCategories, category])
    } else if (!checked && currentCategories.includes(category)) {
      setValue('categories', currentCategories.filter(c => c !== category))
    }
  }

  const removeImage = () => {
    setImagePreview('')
    setValue('image', '')
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitSuccess && (
        <div className="p-4 mb-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Product saved successfully! Redirecting...
        </div>
      )}
      
      {submitError && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {submitError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 p-6">
        {/* Left column - Main content with tabs - 70% width */}
        <div className="md:col-span-7">
          <div className="flex mb-6">
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === 'general' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-l-md`}
              onClick={() => handleTabChange('general')}
            >
              General
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === 'inventory' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => handleTabChange('inventory')}
            >
              Inventory
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === 'shipping' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'} rounded-r-md`}
              onClick={() => handleTabChange('shipping')}
            >
              Shipping
            </button>
          </div>
          
          {/* General Tab */}
          <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Product name"
                  {...register('name', { required: 'Product name is required' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              {/* New Slug Field */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug
                </label>
                <input
                  id="slug"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="product-url-slug"
                  {...register('slug')}
                />
                <p className="mt-1 text-xs text-gray-500">Leave empty to auto-generate from product name</p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Product description"
                  {...register('description')}
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Product category"
                  {...register('category', { required: 'Category is required' })}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0.00"
                    {...register('price', { 
                      required: 'Price is required',
                      min: {
                        value: 0,
                        message: 'Price must be greater than or equal to 0'
                      },
                      valueAsNumber: true
                    })}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.originalPrice ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="0.00"
                    {...register('originalPrice', { 
                      required: 'Original price is required',
                      min: {
                        value: 0,
                        message: 'Original price must be greater than or equal to 0'
                      },
                      valueAsNumber: true
                    })}
                  />
                  {errors.originalPrice && (
                    <p className="mt-1 text-sm text-red-600">{errors.originalPrice.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount
                  </label>
                  <div className="relative">
                    <input
                      id="discount"
                      type="text"
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
                      placeholder="Calculated automatically"
                      value={calculatedDiscount}
                      disabled
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Auto-calculated from price difference</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  id="features"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter features, one per line"
                  {...register('features')}
                />
              </div>
            </div>
          </div>
          
          {/* Inventory Tab */}
          <div className={activeTab === 'inventory' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  id="sku"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Stock Keeping Unit"
                  {...register('sku')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Status
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="inStock"
                      type="radio"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                      value="true"
                      checked={watch('inStock') === true}
                      onChange={() => setValue('inStock', true)}
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                      In stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="outOfStock"
                      type="radio"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                      value="false"
                      checked={watch('inStock') === false}
                      onChange={() => setValue('inStock', false)}
                    />
                    <label htmlFor="outOfStock" className="ml-2 block text-sm text-gray-700">
                      Out of stock
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Shipping Tab */}
          <div className={activeTab === 'shipping' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions (cm)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Length"
                  />
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Width"
                  />
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Height"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Sidebar - 30% width */}
        <div className="md:col-span-3 space-y-4 max-h-screen overflow-y-auto">
          {/* Update Button (Top Section) */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : 'Update'}
            </button>
          </div>
          
          {/* Product Categories */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Categories</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {['Main Dish', 'Appetizer', 'Beverage', 'Dessert', 'Sushi', 'Ramen'].map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category.toLowerCase().replace(' ', '-')}`}
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    checked={(watch('categories') || []).includes(category)}
                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  />
                  <label 
                    htmlFor={`category-${category.toLowerCase().replace(' ', '-')}`} 
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add new category
              </button>
            </div>
          </div>
          
          {/* Product Image */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Image</h3>
            <div className="mb-4">
              <div className="relative h-48 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image 
                    src={imagePreview} 
                    alt="Product preview" 
                    fill
                    className="object-contain cursor-pointer"
                    onClick={() => document.getElementById('product-image-input')?.click()}
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image selected</div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Click the image to edit or update</p>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 text-center text-sm">
                Choose Image
                <input
                  id="product-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove product image
                </button>
              )}
            </div>
          </div>
          
          {/* Product Gallery */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Gallery</h3>
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                {galleryPreviews.map((image, index) => (
                  <div key={index} className="relative h-20 bg-gray-100 rounded-md overflow-hidden">
                    <Image 
                      src={image} 
                      alt={`Gallery image ${index + 1}`} 
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm"
                    >
                      <svg className="h-3 w-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                {galleryPreviews.length < 3 && Array(3 - galleryPreviews.length).fill(0).map((_, index) => (
                  <div key={`empty-${index}`} className="h-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Empty</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className={`block w-full px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 text-center text-sm ${galleryPreviews.length >= 3 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                Add product gallery images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryImageChange}
                  disabled={galleryPreviews.length >= 3}
                />
              </label>
            </div>
          </div>
          
          {/* Product Tags */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Product Tags</h3>
            <div className="mb-2">
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                  onClick={addTag}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(watch('tags') || []).map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                  {tag}
                  <button 
                    type="button" 
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => removeTag(tag)}
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
              {(watch('tags') || []).length === 0 && (
                <span className="text-gray-400 text-sm">No tags added yet</span>
              )}
            </div>
          </div>
          
          {/* Cancel button */}
          <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <button
              type="button"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => router.push('/admin/product')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}