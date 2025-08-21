'use client'

import { useState } from 'react';

type PaymentMethodModalProps = {
  showModal: boolean;
  onClose: () => void;
  selectedPayment: string;
  onSelectPayment: (method: string) => void;
};

const PaymentMethodModal = ({
  showModal,
  onClose,
  selectedPayment,
  onSelectPayment,
}: PaymentMethodModalProps) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-bold">PAYMENT METHOD</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="p-4">
          <h4 className="font-medium mb-3">Instant Payment</h4>
          
          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">QRIS</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="qris"
                checked={selectedPayment === 'qris'}
                onChange={() => onSelectPayment('qris')}
                className="h-5 w-5 text-red-600"
              />
            </div>
          </div>
          
          <h4 className="font-medium mb-3">Other Payment Methods</h4>
          
          <div className="border border-gray-300 rounded-md p-4 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Bank Transfer</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="bank_transfer"
                checked={selectedPayment === 'bank_transfer'}
                onChange={() => onSelectPayment('bank_transfer')}
                className="h-5 w-5 text-red-600"
              />
            </div>
          </div>
          
          <div className="border border-gray-300 rounded-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Cash</span>
              </div>
              <input 
                type="radio" 
                name="payment" 
                value="cash"
                checked={selectedPayment === 'cash'}
                onChange={() => onSelectPayment('cash')}
                className="h-5 w-5 text-red-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;