import { NextRequest, NextResponse } from 'next/server';
import { TeamMember } from '../../../../types/about';

type TeamMemberInput = {
  name: string;
  position: string;
  description: string;
  profileImage?: string;
};

// Create a local reference to avoid import issues
// This should match the structure from your main about route
let mockAboutContent = {
  teamMembers: [] as TeamMember[]
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TeamMemberInput;
    
    // Validate required fields
    if (!data.name || !data.position || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, position, description' },
        { status: 400 }
      );
    }
    
    // Generate a new ID
    const newId = Date.now().toString();
    
    // Create new team member
    const newTeamMember: TeamMember = {
      id: newId,
      name: data.name,
      position: data.position,
      description: data.description,
      profileImage: data.profileImage || '/images/profile-pic.webp'
    };
    
    // Add to mock data
    mockAboutContent.teamMembers.push(newTeamMember);
    
    return NextResponse.json({
      success: true,
      message: 'Team member added successfully',
      teamMember: newTeamMember
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding team member:', error);
    return NextResponse.json(
      { error: 'Failed to add team member' },
      { status: 500 }
    );
  }
}