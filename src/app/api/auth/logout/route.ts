import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Clear the auth cookie
  cookieStore.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set expiration to the past
    sameSite: 'lax', // Match the login cookie setting
    path: '/',
  });

  return NextResponse.json({ success: true });
}