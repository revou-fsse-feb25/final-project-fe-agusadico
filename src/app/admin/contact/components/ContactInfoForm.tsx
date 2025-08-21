'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ContactInfo } from '@/types/contact'

type ContactInfoInputs = {
  phone: string
  whatsapp: string
  email: string
  address: string
  complaintService: string
}

export default function ContactInfoForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<ContactInfoInputs>()
  
  // Fetch contact information
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/contact');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }
        
        const data: ContactInfo = await response.json();
        
        // Reset form with fetched data
        reset({
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          address: data.address || '',
          complaintService: data.complaintService || ''
        });
      } catch (error) {
        console.error('Error fetching contact info:', error);
        setSubmitError('Failed to load contact information');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContactInfo();
  }, [reset]);
  
  const onSubmit: SubmitHandler<ContactInfoInputs> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);
      
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update contact information');
      }
      
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error updating contact info:', error);
      setSubmitError(error.message || 'Failed to update contact information');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Edit Contact Information</h3>
      
      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Contact information updated successfully!
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="text"
              {...register('phone', { 
                required: 'Phone number is required' 
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          
          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              id="whatsapp"
              type="text"
              {...register('whatsapp', { 
                required: 'WhatsApp number is required' 
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-600">{errors.whatsapp.message}</p>
            )}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          {/* Complaint Service */}
          <div>
            <label htmlFor="complaintService" className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Service Number <span className="text-red-500">*</span>
            </label>
            <input
              id="complaintService"
              type="text"
              {...register('complaintService', { 
                required: 'Complaint service number is required' 
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.complaintService && (
              <p className="mt-1 text-sm text-red-600">{errors.complaintService.message}</p>
            )}
          </div>
        </div>
        
        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            rows={3}
            {...register('address', { 
              required: 'Address is required' 
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}