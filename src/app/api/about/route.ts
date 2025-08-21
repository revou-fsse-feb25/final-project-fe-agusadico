import { NextRequest, NextResponse } from 'next/server';
import { AboutContent } from '../../../types/about';

// Mock data for development
// Export the variable so it can be imported by other modules
export let MOCK_ABOUT_CONTENT: AboutContent = {
  id: '1',
  description: 'Welcome to Ramen President, where passion for authentic flavors meets exceptional dining experiences. Since our founding in 2025, we\'ve been dedicated to bringing the finest quality food to our customers.\n\nOur journey began with a simple idea: to create a restaurant that serves delicious food made from the freshest ingredients in a welcoming atmosphere. Today, we\'re proud to have grown into a beloved establishment with multiple locations while staying true to our original vision.',
  vision: 'To be the most loved and preferred food brand, creating memorable dining experiences through our exceptional food quality, service, and ambiance.',
  mission: 'We are committed to delighting our customers with delicious, high-quality food made from the finest ingredients. We strive to provide exceptional service in a welcoming atmosphere while maintaining sustainable business practices and supporting the communities we serve.',
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
  awardsDescription: 'We\'re proud to have been recognized for our commitment to excellence in food quality and customer service.',
  halalCertification: {
    title: 'Certified Halal',
    description: 'We are proud to announce that all our restaurants have received Halal certification from the Islamic Food and Nutrition Council. This certification ensures that our food preparation methods and ingredients comply with Islamic dietary laws.',
    certificateNumber: 'HAL-12345-ID',
    validUntil: '2024-12-31'
  }
};

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
    // For now, just update the mock data
    MOCK_ABOUT_CONTENT = {
      ...MOCK_ABOUT_CONTENT,
      ...data,
    };
    
    return NextResponse.json({
      success: true,
      message: 'About content updated successfully'
    });
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}