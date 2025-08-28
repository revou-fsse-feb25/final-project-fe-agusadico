import { NextRequest, NextResponse } from 'next/server';
import { TeamMember } from '../../../../../types/about';

// Mock team members data
const mockTeamMembers = [
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
];

// GET handler for team member by ID
export async function GET(request: NextRequest) {
  try {
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const memberId = pathParts[pathParts.length - 1];
    
    const member = mockTeamMembers.find(m => m.id === memberId);
    
    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(member);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// PUT handler for updating team member
export async function PUT(request: NextRequest) {
  try {
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const memberId = pathParts[pathParts.length - 1];
    
    const data = await request.json();
    
    const memberIndex = mockTeamMembers.findIndex(
      (member: TeamMember) => member.id === memberId
    );
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Update the team member
    mockTeamMembers[memberIndex] = {
      ...mockTeamMembers[memberIndex],
      ...data
    };
    
    return NextResponse.json(mockTeamMembers[memberIndex]);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing team member
export async function DELETE(request: NextRequest) {
  try {
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const memberId = pathParts[pathParts.length - 1];
    
    const memberIndex = mockTeamMembers.findIndex(
      (member: TeamMember) => member.id === memberId
    );
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Remove the team member
    mockTeamMembers.splice(memberIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}