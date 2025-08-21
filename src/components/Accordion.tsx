'use client'

import { useState, ReactNode } from 'react'

type AccordionItemProps = {
  title: string
  children?: ReactNode
  defaultOpen?: boolean
  isActive?: boolean
  onClick?: () => void
  id?: string
}

export function AccordionItem({ 
  title, 
  children, 
  defaultOpen = false,
  isActive = false,
  onClick,
  id
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // For sidebar tab style, we'll use onClick instead of internal state
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setIsOpen(!isOpen)
    }
  }

  // If using as sidebar tab, render differently
  if (onClick !== undefined) {
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          className={`flex w-full items-center justify-between py-4 px-5 text-left font-medium ${isActive ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} focus:outline-none transition-colors duration-200`}
          onClick={handleClick}
          aria-expanded={isActive}
          id={id}
        >
          <span className="text-lg font-semibold">{title}</span>
          {isActive && (
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    )
  }

  // Original accordion behavior
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 px-5 text-left font-medium bg-red-600 text-white hover:bg-red-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        id={id}
      >
        <span className="text-lg font-semibold uppercase">{title}</span>
        <svg
          className={`h-5 w-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
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

type AccordionProps = {
  children: ReactNode
  className?: string
  sidebarStyle?: boolean
}

export default function Accordion({ children, className = '', sidebarStyle = false }: AccordionProps) {
  return (
    <div className={`divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  )
}