'use client'

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';

interface ReceiptPrintWrapperProps {
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
  onPrint?: () => void;
}

export default function ReceiptPrintWrapper({
  orderID,
  pickupNumber,
  customerName,
  orderItems,
  orderType,
  orderLocation,
  paymentMethod,
  bookingInfo,
  total,
  onPrint
}: ReceiptPrintWrapperProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    onAfterPrint: () => {
      if (onPrint) {
        onPrint();
      }
    },
    pageStyle: `
      @page {
        size: 80mm 297mm;
        margin: 10mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .receipt-container {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 10px !important;
        }
      }
    `
  });

  // Expose print function to parent component
  React.useEffect(() => {
    // Make the print function available globally for the button click
    (window as any).printReceipt = handlePrint;
    
    return () => {
      delete (window as any).printReceipt;
    };
  }, [handlePrint]);

  return (
    <div style={{ display: 'none' }}>
      <div ref={receiptRef}>
        <Receipt
          orderID={orderID}
          pickupNumber={pickupNumber}
          customerName={customerName}
          orderItems={orderItems}
          orderType={orderType}
          orderLocation={orderLocation}
          paymentMethod={paymentMethod}
          bookingInfo={bookingInfo}
          total={total}
        />
      </div>
    </div>
  );
}

// Export the print function for external use
export const useReceiptPrint = (receiptRef: React.RefObject<HTMLDivElement>) => {
  return useReactToPrint({
    contentRef: receiptRef,
    pageStyle: `
      @page {
        size: 80mm 297mm;
        margin: 10mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .receipt-container {
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 10px !important;
        }
      }
    `
  });
};
