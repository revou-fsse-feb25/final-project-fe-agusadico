'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { notifySuccess, notifyError } from '@/lib/notifications'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session, status } = useSession()

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/account')
      }
    }
  }, [session, status, router])

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password')
      setIsLoading(false)
      return
    }
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        setError('Invalid email or password')
        notifyError('Invalid email or password')
        setIsLoading(false)
        return
      }
      
      // Show success notification
      notifySuccess('Login successful!')
      
      // NextAuth will handle the session, we just need to redirect based on role
      const session = await fetch('/api/auth/session')
      const sessionData = await session.json()
      
      if (sessionData?.user?.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/account')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
      setIsLoading(false)
    }
  }

  // If still checking authentication status, show loading
  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </>
    )
  }

  // If already authenticated, don't show login form (will redirect in useEffect)
  if (status === 'authenticated') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Column - Red Background with Logo and Text */}
        <div className="lg:sticky top-0 w-full lg:w-1/2 restaurant-bg flex items-center justify-center h-screen text-center flex-col p-8 overflow-y-auto">
          <div className="max-w-md">
            <div className="mb-4 flex justify-center">
              <Image 
                src="/images/ramenpresident-logo.png" 
                alt="Ramen President Logo" 
                width={300} 
                height={130} 
                priority 
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4 tracking-wide leading-tight text-white">
              UNLOCK MORE FINGER LICKIN' GOOD BENEFITS
            </h1>
            <p className="text-white text-sm text-center px-8">
              Get access to exclusive promos and rewards, and reorder your favourites.
            </p>
          </div>
        </div>
        
        {/* Right Column - White Background with Form */}
        <div className="w-full lg:w-1/2 content-body">
          <div className="min-h-screen p-6 md:p-8 lg:p-12 flex items-center justify-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">LOGIN</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                Access your account to track your meals
              </p>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email <span className="text-red-500">*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password <span className="text-red-500">*</span></label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Don't have an account? <Link href="/register" className="font-medium text-red-600 hover:text-red-500">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}