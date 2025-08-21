'use client'

import { useState, useEffect } from 'react';

type BookingTimeProps = {
  defaultMode?: 'NOW' | 'SCHEDULED';
  onChange?: (value: { mode: 'NOW' | 'SCHEDULED'; iso?: string }) => void;
}

const SLOT_MINUTES = 5;
const PREPARATION_MINUTES = 30;
const OPENING_HOUR = 10; // 10:00 AM
const CLOSING_HOUR = 21; // 9:00 PM

export default function BookingTime({ defaultMode = 'NOW', onChange }: BookingTimeProps) {
  const [mode, setMode] = useState<'NOW' | 'SCHEDULED'>(defaultMode);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<{ value: string, label: string, disabled: boolean }[]>([]);
  const [availableSlots, setAvailableSlots] = useState<{ value: string, label: string }[]>([]);
  
  // Initialize dates and times
  useEffect(() => {
    // Generate available dates (today + next 14 days)
    const dates = [];
    const now = new Date();
    const currentHour = now.getHours();
    
    // Check if current time is after closing time
    const isTodayAvailable = currentHour < CLOSING_HOUR;
    
    // Format today's date
    const today = new Date();
    const todayStr = formatDateForInput(today);
    dates.push({
      value: todayStr,
      label: 'Today',
      disabled: !isTodayAvailable
    });
    
    // Format tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatDateForInput(tomorrow);
    dates.push({
      value: tomorrowStr,
      label: 'Tomorrow',
      disabled: false
    });
    
    // Add the next 13 days
    for (let i = 2; i < 15; i++) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      const futureDateStr = formatDateForInput(futureDate);
      const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      dates.push({
        value: futureDateStr,
        label: formatter.format(futureDate),
        disabled: false
      });
    }
    
    setAvailableDates(dates);
    
    // Set default date to today if available, otherwise tomorrow
    const defaultDate = isTodayAvailable ? todayStr : tomorrowStr;
    setDate(defaultDate);
    
    // Generate time slots for the default date
    updateTimeSlots(defaultDate);
    
    // Emit default selection on mount
    if (defaultMode === 'NOW') {
      onChange?.({ mode: 'NOW' });
    }
    // For SCHEDULED mode, the initial emission will happen after time slots are generated
  }, []);
  
  // Update time slots when date changes
  useEffect(() => {
    if (date) {
      updateTimeSlots(date);
    }
  }, [date]);
  
  // Emit scheduled booking when date or time changes
  useEffect(() => {
    if (mode === 'SCHEDULED' && date && time) {
      emitScheduledBooking();
    }
  }, [mode, date, time]);
  
  // Helper function to format date for input
  function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Generate time slots based on selected date
  function updateTimeSlots(selectedDate: string) {
    const slots = [];
    const now = new Date();
    const selectedDateObj = new Date(selectedDate);
    
    // Check if selected date is today
    const isToday = selectedDateObj.toDateString() === now.toDateString();
    
    // Determine start time
    let startHour = OPENING_HOUR;
    let startMinute = 0;
    
    if (isToday) {
      // For today, start time is current time + preparation time
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Calculate minutes since midnight
      const currentTotalMinutes = currentHour * 60 + currentMinute + PREPARATION_MINUTES;
      
      // Round up to the next slot
      const roundedTotalMinutes = Math.ceil(currentTotalMinutes / SLOT_MINUTES) * SLOT_MINUTES;
      
      startHour = Math.floor(roundedTotalMinutes / 60);
      startMinute = roundedTotalMinutes % 60;
      
      // If start time is after closing time, no slots available
      if (startHour >= CLOSING_HOUR) {
        setAvailableSlots([]);
        setTime('');
        return;
      }
    }
    
    // Generate slots from start time to closing time
    for (let hour = startHour; hour <= CLOSING_HOUR; hour++) {
      // Determine starting minute for this hour
      const firstMinute = (hour === startHour) ? startMinute : 0;
      
      // Round to nearest slot step
      const roundedFirstMinute = Math.ceil(firstMinute / SLOT_MINUTES) * SLOT_MINUTES;
      
      for (let minute = roundedFirstMinute; minute < 60; minute += SLOT_MINUTES) {
        // Skip if we've gone past closing hour
        if (hour === CLOSING_HOUR && minute > 0) break;
        
        const timeValue = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        
        // Format for display (12-hour format)
        const timeObj = new Date();
        timeObj.setHours(hour, minute, 0);
        const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });
        const displayTime = formatter.format(timeObj);
        
        slots.push({
          value: timeValue,
          label: displayTime
        });
      }
    }
    
    setAvailableSlots(slots);
    
    // Set default time to first available slot
    if (slots.length > 0) {
      setTime(slots[0].value);
    } else {
      setTime('');
    }
  }
  
  // Handle mode change
  function handleModeChange(newMode: 'NOW' | 'SCHEDULED') {
    setMode(newMode);
    
    if (newMode === 'NOW') {
      onChange?.({ mode: 'NOW' });
    }
    // For SCHEDULED mode, the emission will happen in the useEffect when date and time are available
  }
  
  // Create and emit scheduled booking
  function emitScheduledBooking() {
    if (date && time) {
      // Create ISO string from date and time
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      
      const scheduledDate = new Date(
        parseInt(year),
        parseInt(month) - 1, // Month is 0-indexed in JS Date
        parseInt(day),
        parseInt(hour),
        parseInt(minute)
      );
      
      onChange?.({ 
        mode: 'SCHEDULED', 
        iso: scheduledDate.toISOString() 
      });
    }
  }
  
  return (
    <div className="mb-4 bg-white p-6 rounded-lg shadow-sm transition-all duration-300">
      <h2 className="text-xl font-bold mb-4">CHOOSE YOUR BOOKING TIME</h2>
      
      <div className="space-y-4">
        {/* Book Now Option */}
        <div className="flex items-center">
          <input
            type="radio"
            id="book-now"
            name="booking-mode"
            className="h-4 w-4 text-[#b30000] focus:ring-[#b30000]"
            checked={mode === 'NOW'}
            onChange={() => handleModeChange('NOW')}
            aria-label="Book Now"
          />
          <label htmlFor="book-now" className="ml-2 block text-sm font-medium text-gray-700">
            Book Now
          </label>
        </div>
        
        {/* Schedule Booking Option */}
        <div className="flex items-center">
          <input
            type="radio"
            id="schedule-booking"
            name="booking-mode"
            className="h-4 w-4 text-[#b30000] focus:ring-[#b30000]"
            checked={mode === 'SCHEDULED'}
            onChange={() => handleModeChange('SCHEDULED')}
            aria-label="Schedule Booking Time"
          />
          <label htmlFor="schedule-booking" className="ml-2 block text-sm font-medium text-gray-700">
            Schedule Booking Time
          </label>
        </div>
        
        {mode === 'SCHEDULED' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Selector */}
              <div>
                <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <select
                  id="booking-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#b30000] focus:border-[#b30000] sm:text-sm"
                  aria-label="Select Booking Date"
                >
                  {availableDates.map((dateOption) => (
                    <option 
                      key={dateOption.value} 
                      value={dateOption.value}
                      disabled={dateOption.disabled}
                    >
                      {dateOption.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Time Selector */}
              <div>
                <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time
                </label>
                <select
                  id="booking-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#b30000] focus:border-[#b30000] sm:text-sm"
                  aria-label="Select Booking Time"
                  disabled={availableSlots.length === 0}
                >
                  {availableSlots.length === 0 ? (
                    <option value="">No available slots</option>
                  ) : (
                    availableSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}