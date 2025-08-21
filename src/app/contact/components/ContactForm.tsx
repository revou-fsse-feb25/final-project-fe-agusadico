'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  phone: string
  email: string
  topic: string
  location: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>()
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // In a real application, you would send this data to your backend
      console.log('Form data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      setSubmitSuccess(true)
      reset()
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitSuccess && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-700">
          Thank you for your message! We will get back to you as soon as possible.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your full name"
          {...register('name', { required: 'Name is required' })}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your phone number"
          {...register('phone', { 
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9+\-\s()]*$/,
              message: 'Please enter a valid phone number'
            }
          })}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your email address"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
          Topic <span className="text-red-500">*</span>
        </label>
        <select
          id="topic"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.topic ? 'border-red-500' : 'border-gray-300'}`}
          {...register('topic', { required: 'Please select a topic' })}
          aria-invalid={errors.topic ? 'true' : 'false'}
        >
          <option value="">Select a topic</option>
          <option value="complaint">Complaint</option>
          <option value="suggestion">Suggestion</option>
          <option value="birthday">Birthday Party Booking</option>
          <option value="gathering">Gathering Booking</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="franchise">Franchise Partnership</option>
          <option value="question">Question</option>
          <option value="others">Others</option>
        </select>
        {errors.topic && (
          <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          id="location"
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your city or nearest restaurant location"
          {...register('location', { required: 'Location is required' })}
          aria-invalid={errors.location ? 'true' : 'false'}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Your message"
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters long'
            }
          })}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}