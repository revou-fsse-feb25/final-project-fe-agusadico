export const dynamic = 'force-static'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQContent from './components/FAQContent'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="restaurant-bg text-white py-16 mt-25">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-xl">Find answers to common questions about our services</p>
        </div>
      </div>
      
      {/* FAQ Content - Client Component wrapper with Server Component sections */}
      <FAQContent />

      {/* Footer */}
      <Footer />
    </div>
  )
}