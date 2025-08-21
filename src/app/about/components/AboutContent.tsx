'use client'

import { useState } from 'react'
import Accordion, { AccordionItem } from '@/components/Accordion'

// Import server components
import VisionMission from './VisionMission'
import StructuralManagement from './StructuralManagement'
import Awards from './Awards'
import HalalCertification from './HalalCertification'

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState('vision')
  
  // Function to render the active content
  const renderContent = () => {
    switch(activeTab) {
      case 'vision':
        return <VisionMission />
      case 'management':
        return <StructuralManagement />
      case 'awards':
        return <Awards />
      case 'halal':
        return <HalalCertification />
      default:
        return <VisionMission />
    }
  }
  
  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Ramen President, where passion for authentic flavors meets exceptional dining experiences. Since our founding in 2025, we've been dedicated to bringing the finest quality food to our customers.
          </p>
          <p className="text-lg text-gray-700">
            Our journey began with a simple idea: to create a restaurant that serves delicious food made from the freshest ingredients in a welcoming atmosphere. Today, we're proud to have grown into a beloved establishment with multiple locations while staying true to our original vision.
          </p>
        </div>
        
        {/* Two-column layout with sidebar tabs and content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Left sidebar with tabs */}
          <div className="md:col-span-1">
            <Accordion sidebarStyle={true} className="sticky top-4">
              <AccordionItem 
                title="Vision & Mission" 
                isActive={activeTab === 'vision'}
                onClick={() => setActiveTab('vision')}
                id="vision-tab"
              />
              
              <AccordionItem 
                title="Structural Management" 
                isActive={activeTab === 'management'}
                onClick={() => setActiveTab('management')}
                id="management-tab"
              />
              
              <AccordionItem 
                title="Awards" 
                isActive={activeTab === 'awards'}
                onClick={() => setActiveTab('awards')}
                id="awards-tab"
              />
              
              <AccordionItem 
                title="Halal Certification" 
                isActive={activeTab === 'halal'}
                onClick={() => setActiveTab('halal')}
                id="halal-tab"
              />
            </Accordion>
          </div>
          
          {/* Right content area */}
          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}