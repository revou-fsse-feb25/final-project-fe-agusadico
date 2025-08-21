'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Image from 'next/image'

export default function Navbar() {
  const [showAboutSubmenu, setShowAboutSubmenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  
  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav className={`restaurant-bg py-4 px-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <h1 className="text-2xl font-bold text-white">Butazzo Pizza</h1> */}
          <div className="mb-2 flex justify-center">
              <Image 
                src="/images/ramenpresident-logo.png" 
                alt="Ramen President Logo" 
                width={150} 
                height={65} 
                priority 
                className="object-contain"
              />
            </div>
        </div>
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <div className="relative">
            <button 
              className="flex items-center gap-1"
              onMouseEnter={() => setShowAboutSubmenu(true)}
              onMouseLeave={() => setShowAboutSubmenu(false)}
            >
              <Link href="/about">About</Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showAboutSubmenu && (
              <div 
                className="absolute top-full left-0 bg-white text-black py-2 px-4 rounded shadow-md z-10 min-w-[120px]"
                onMouseEnter={() => setShowAboutSubmenu(true)}
                onMouseLeave={() => setShowAboutSubmenu(false)}
              >
                <div className="flex flex-col gap-2">
                  <Link href="/faq" className="hover:text-red-600">FAQ</Link>
                  <Link href="/event" className="hover:text-red-600">Event</Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 21C20 18.87 18.84 16.84 17 15.55C15.58 14.58 13.83 14 12 14C10.17 14 8.42 14.58 7 15.55C5.16 16.84 4 18.87 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <Link href="/account" className="relative">
              <span className="text-gray-50">Accounts</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg className="h-5 w-5 text-gray-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </div>
              <Link href="/cart" className="relative">
                <svg className="h-5 w-5 text-gray-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <button className="text-white">☰</button>
        </div>
      </div>
    </nav>
  );
}