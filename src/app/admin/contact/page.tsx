'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../components/Header'
import { getCurrentUser } from '../../../lib/auth/client'
import ContactInfoForm from './components/ContactInfoForm'
import SubmissionList from './components/SubmissionList'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

export default function AdminContactPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('info')
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in as admin
    const checkAdminAuth = async () => {
      try {
        setIsLoading(true);
        
        // First check client-side token
        const clientUser = getCurrentUser();
        
        // If we have a valid client-side token, use it immediately
        if (clientUser) {
          setUser(clientUser);
          setIsLoading(false);
          return;
        }
        
        // If no client-side token, verify with server
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Important for cookies
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Admin auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminAuth();
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <Header user={user} />
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Manage Contact Page</h2>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Contact Information
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'submissions' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Message Submissions
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'info' && <ContactInfoForm />}
        {activeTab === 'submissions' && <SubmissionList />}
      </div>
    </div>
  )
}