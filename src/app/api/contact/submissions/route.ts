import { NextRequest, NextResponse } from 'next/server';
import { ContactSubmission } from '@/types/contact';

// Mock data for contact submissions
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

// GET /api/contact/submissions - Get all submissions with pagination and filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const topic = searchParams.get('topic');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const search = searchParams.get('search');
  
  let filteredSubmissions = [...submissions];
  
  // Apply filters if provided
  if (topic) {
    filteredSubmissions = filteredSubmissions.filter(sub => sub.topic === topic);
  }
  
  if (startDate) {
    filteredSubmissions = filteredSubmissions.filter(
      sub => new Date(sub.submittedAt) >= new Date(startDate)
    );
  }
  
  if (endDate) {
    filteredSubmissions = filteredSubmissions.filter(
      sub => new Date(sub.submittedAt) <= new Date(endDate)
    );
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredSubmissions = filteredSubmissions.filter(
      sub => sub.name.toLowerCase().includes(searchLower) ||
             sub.email.toLowerCase().includes(searchLower) ||
             sub.message.toLowerCase().includes(searchLower)
    );
  }
  
  // Sort by submission date (newest first)
  filteredSubmissions.sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
  
  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);
  
  return NextResponse.json({
    submissions: paginatedSubmissions,
    total: filteredSubmissions.length,
    page,
    limit,
    totalPages: Math.ceil(filteredSubmissions.length / limit)
  });
}

// POST /api/contact/submissions - Create a new submission
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const newSubmission: ContactSubmission = {
      id: (submissions.length + 1).toString(),
      ...data,
      submittedAt: new Date().toISOString()
    };
    
    submissions.unshift(newSubmission);
    
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}