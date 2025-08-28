'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CustomerFormProps {
  customerId: string;
}

interface CustomerType {
  id: string;
  customerId: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  birthday: string;
  image: string;
  location: string;
  totalSpent: number;
  joinDate: string;
  lastOrder: {
    amount: number;
    date: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CustomerFormInputs {
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  birthday: string;
  location: string;
  password: string;
  confirmPassword: string;
}

// Helper functions for formatting data
const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return 'N/A';
  }
};

export default function CustomerForm({ customerId }: CustomerFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});
  
  // Using native form handling instead of react-hook-form
  
  // Track password and confirmPassword values from formData
  const password = formData?.password || '';
  const confirmPassword = formData?.confirmPassword || '';
  
  // Validate password confirmation when password changes
  useEffect(() => {
    // If password is provided but doesn't match confirmPassword
    if (password && confirmPassword && password !== confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: 'Passwords do not match',
        message: 'Passwords do not match'
      });
    } else if (password && confirmPassword && password === confirmPassword) {
      // Clear the error when passwords match
      const updatedErrors = {...formErrors};
      delete updatedErrors.confirmPassword;
      setFormErrors(updatedErrors);
    }
  }, [password, confirmPassword, formErrors]);
  
  // Fetch customer data
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        setSubmitError('');
        
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';
        const response = await fetch(`${apiUrl}/customers/${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching customer: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setCustomer(data);
        
        // Format birthday for date input if it exists
        const formattedBirthday = data.birthday ? new Date(data.birthday).toISOString().split('T')[0] : '';
        
        // Set form data with customer data
        setFormData({
          name: data.name || '',
          email: data.email || '',
          username: data.username || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          birthday: formattedBirthday,
          location: data.location || '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error fetching customer:', error);
        setSubmitError('Failed to load customer data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCustomer();
  }, [customerId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CustomerFormInputs) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev: Record<string, string>) => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    
    // Password validation only if password field is not empty
    if (formData.password) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
    }
    
    setFormErrors(newErrors);
    return valid;
  };
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError('');
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4005';
      
      // Prepare payload - only include password if it's not empty
      const payload: Record<string, any> = {
        customerId: customer?.customerId,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        location: formData.location,
        role: 'USER'
      };
      
      // Only add birthday if it exists
      if (formData.birthday) {
        payload.birthday = new Date(formData.birthday).toISOString();
      }
      
      // Only add password if it's not empty
      if (formData.password) {
        payload.password = formData.password;
      }
      
      // Add other fields from customer that we're not updating
      if (customer) {
        payload.totalSpent = customer.totalSpent;
        if (customer.image) {
          payload.image = customer.image;
        }
      }
      
      // Get the auth token from cookies instead of localStorage
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
      const token = authCookie ? authCookie.split('=')[1].trim() : '';
      
      const response = await fetch(`${apiUrl}/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Error updating customer: ${response.status} ${response.statusText}`);
      }
      
      setSubmitSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/admin/customer');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating customer:', error);
      setSubmitError('Failed to update customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/customer');
  };
  
  // Location field was missing in the form
  
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
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-6">
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
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
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
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChange}
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
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
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
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
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
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {formErrors.username && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                  )}
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password {formData.password && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
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
                    <p className="text-gray-900 font-medium">{customer?.createdAt ? formatDate(customer.createdAt) : 'N/A'}</p>
                  </div>
                  
                  {/* Last Order */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Order</h3>
                    <p className="text-gray-900 font-medium">
                      {customer?.lastOrder?.amount 
                        ? formatCurrency(customer.lastOrder.amount) 
                        : formatCurrency(0)}
                    </p>
                  </div>
                  
                  {/* Total Spent */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                    <p className="text-gray-900 font-medium">
                      {formatCurrency(customer?.totalSpent)}
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
      )}
    </div>
  );
}