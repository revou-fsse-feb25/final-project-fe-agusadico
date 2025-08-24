import React from 'react';

export default function SearchBar() {
  return (
    <div className="bg-[#b30000] py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="text-black bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded-l-md transition-colors">
            All Categories
          </button>
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Type Your Products..." 
              className="w-[300px] md:w-[790px] py-1 px-3 text-black rounded-r-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-300 transition-colors" 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md flex items-center transition-colors">
            <span>Search</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-3">
            <div className="text-white flex items-center">
              <span>Hotline Number:</span>
              <span className="font-bold ml-1">+9888-256-666</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}