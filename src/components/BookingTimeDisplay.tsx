'use client'

import { useState, useEffect } from 'react';

type BookingTimeDisplayProps = {
  bookingInfo?: {
    mode: 'NOW' | 'SCHEDULED';
    iso?: string;
  };
}

export default function BookingTimeDisplay({ bookingInfo }: BookingTimeDisplayProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  useEffect(() => {
    // If it's a scheduled booking in the future, calculate time remaining
    if (bookingInfo?.mode === 'SCHEDULED' && bookingInfo.iso) {
      const scheduledTime = new Date(bookingInfo.iso).getTime();
      const now = Date.now();
      
      // Only show countdown if the scheduled time is in the future
      if (scheduledTime > now) {
        const updateTimeRemaining = () => {
          const currentTime = Date.now();
          const timeDiff = scheduledTime - currentTime;
          
          if (timeDiff <= 0) {
            setTimeRemaining('');
            return;
          }
          
          // Calculate hours and minutes
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeRemaining(`${hours}h ${minutes}m`);
        };
        
        // Update immediately and then every minute
        updateTimeRemaining();
        const interval = setInterval(updateTimeRemaining, 60000);
        
        return () => clearInterval(interval);
      }
    }
  }, [bookingInfo]); // Use the entire bookingInfo object as a dependency
  
  if (!bookingInfo) {
    return null;
  }
  
  // Format the scheduled date for display
  const formatScheduledDate = (isoString: string) => {
    const date = new Date(isoString);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    return `${dateFormatter.format(date)} at ${timeFormatter.format(date)}`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
      <h3 className="text-center font-bold mb-3">CUSTOMER BOOKING TIME</h3>
      
      {bookingInfo.mode === 'NOW' ? (
        <div className="text-center">
          <p className="text-lg font-medium">Book Now — ASAP</p>
          <p className="text-sm text-gray-600 mt-1">We're preparing your order</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium">Scheduled</p>
          <p className="font-medium text-gray-800">
            {bookingInfo.iso && formatScheduledDate(bookingInfo.iso)}
          </p>
          
          {timeRemaining && (
            <p className="text-sm text-gray-600 mt-2">
              Starts in {timeRemaining}
            </p>
          )}
        </div>
      )}
    </div>
  );
}