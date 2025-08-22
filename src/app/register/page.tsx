'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { register as registerApi } from '@/lib/api/auth'

type FormData = {
  name: string
  username: string
  password: string
  confirmPassword: string
  phone: string
  email: string
  birthday?: string
  city: string
  address: string
}

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm<FormData>()
  
  // Watch password field for confirmation validation
  const password = watch('password')
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setServerError('')
    
    try {
      // Frontend minimal validation (in addition to react-hook-form)
      if (!data.name || !data.email || !data.password) {
        setServerError('Name, email, and password are required.')
        setIsSubmitting(false)
        return
      }

      // Call backend API via our auth client
      const rawPayload = { 
        name: data.name, 
        email: data.email, 
        password: data.password,
        username: data.username,
        phone: data.phone,
        address: data.address,
        city: data.city,
        birthday: data.birthday || undefined
      } as Record<string, unknown>;
      // Omit empty/undefined optional fields to satisfy backend validators
      const payload = Object.fromEntries(
        Object.entries(rawPayload).filter(([, v]) => v !== undefined && v !== '')
      ) as any;
      await registerApi(payload)
      
      // Show success message
      setRegisterSuccess(true)
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      
    } catch (error: any) {
      console.warn('Registration error:', error)
      const backendMessage = (error?.payload && (error.payload.message || error.payload.error)) || error?.message
      setServerError(backendMessage || 'Registration failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Toggle password visibility handlers
  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent form submission
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent form submission
    setShowConfirmPassword(!showConfirmPassword)
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
            <h1 className="text-3xl md:text-4xl font-bold uppercase mb-4 tracking-wide leading-tight">
              UNLOCK MORE FINGER LICKIN' GOOD BENEFITS
            </h1>
            <p className="text-lg">
              Get access to exclusive promos and rewards, and reorder your favourites.
            </p>
          </div>
        </div>
        
        {/* Right Column - White Background with Form */}
        <div className="w-full lg:w-1/2 bg-white">
          <div className="min-h-screen p-6 md:p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-20">REGISTER</h2>
              <p className="text-gray-600 mb-8">
                Create your account to order and track your favorite meals
              </p>
              
              {serverError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{serverError}</span>
                </div>
              )}
              
              {registerSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">Account created successfully! Redirecting to login page...</span>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  {/* Phone Number Field - Highlighted as primary field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center border border-gray-300 rounded-l-md py-2 px-3 bg-gray-50">
                        <span>+62</span>
                      </div>
                      <input
                        id="phone"
                        type="text"
                        aria-label="Phone number"
                        aria-required="true"
                        className={`appearance-none relative block w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-r-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                        placeholder="Enter phone number"
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Please enter a valid phone number'
                          },
                          minLength: {
                            value: 9,
                            message: 'Phone number must be at least 9 digits'
                          },
                          maxLength: {
                            value: 12,
                            message: 'Phone number must not exceed 12 digits'
                          }
                        })}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      aria-label="Full name"
                      aria-required="true"
                      className={`appearance-none relative block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                      placeholder="Enter your name"
                      {...register('name', { 
                        required: 'Name is required' 
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      aria-label="Username"
                      aria-required="true"
                      className={`appearance-none relative block w-full px-3 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                      placeholder="Choose a username"
                      {...register('username', { 
                        required: 'Username is required',
                        minLength: {
                          value: 3,
                          message: 'Username must be at least 3 characters'
                        }
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                  </div>
                  
                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        aria-label="Password"
                        aria-required="true"
                        className={`appearance-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pr-10`}
                        placeholder="Create a password"
                        {...register('password', { 
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1} // Won't disrupt tab navigation
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>
                  
                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        aria-label="Confirm password"
                        aria-required="true"
                        className={`appearance-none relative block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pr-10`}
                        placeholder="Confirm your password"
                        {...register('confirmPassword', { 
                          required: 'Please confirm your password',
                          validate: value => value === password || 'Passwords do not match'
                        })}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        tabIndex={-1} // Won't disrupt tab navigation
                      >
                        {showConfirmPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      aria-label="Email address"
                      aria-required="true"
                      className={`appearance-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                      placeholder="E.g. jane@email.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  
                  {/* Birthday Field */}
                  <div>
                    <label htmlFor="birthday" className="block text sm font-medium text-gray-700 mb-1">
                      Birthday
                    </label>
                    <input
                      id="birthday"
                      type="date"
                      aria-label="Birthday"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                      {...register('birthday')}
                      disabled={isSubmitting}
                    />
                    {errors.birthday && <p className="text-red-500 text-xs mt-1">{errors.birthday.message}</p>}
                  </div>
                  
                  {/* City Field */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      aria-label="City"
                      aria-required="true"
                      className={`appearance-none relative block w-full px-3 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                      placeholder="Enter your city"
                      {...register('city', { 
                        required: 'City is required' 
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  
                  {/* Address Field */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      aria-label="Address"
                      aria-required="true"
                      className={`appearance-none relative block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                      placeholder="Enter your address"
                      rows={3}
                      {...register('address', { 
                        required: 'Address is required' 
                      })}
                      disabled={isSubmitting}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
                    aria-label="Register account"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg className="animate-spin h-5 w-5 text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Creating Account...
                      </>
                    ) : 'Continue'}
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Already have an account? <Link href="/login" className="font-medium text-red-600 hover:text-red-500">Login</Link>
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