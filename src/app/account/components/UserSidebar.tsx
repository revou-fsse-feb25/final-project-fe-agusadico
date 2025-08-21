'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type UserSidebarProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
  userName: string
}

export default function UserSidebar({ activeTab, setActiveTab, userName }: UserSidebarProps) {
  const router = useRouter()
  
  // Logout function
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }
  
  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', href: '#' },
    { id: 'orders', label: 'My Orders', href: '#' },
    { id: 'address', label: 'Address', href: '#' },
    { id: 'account', label: 'Account Details', href: '#' },
  ]
  
  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-sm mb-6 md:mb-0 md:mr-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Hello, {userName}</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome to your account dashboard</p>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              setActiveTab(item.id)
            }}
            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === item.id
              ? 'bg-red-50 text-red-600'
              : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
            }`}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="truncate">{item.label}</span>
          </a>
        ))}
        
        <button
          onClick={handleLogout}
          className="group flex items-center px-3 py-2 text-sm font-medium rounded-md w-full text-gray-700 hover:text-red-600 hover:bg-gray-50 mt-4"
        >
          <span className="truncate">Logout</span>
        </button>
      </nav>
    </div>
  )
}