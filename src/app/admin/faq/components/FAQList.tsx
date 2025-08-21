'use client'

import { useState, useEffect, useRef } from 'react'
import { FAQItem } from '@/types/faq'
import { useRouter } from 'next/navigation'
import FAQModal from './FAQModal'
import { FAQItemComponent } from './FAQItem'

type FAQListProps = {
  category: string
}

export default function FAQList({ category }: FAQListProps) {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch FAQ items when category or search term changes
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchFAQItems()
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [category, searchTerm])

  const fetchFAQItems = async () => {
    try {
      setIsLoading(true)
      setError('')

      const url = new URL('/api/faq', window.location.origin)
      url.searchParams.append('category', category)
      if (searchTerm) {
        url.searchParams.append('search', searchTerm)
      }

      const response = await fetch(url.toString())

      if (!response.ok) {
        throw new Error('Failed to fetch FAQ items')
      }

      const data = await response.json()
      setFaqItems(data)
    } catch (error) {
      console.error('Error fetching FAQ items:', error)
      setError('Failed to load FAQ items. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoveUp = async (index: number) => {
    if (index <= 0) return
    
    const newItems = [...faqItems]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp
    
    // Update sortOrder values
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1
    }))
    
    setFaqItems(updatedItems)
    updateItemsOrder(updatedItems)
  }

  const handleMoveDown = async (index: number) => {
    if (index >= faqItems.length - 1) return
    
    const newItems = [...faqItems]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp
    
    // Update sortOrder values
    const updatedItems = newItems.map((item, idx) => ({
      ...item,
      sortOrder: idx + 1
    }))
    
    setFaqItems(updatedItems)
    updateItemsOrder(updatedItems)
  }

  const updateItemsOrder = async (items: FAQItem[]) => {
    try {
      const orderData = items.map(item => ({
        id: item.id,
        sortOrder: item.sortOrder
      }))

      const response = await fetch('/api/faq', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to update FAQ order')
      }
      
      // Revalidate the public FAQ page
      router.refresh()
    } catch (error) {
      console.error('Error updating FAQ order:', error)
      // Optionally show an error toast here
    }
  }

  const handlePublishToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update publish status')
      }

      // Update local state
      setFaqItems(items =>
        items.map(item =>
          item.id === id ? { ...item, isPublished: !currentStatus } : item
        )
      )
      
      // Revalidate the public FAQ page
      router.refresh()
    } catch (error) {
      console.error('Error toggling publish status:', error)
      // Optionally show an error toast here
    }
  }

  const handleEdit = (faq: FAQItem) => {
    setEditingFaq(faq)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ item? This action cannot be undone.')) {
      try {
        setIsDeleting(true)
        setDeletingId(id)

        const response = await fetch(`/api/faq/${id}`, {
          method: 'DELETE',
        })

        if (!response.ok) {
          throw new Error('Failed to delete FAQ item')
        }

        // Remove from local state
        setFaqItems(items => items.filter(item => item.id !== id))
        
        // Revalidate the public FAQ page
        router.refresh()
      } catch (error) {
        console.error('Error deleting FAQ item:', error)
        // Optionally show an error toast here
      } finally {
        setIsDeleting(false)
        setDeletingId(null)
      }
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingFaq(null)
  }

  const handleModalSubmit = async (faq: Partial<FAQItem>) => {
    try {
      if (editingFaq) {
        // Update existing FAQ
        const response = await fetch(`/api/faq/${editingFaq.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(faq),
        })

        if (!response.ok) {
          throw new Error('Failed to update FAQ item')
        }

        const updatedFaq = await response.json()

        // Update local state
        setFaqItems(items =>
          items.map(item => (item.id === updatedFaq.id ? updatedFaq : item))
        )
      } else {
        // Create new FAQ
        const response = await fetch('/api/faq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...faq,
            category,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create FAQ item')
        }

        const newFaq = await response.json()

        // Add to local state
        setFaqItems(items => [...items, newFaq])
      }

      // Close modal and reset form
      setIsModalOpen(false)
      setEditingFaq(null)
      
      // Revalidate the public FAQ page
      router.refresh()
    } catch (error) {
      console.error('Error saving FAQ item:', error)
      // Optionally show an error toast here
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold capitalize">{category} FAQs</h3>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="restaurant-bg text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
          >
            New FAQ
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : faqItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm
            ? 'No FAQ items match your search.'
            : `No FAQ items found for ${category}. Click "New FAQ" to add one.`}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="w-10"></th>{/* Reorder buttons column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {faqItems.map((faq, index) => (
                <FAQItemComponent
                  key={faq.id}
                  faq={faq}
                  onEdit={() => handleEdit(faq)}
                  onDelete={() => handleDelete(faq.id)}
                  onPublishToggle={() => handlePublishToggle(faq.id, faq.isPublished)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  isDeleting={isDeleting && deletingId === faq.id}
                  isFirst={index === 0}
                  isLast={index === faqItems.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <FAQModal
          faq={editingFaq}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  )
}