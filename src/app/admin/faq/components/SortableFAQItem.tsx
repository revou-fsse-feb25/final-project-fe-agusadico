'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FAQItem } from '@/types/faq'

type SortableFAQItemProps = {
  faq: FAQItem
  onEdit: () => void
  onDelete: () => void
  onPublishToggle: () => void
  isDeleting: boolean
}

export function SortableFAQItem({ faq, onEdit, onDelete, onPublishToggle, isDeleting }: SortableFAQItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: faq.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Format date for display
  const formattedDate = new Date(faq.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      <td className="px-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-2 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-md truncate">
        {faq.question}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          onClick={onPublishToggle}
          className={`px-3 py-1 rounded-full text-xs font-medium ${faq.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {faq.isPublished ? 'Published' : 'Draft'}
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900 ml-4"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="inline-block animate-spin h-4 w-4 border-t-2 border-red-500 rounded-full"></span>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </td>
    </tr>
  )
}