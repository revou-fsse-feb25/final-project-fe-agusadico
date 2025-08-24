export const dynamic = 'force-static'

import Accordion, { AccordionItem } from '@/components/Accordion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AboutContent from './components/AboutContent'

// Server Components for each section
function VisionMission() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
        <p className="text-gray-700">
          To be the most loved and preferred food brand, creating memorable dining experiences through our exceptional food quality, service, and ambiance.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
        <p className="text-gray-700">
          We are committed to delighting our customers with delicious, high-quality food made from the finest ingredients. We strive to provide exceptional service in a welcoming atmosphere while maintaining sustainable business practices and supporting the communities we serve.
        </p>
      </div>
    </div>
  )
}

function StructuralManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👨‍💼</span>
          </div>
          <h4 className="font-bold">John Doe</h4>
          <p className="text-gray-600">Chief Executive Officer</p>
        </div>
        
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👩‍💼</span>
          </div>
          <h4 className="font-bold">Jane Smith</h4>
          <p className="text-gray-600">Chief Operations Officer</p>
        </div>
        
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-3 flex items-center justify-center">
            <span className="text-4xl">👨‍🍳</span>
          </div>
          <h4 className="font-bold">Michael Johnson</h4>
          <p className="text-gray-600">Executive Chef</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-700">
          Our management team brings over 50 years of combined experience in the restaurant industry, ensuring the highest standards of quality and service.
        </p>
      </div>
    </div>
  )
}

function Awards() {
  const awards = [
    { year: 2023, title: "Best Pizza Restaurant", organization: "Food Critics Association" },
    { year: 2022, title: "Excellence in Customer Service", organization: "Restaurant Guild" },
    { year: 2021, title: "Most Innovative Menu", organization: "Culinary Innovation Awards" },
    { year: 2020, title: "Best Family Restaurant", organization: "Community Choice Awards" },
  ]
  
  return (
    <div className="space-y-4">
      <p className="text-gray-700 mb-4">
        We're proud to have been recognized for our commitment to excellence in food quality and customer service.
      </p>
      
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold">{award.title} ({award.year})</h4>
              <p className="text-gray-600">{award.organization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HalalCertification() {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Certified Halal</h3>
      </div>
      
      <p className="text-gray-700">
        We are proud to announce that all our restaurants have received Halal certification from the Islamic Food and Nutrition Council. This certification ensures that our food preparation methods and ingredients comply with Islamic dietary laws.
      </p>
      
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-bold mb-2">Our Commitment</h4>
        <p className="text-gray-700">
          We are committed to maintaining the highest standards of Halal compliance in all our restaurants. Our staff undergoes regular training to ensure proper food handling and preparation according to Halal guidelines.
        </p>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700">
          Certificate Number: HAL-12345-ID<br />
          Valid Until: December 31, 2024
        </p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col content-body">
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
      <div className="restaurant-bg text-white py-16 mt-25">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-xl">Learn more about our story, values, and achievements</p>
        </div>
      </div>
      
      {/* About Content - Client Component wrapper with Server Component sections */}
      <AboutContent />

      {/* Footer */}
      <Footer />
    </div>
  )
}