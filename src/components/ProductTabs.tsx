'use client'

import { useState } from "react";
import { ProductType } from "../types/product";

type ProductTabsProps = {
  product: ProductType;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-wrap -mb-px">
          <button 
            className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'description' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'additional' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('additional')}
          >
            Additional Information
          </button>
          <button 
            className={`inline-block py-4 px-4 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'description' && (
          <div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
            <p className="text-gray-600 dark:text-gray-300">Professionally-harvested tender trimmed green beans at natural ripeness. Perfect for salads, side dishes, or main courses. Ready to cook and serve. Goes well with most dishes and provides essential nutrients. Organic certified and sustainably grown.</p>
          </div>
        )}
        
        {activeTab === 'additional' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="border-b border-gray-200 pb-2">
                <span className="font-medium">Weight:</span> {product.pack}
              </div> */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium dark:text-white">Category:</span> <span className="dark:text-gray-300">{product.category}</span>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium dark:text-white">SKU:</span> <span className="dark:text-gray-300">{product.sku}</span>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium dark:text-white">Tags:</span> <span className="dark:text-gray-300">Organic, Vegetables, Fresh</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 dark:text-white">{product.reviewCount} reviews for {product.name}</h3>
              
              {/* Sample Review */}
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold">
                      JD
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="mb-1">
                      <span className="font-medium dark:text-white">John Doe</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">June 15, 2023</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">These green beans are excellent! Very fresh and crisp. I used them in a stir fry and they were perfect.</p>
                  </div>
                </div>
              </div>
              
              {/* Add Review Form */}
              <div>
                <h3 className="text-lg font-medium mb-4 dark:text-white">Add a review</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Your rating *</label>
                    <div className="flex text-gray-300">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 cursor-pointer hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Your review *</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Name *</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Email *</label>
                      <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-600">Save my name, email, and website in this browser for the next time I comment.</span>
                    </label>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}