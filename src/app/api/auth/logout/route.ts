import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the auth cookie using the Response API
  const response = NextResponse.json({ 
    success: true,
    message: 'Logged out successfully' 
  });
  
  // Set cookie on the response object
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set expiration to the past
    path: '/',
  });

  return response;
}