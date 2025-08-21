import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a real app, you would handle file uploads here
    // For now, just return a mock image URL
    const mockImageUrls = [
      '/images/profile-pic.webp',
      '/images/ramenpresident-logo.png',
      '/images/payment-method-bca.jpg'
    ];
    
    // Simulate a delay for the upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a random image URL from the mock list
    const randomImageUrl = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];
    
    return NextResponse.json({
      success: true,
      imageUrl: randomImageUrl
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}