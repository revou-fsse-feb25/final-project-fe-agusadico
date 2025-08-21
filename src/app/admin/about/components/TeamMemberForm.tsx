'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TeamMember } from '../../../../types/about'

type TeamMemberFormInputs = {
  name: string;
  position: string;
  description: string;
};

type TeamMemberFormProps = {
  member: TeamMember | null;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function TeamMemberForm({ member, onSuccess, onCancel }: TeamMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(member?.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<TeamMemberFormInputs>({
    defaultValues: {
      name: member?.name || '',
      position: member?.position || '',
      description: member?.description || ''
    }
  });
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Upload the file
    try {
      setIsUploading(true);
      
      // In a real app, you would create a FormData object and send the file
      // For now, we'll just simulate an upload
      const response = await fetch('/api/uploads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'profile' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      setImagePreview(data.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setSubmitError('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };
  
  const onSubmit: SubmitHandler<TeamMemberFormInputs> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      // Prepare data for API
      const memberData = {
        ...data,
        profileImage: imagePreview || '/images/profile-pic.webp'
      };
      
      // Determine if this is an update or create
      const url = member ? `/api/about/team-members/${member.id}` : '/api/about/team-members';
      const method = member ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${member ? 'update' : 'add'} team member`);
      }
      
      onSuccess();
    } catch (error: any) {
      console.error(`Error ${member ? 'updating' : 'adding'} team member:`, error);
      setSubmitError(error.message || `Failed to ${member ? 'update' : 'add'} team member`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position/Role <span className="text-red-500">*</span>
            </label>
            <input
              id="position"
              type="text"
              {...register('position', { required: 'Position is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description', { required: 'Description is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile preview" 
                  className="h-32 w-32 object-cover rounded-md"
                />
              ) : (
                <div className="h-32 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  disabled={isUploading}
                />
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG or GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (member ? 'Update' : 'Add')}
          </button>
        </div>
      </form>
    </div>
  );
}