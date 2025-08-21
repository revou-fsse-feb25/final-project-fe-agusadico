export const dynamic = 'force-static'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactInfo from './components/ContactInfo'
import ContactFormWrapper from './components/ContactFormWrapper'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-25">
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="restaurant-bg text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you</p>
        </div>
      </div>
      
      {/* Contact Content */}
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information (Server Component) */}
            <ContactInfo />
            
            {/* Contact Form (Client Component) */}
            <ContactFormWrapper />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}