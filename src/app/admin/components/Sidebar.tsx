"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-[200px] restaurant-bg text-white min-h-screen flex flex-col">
      <div className="p-5 flex items-center gap-2">
        <Image 
          src="/images/ramenpresident-logo.png" 
          alt="Ramen President Logo" 
          width={120} 
          height={40} 
          className="object-contain"
        />
      </div>
      
      <nav className="flex-1 py-5">
        <ul>
          <li>
            <a 
              href="/admin" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin") && !pathname.includes("/admin/") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/customer" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/customer") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Customer</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/product" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/product") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Product</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/order" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/order") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Order</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/manual-booking" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/manual-booking") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Manual Booking</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/report" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/report") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
              </svg>
              <span>Report</span>
            </a>
          </li>
          <li>
            <a 
              href="/admin/pages" 
              className={`flex items-center gap-3 px-5 py-3 ${isActive("/admin/pages") ? "text-black bg-yellow-500 border-l-4 border-yellow-600" : "hover:bg-rose-700/50 transition-colors"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span>Pages</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="p-5 text-xs">
        <p>Ramen President Admin Dashboard</p>
        <p>© 2025 All Rights Reserved</p>
        <div className="flex items-center gap-1 mt-2">
          <span>Made with</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>by Agus Purwadi</span>
        </div>
      </div>
    </aside>
  )
}