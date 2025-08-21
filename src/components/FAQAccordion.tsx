'use client'

import { useState, ReactNode } from 'react'

type FAQItemProps = {
  question: string
  children: ReactNode
  defaultOpen?: boolean
}

export function FAQItem({ question, children, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 px-5 text-left font-medium hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 bg-white">{children}</div>
      </div>
    </div>
  )
}

type FAQAccordionProps = {
  children: ReactNode
  className?: string
}

export default function FAQAccordion({ children, className = '' }: FAQAccordionProps) {
  return (
    <div className={`divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}