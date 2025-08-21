import { NextRequest, NextResponse } from 'next/server';

// In a real app, you would add the user to your database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store the user in your database
    // 4. Generate a JWT token
    // 5. Set the token in a cookie

    // For now, just return a success message
    return NextResponse.json({
      success: true,
      message: 'Registration successful. Please log in.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}