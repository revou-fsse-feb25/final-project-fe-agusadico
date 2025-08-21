'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FAQItem } from '@/types/faq'

type FAQModalProps = {
  faq: FAQItem | null
  onClose: () => void
  onSubmit: (data: Partial<FAQItem>) => void
}

type FAQFormInputs = {
  question: string
  answer: string
  isPublished: boolean
}

export default function FAQModal({ faq, onClose, onSubmit }: FAQModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FAQFormInputs>({
    defaultValues: {
      question: faq?.question || '',
      answer: faq?.answer || '',
      isPublished: faq?.isPublished ?? true
    }
  })
  
  // Reset form when faq changes
  useEffect(() => {
    reset({
      question: faq?.question || '',
      answer: faq?.answer || '',
      isPublished: faq?.isPublished ?? true
    })
  }, [faq, reset])
  
  const onFormSubmit: SubmitHandler<FAQFormInputs> = async (data) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {faq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                id="question"
                type="text"
                className={`w-full px-3 py-2 border ${errors.question ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                {...register('question', { required: 'Question is required' })}
              />
              {errors.question && (
                <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                Answer
              </label>
              <textarea
                id="answer"
                rows={6}
                className={`w-full px-3 py-2 border ${errors.answer ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500`}
                {...register('answer', { 
                  required: 'Answer is required',
                  minLength: { value: 10, message: 'Answer must be at least 10 characters' }
                })}
              />
              {errors.answer && (
                <p className="mt-1 text-sm text-red-600">{errors.answer.message}</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="isPublished"
                type="checkbox"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                {...register('isPublished')}
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                Publish this FAQ item
              </label>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="restaurant-bg text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}