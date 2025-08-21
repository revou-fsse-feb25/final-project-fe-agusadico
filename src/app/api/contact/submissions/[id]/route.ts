import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/types/contact';

// Mock data for contact submissions (same as in the main route file)
let submissions: ContactSubmission[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+62812345678',
    email: 'john.doe@example.com',
    topic: 'complaint',
    location: 'Jakarta',
    message: 'I had an issue with my recent order. The food was cold when it arrived.',
    submittedAt: '2023-06-15T08:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+62823456789',
    email: 'jane.smith@example.com',
    topic: 'suggestion',
    location: 'Bandung',
    message: 'I would like to suggest adding more vegetarian options to your menu.',
    submittedAt: '2023-06-16T10:15:00Z'
  },
  {
    id: '3',
    name: 'Ahmad Rizky',
    phone: '+62834567890',
    email: 'ahmad.rizky@example.com',
    topic: 'birthday',
    location: 'Surabaya',
    message: 'I would like to book a birthday party for 15 people next month.',
    submittedAt: '2023-06-17T14:45:00Z'
  }
];

// GET /api/contact/submissions/[id] - Get a specific submission
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const submission = submissions.find(sub => sub.id === params.id);
  
  if (!submission) {
    return NextResponse.json(
      { error: 'Submission not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(submission);
}

// DELETE /api/contact/submissions/[id] - Delete a submission
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const index = submissions.findIndex(sub => sub.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { error: 'Submission not found' },
      { status: 404 }
    );
  }
  
  // Remove the submission from the array
  submissions.splice(index, 1);
  
  return NextResponse.json({ success: true });
}