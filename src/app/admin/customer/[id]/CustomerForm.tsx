'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

type CustomerFormInputs = {
  name: string;
  email: string;
  birthday?: string;
  city?: string;
  address?: string;
  username: string;
  password?: string;
  confirmPassword?: string;
};

type CustomerFormProps = {
  customerId: string;
};

export default function CustomerForm({ customerId }: CustomerFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [customerData, setCustomerData] = useState<any>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors
  } = useForm<CustomerFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      birthday: '',
      city: '',
      address: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  // Watch password field to implement conditional validation
  const password = watch('password');
  
  // Validate password confirmation when password changes
  useEffect(() => {
    // If password is provided but doesn't match confirmPassword
    const confirmPassword = watch('confirmPassword');
    if (password && confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'validate',
        message: 'Passwords do not match'
      });
    } else if (password && confirmPassword && password === confirmPassword) {
      clearErrors('confirmPassword');
    }
  }, [password, watch, setError, clearErrors]);
  
  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/customers/${customerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer');
        }
        
        const data = await response.json();
        setCustomerData(data);
        
        // Reset form with fetched data
        reset({
          name: data.name || '',
          email: data.email || '',
          birthday: data.birthday || '',
          city: data.city || '',
          address: data.address || '',
          username: data.username || '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error fetching customer:', error);
        setSubmitError('Failed to load customer data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomer();
  }, [customerId, reset]);
  
  const onSubmit: SubmitHandler<CustomerFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);
      
      // Only send editable fields to the API
      const updateData = {
        name: data.name,
        email: data.email,
        birthday: data.birthday,
        city: data.city,
        address: data.address,
        username: data.username,
        // Only include password if it was provided
        ...(data.password ? { password: data.password } : {}),
      };
      
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update customer');
      }
      
      setSubmitSuccess(true);
      
      // Navigate back to customer list after successful update
      setTimeout(() => {
        router.push('/admin/customer');
      }, 1500);
    } catch (error: any) {
      console.error('Error updating customer:', error);
      setSubmitError(error.message || 'Failed to update customer');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/customer');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Customer updated successfully! Redirecting...
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Left Column - Editable Fields (5/7 width) */}
          <div className="md:col-span-5 space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold border-b border-gray-200 pb-3">Customer Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { 
                    required: 'Name is required' 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
                      message: 'Invalid email format'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Birthday */}
              <div>
                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-1">
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  {...register('birthday')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                {...register('address')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  {...register('username', { 
                    required: 'Username is required' 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password (leave empty to keep current)
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password {password && <span className="text-red-500">*</span>}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    validate: value => {
                      if (password && !value) {
                        return 'Confirm password is required';
                      }
                      if (password && value !== password) {
                        return 'Passwords do not match';
                      }
                      return true;
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Read-only Fields (2/7 width) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold border-b border-gray-200 pb-3">Customer Summary</h2>
              
              <div className="space-y-4 mt-4">
                {/* Join Date */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Join Date</h3>
                  <p className="text-gray-900 font-medium">{customerData?.joinDate || 'N/A'}</p>
                </div>
                
                {/* Last Order */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Order</h3>
                  <p className="text-gray-900 font-medium">
                    {customerData?.lastOrder?.amount 
                      ? `Rp${customerData.lastOrder.amount.toFixed(2)}` 
                      : 'Rp0'}
                  </p>
                </div>
                
                {/* Total Spent */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                  <p className="text-gray-900 font-medium">
                    {customerData?.totalSpent 
                      ? `Rp${customerData.totalSpent.toFixed(2)}` 
                      : 'Rp0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
}