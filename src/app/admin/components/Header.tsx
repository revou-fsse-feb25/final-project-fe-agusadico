'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'admin'
}

type HeaderProps = {
  user: User | null
}

export default function Header({ user }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Admin Page</h1>
        <div className="flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-500">Dashboard</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
        </button>
        
        <div className="relative">
          <button 
            className="flex items-center gap-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="text-right">
              <p className="text-sm text-gray-700">Good Morning!</p>
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <button 
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}