import { NextRequest, NextResponse } from 'next/server';
import { TeamMember } from '../../../../../types/about';

// Import the parent route module instead of just the MOCK_ABOUT_CONTENT
import { MOCK_ABOUT_CONTENT } from '../../../about/route';

// No need for the getMockContent workaround anymore

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const memberId = params.id;
    const data = await request.json();
    
    // Use MOCK_ABOUT_CONTENT directly
    const memberIndex = MOCK_ABOUT_CONTENT.teamMembers.findIndex(
      (member: TeamMember) => member.id === memberId
    );
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Update the team member
    MOCK_ABOUT_CONTENT.teamMembers[memberIndex] = {
      ...MOCK_ABOUT_CONTENT.teamMembers[memberIndex],
      ...data
    };
    
    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully',
      teamMember: MOCK_ABOUT_CONTENT.teamMembers[memberIndex]
    });
  } catch (error: unknown) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const memberId = params.id;
    
    // Use MOCK_ABOUT_CONTENT directly instead of getMockContent()
    // Find the team member index with proper type checking
    const memberIndex = MOCK_ABOUT_CONTENT.teamMembers.findIndex(
      (member: TeamMember) => member.id === memberId
    );
    
    if (memberIndex === -1) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Remove the team member
    MOCK_ABOUT_CONTENT.teamMembers.splice(memberIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error: unknown) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}