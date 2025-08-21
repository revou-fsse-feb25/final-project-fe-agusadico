'use client'

import { useState } from 'react';

type OrderTypeSelectorProps = {
  orderType: string;
  orderLocation: string;
  onOrderTypeChange: (type: string) => void;
};

export default function OrderTypeSelector({ 
  orderType, 
  orderLocation, 
  onOrderTypeChange 
}: OrderTypeSelectorProps) {
  const [showOrderTypeModal, setShowOrderTypeModal] = useState<boolean>(false);

  const handleOrderTypeChange = (type: string) => {
    onOrderTypeChange(type);
    setShowOrderTypeModal(false);
  };

  return (
    <>
      {/* Order Type Modal */}
      {showOrderTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">SELECT ORDER TYPE</h3>
              <button 
                onClick={() => setShowOrderTypeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => handleOrderTypeChange('Dine-In')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-red-500 ${orderType === 'Dine-In' ? 'border-red-500' : 'border-gray-200'}`}
              >
                <div className="w-12 h-12 mb-2">
                  <img src="/images/dine-in.png" alt="Dine-In" className="w-full h-full object-contain" />
                </div>
                <span className="font-medium">Dine-In</span>
              </div>
              
              <div 
                onClick={() => handleOrderTypeChange('Take Away')}
                className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer hover:border-red-500 ${orderType === 'Take Away' ? 'border-red-500' : 'border-gray-200'}`}
              >
                <div className="w-12 h-12 mb-2">
                  <img src="/images/take-away.png" alt="Take Away" className="w-full h-full object-contain" />
                </div>
                <span className="font-medium">Take Away</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dine-in Location Display */}
      <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
        <div className="flex items-center mb-4">
          <div className="bg-red-600 p-2 rounded-md mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold">{orderType.toUpperCase()}</h3>
            <p className="text-sm text-gray-600">{orderLocation}</p>
            <p className="text-sm text-gray-600">Jl. Tebet Utara Raya No. 10 Jakarta</p>
          </div>
        </div>
        <button 
          className="text-red-600 text-sm font-medium hover:text-red-700"
          onClick={() => setShowOrderTypeModal(true)}
        >
          Change Order Type
        </button>
      </div>
    </>
  );
}