import { NextRequest, NextResponse } from 'next/server';
import { AboutContent } from '../../../types/about';

// Mock data for about content
const MOCK_ABOUT_CONTENT: AboutContent = {
  id: '1',
  description: 'Welcome to Ramen President, where passion for authentic flavors meets exceptional dining experiences.',
  vision: 'To be the most loved and preferred food brand.',
  mission: 'We are committed to delighting our customers with delicious, high-quality food.',
  teamMembers: [
    {
      id: '1',
      name: 'Agus Adi',
      position: 'Chief Executive Officer',
      description: 'Leads our company with over 15 years of restaurant industry experience.',
      profileImage: '/images/profile-pic.webp'
    },
    {
      id: '2',
      name: 'Dadang Smith',
      position: 'Chief Operations Officer',
      description: 'Oversees daily operations with a focus on customer satisfaction.',
      profileImage: '/images/profile-pic.webp'
    },
    {
      id: '3',
      name: 'Dudung Johnson',
      position: 'Executive Chef',
      description: 'Creates our innovative menu with a passion for authentic flavors.',
      profileImage: '/images/profile-pic.webp'
    }
  ],
  awardsDescription: 'We\'re proud to have been recognized for our commitment to excellence.',
  halalCertification: {
    title: 'Certified Halal',
    description: 'We are proud to announce that all our restaurants have received Halal certification.',
    certificateNumber: 'HAL-12345-ID',
    validUntil: '2024-12-31'
  }
};

// GET handler for about content
export async function GET() {
  try {
    // In a real app, you would fetch from a database
    // For now, use mock data
    return NextResponse.json(MOCK_ABOUT_CONTENT);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In a real app, you would update in a database
    // For now, just log the update (can't modify constants)
    console.log('Would update about content with:', data);
    
    // Return the data as if it was updated
    const updatedContent = {
      ...MOCK_ABOUT_CONTENT,
      ...data,
    };
    
    return NextResponse.json({
      success: true,
      message: 'About content updated successfully',
      data: updatedContent
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}