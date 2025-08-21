import { NextRequest, NextResponse } from 'next/server';
import { getJwtFromCookies, verifyJwtToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = getJwtFromCookies();
    console.log('/me endpoint - Token exists:', !!token);
    
    if (!token) {
      console.log('/me endpoint - No token found');
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    const userData = verifyJwtToken(token);
    console.log('/me endpoint - Token verification result:', userData);
    
    if (!userData) {
      console.log('/me endpoint - Invalid token');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Return user data
    console.log('/me endpoint - Returning user data:', userData);
    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}