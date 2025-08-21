'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AboutContent, HalalCertification } from '../../../../types/about'

type AboutFormInputs = {
  description: string;
  vision: string;
  mission: string;
  awardsDescription: string;
  halalTitle: string;
  halalDescription: string;
  halalCertificateNumber: string;
  halalValidUntil: string;
};

export default function AboutForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<AboutFormInputs>();
  
  // Fetch about content
  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/about');
        
        if (!response.ok) {
          throw new Error('Failed to fetch about content');
        }
        
        const data: AboutContent = await response.json();
        
        // Reset form with fetched data
        reset({
          description: data.description || '',
          vision: data.vision || '',
          mission: data.mission || '',
          awardsDescription: data.awardsDescription || '',
          halalTitle: data.halalCertification?.title || '',
          halalDescription: data.halalCertification?.description || '',
          halalCertificateNumber: data.halalCertification?.certificateNumber || '',
          halalValidUntil: data.halalCertification?.validUntil || ''
        });
      } catch (error) {
        console.error('Error fetching about content:', error);
        setSubmitError('Failed to load about content');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAboutContent();
  }, [reset]);
  
  const onSubmit: SubmitHandler<AboutFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      setSubmitSuccess(false);
      
      // Prepare data for API
      const updateData = {
        description: data.description,
        vision: data.vision,
        mission: data.mission,
        awardsDescription: data.awardsDescription,
        halalCertification: {
          title: data.halalTitle,
          description: data.halalDescription,
          certificateNumber: data.halalCertificateNumber,
          validUntil: data.halalValidUntil
        }
      };
      
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update about content');
      }
      
      setSubmitSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error updating about content:', error);
      setSubmitError(error.message || 'Failed to update about content');
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
    <div>
      {/* Success/Error Messages */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          About page content updated successfully!
        </div>
      )}
      
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Main Description</h3>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              About Us Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={6}
              {...register('description', { required: 'Description is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Vision & Mission</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-1">
                Vision <span className="text-red-500">*</span>
              </label>
              <textarea
                id="vision"
                rows={4}
                {...register('vision', { required: 'Vision is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.vision && (
                <p className="mt-1 text-sm text-red-600">{errors.vision.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">
                Mission <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mission"
                rows={4}
                {...register('mission', { required: 'Mission is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.mission && (
                <p className="mt-1 text-sm text-red-600">{errors.mission.message}</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Awards</h3>
          
          <div>
            <label htmlFor="awardsDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Awards Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="awardsDescription"
              rows={4}
              {...register('awardsDescription', { required: 'Awards description is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.awardsDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.awardsDescription.message}</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Halal Certification</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="halalTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Certification Title <span className="text-red-500">*</span>
              </label>
              <input
                id="halalTitle"
                type="text"
                {...register('halalTitle', { required: 'Certification title is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.halalTitle && (
                <p className="mt-1 text-sm text-red-600">{errors.halalTitle.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="halalDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Certification Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="halalDescription"
                rows={4}
                {...register('halalDescription', { required: 'Certification description is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {errors.halalDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.halalDescription.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="halalCertificateNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="halalCertificateNumber"
                  type="text"
                  {...register('halalCertificateNumber', { required: 'Certificate number is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.halalCertificateNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.halalCertificateNumber.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="halalValidUntil" className="block text-sm font-medium text-gray-700 mb-1">
                  Valid Until <span className="text-red-500">*</span>
                </label>
                <input
                  id="halalValidUntil"
                  type="date"
                  {...register('halalValidUntil', { required: 'Valid until date is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.halalValidUntil && (
                  <p className="mt-1 text-sm text-red-600">{errors.halalValidUntil.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}