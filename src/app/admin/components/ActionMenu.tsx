'use client'

import { useRef, useEffect } from 'react'

type ActionMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  actions: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: string;
  }[];
}

export default function ActionMenu({ isOpen, onClose, actions }: ActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside to close the menu
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
      style={{ minWidth: '160px' }}
    >
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => {
            action.onClick();
            onClose();
          }}
          className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
        >
          <span className={`mr-2 ${action.color || 'text-gray-500'}`}>
            {action.icon}
          </span>
          <span className={action.color || 'text-gray-700'}>{action.label}</span>
        </button>
      ))}
    </div>
  );
}