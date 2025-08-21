'use client'

import { useState, useEffect } from 'react'
import Accordion, { AccordionItem } from '@/components/Accordion'
import { FAQItem } from '@/types/faq'
import FAQAccordion, { FAQItem as FAQAccordionItem } from '@/components/FAQAccordion'

export default function FAQContent() {
  const [activeTab, setActiveTab] = useState('account')
  const [faqItems, setFaqItems] = useState<FAQItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Fetch FAQ items when active tab changes
  useEffect(() => {
    const fetchFAQItems = async () => {
      try {
        setIsLoading(true)
        setError('')

        const url = new URL('/api/faq', window.location.origin)
        url.searchParams.append('category', activeTab)

        const response = await fetch(url.toString())

        if (!response.ok) {
          throw new Error('Failed to fetch FAQ items')
        }

        const data = await response.json()
        // Filter only published items and sort by sortOrder
        const publishedItems = data
          .filter((item: FAQItem) => item.isPublished)
          .sort((a: FAQItem, b: FAQItem) => a.sortOrder - b.sortOrder)
          
        setFaqItems(publishedItems)
      } catch (error) {
        console.error('Error fetching FAQ items:', error)
        setError('Failed to load FAQ items. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFAQItems()
  }, [activeTab])
  
  // Function to render the active content
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )
    }
    
    if (error) {
      return (
        <div className="text-center py-8 text-red-500">{error}</div>
      )
    }
    
    if (faqItems.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No FAQ items available for this category.
        </div>
      )
    }
    
    return (
      <FAQAccordion>
        {faqItems.map((faq) => (
          <FAQAccordionItem key={faq.id} question={faq.question}>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </FAQAccordionItem>
        ))}
      </FAQAccordion>
    )
  }
  
  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <p className="text-lg text-gray-700">
            Find answers to the most common questions about our services, ordering process, payment methods, and more.
          </p>
        </div>
        
        {/* Two-column layout with sidebar tabs and content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Left sidebar with tabs */}
          <div className="md:col-span-1">
            <Accordion sidebarStyle={true} className="sticky top-4">
              <AccordionItem 
                title="Account" 
                isActive={activeTab === 'account'}
                onClick={() => setActiveTab('account')}
                id="account-tab"
              />
              
              <AccordionItem 
                title="Refund" 
                isActive={activeTab === 'refund'}
                onClick={() => setActiveTab('refund')}
                id="refund-tab"
              />
              
              <AccordionItem 
                title="Order" 
                isActive={activeTab === 'order'}
                onClick={() => setActiveTab('order')}
                id="order-tab"
              />
              
              <AccordionItem 
                title="Payment" 
                isActive={activeTab === 'payment'}
                onClick={() => setActiveTab('payment')}
                id="payment-tab"
              />
            </Accordion>
          </div>
          
          {/* Right content area */}
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab} FAQ</h2>
            {renderContent()}
            
            {/* Contact Us link at the bottom */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-700">
                Still have unanswered questions? Don't hesitate to <a href="/contact" className="restaurant-bg hover:underline">Contact Us</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}