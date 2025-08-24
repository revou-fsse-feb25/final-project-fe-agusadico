'use client'

import React from 'react';
import Image from 'next/image';

interface ReceiptProps {
  orderID: string;
  pickupNumber: string;
  customerName: string;
  orderItems: any[];
  orderType: string;
  orderLocation: string;
  paymentMethod: string;
  bookingInfo: {
    mode: string;
    iso: string;
  };
  total: number;
}

export default function Receipt({ 
  orderID, 
  pickupNumber, 
  customerName, 
  orderItems, 
  orderType, 
  orderLocation, 
  paymentMethod, 
  bookingInfo, 
  total 
}: ReceiptProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'qris':
        return 'QRIS';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'cash':
        return 'Cash';
      default:
        return method;
    }
  };

  return (
    <div className="receipt-container bg-white text-black p-6 max-w-md mx-auto font-mono text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <Image 
            src="/images/ramen-president-logo-footer.png" 
            alt="Ramen President Logo" 
            width={120} 
            height={52} 
            className="object-contain"
          />
        </div>
        <h1 className="text-lg font-bold">Ramen President</h1>
        <p className="text-xs text-gray-600">"Keadilan Rasa untuk Seluruh Rakyat"</p>
        <p className="text-xs text-gray-600">Jl. Prof. DR. Satrio No.164, Karet Semanggi</p>
        <p className="text-xs text-gray-600">Jakarta Selatan, Jakarta</p>
      </div>

      {/* Order Details */}
      <div className="border-t border-b border-gray-300 py-3 mb-4">
        <div className="flex justify-between mb-1">
          <span>Order ID:</span>
          <span className="font-bold">{orderID}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Pickup #:</span>
          <span className="font-bold">{pickupNumber}</span>
        </div>
        {/* Only show date for non-ASAP orders */}
        {bookingInfo && bookingInfo.mode && bookingInfo.mode !== 'NOW' && (
          <div className="flex justify-between mb-1">
            <span>Date:</span>
            <span>{formatDate(bookingInfo.iso)}</span>
          </div>
        )}
        <div className="flex justify-between mb-1">
          <span>Type:</span>
          <span>{orderType}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Location:</span>
          <span>{orderLocation}</span>
        </div>
        <div className="flex justify-between">
          <span>Payment:</span>
          <span>{formatPaymentMethod(paymentMethod)}</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-4">
        <div className="flex justify-between">
          <span>Customer:</span>
          <span className="font-bold">{customerName}</span>
        </div>
      </div>

      {/* Items */}
      <div className="border-t border-gray-300 pt-3 mb-4">
        <div className="text-center font-bold mb-2">ORDER ITEMS</div>
        {orderItems && orderItems.length > 0 ? (
          orderItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-1">
              <div className="flex-1">
                <span className="font-medium">{item.product.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No items found</div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-300 pt-3 mb-6">
        <div className="flex justify-between font-bold text-lg">
          <span>TOTAL:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-600">
        <p className="mb-1">Thank you for your order!</p>
        <p>Please present this receipt when picking up your order.</p>
        <p className="mt-2">For questions, contact: 081234567890</p>
      </div>
    </div>
  );
}
