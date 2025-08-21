import { NextRequest, NextResponse } from 'next/server';
import { ContactInfo } from '@/types/contact';

// Mock data for contact information
let contactInfo: ContactInfo = {
  id: '1',
  phone: '+62-21-3858171',
  whatsapp: '0853 1111 1010',
  email: 'pengaduan.konsumen@kemendag.go.id',
  address: 'Building I, 3rd Floor, Jl. M.I Ridwan Rais No.5, Jakarta',
  complaintService: '14045'
};

// GET /api/contact - Get contact information
export async function GET() {
  return NextResponse.json(contactInfo);
}

// PUT /api/contact - Update contact information
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Update contact info with new data
    contactInfo = {
      ...contactInfo,
      ...data
    };
    
    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact information' },
      { status: 500 }
    );
  }
}