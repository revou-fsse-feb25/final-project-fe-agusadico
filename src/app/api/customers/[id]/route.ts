import { NextRequest, NextResponse } from 'next/server';
import { CustomerType } from '../../../../types/customer';

// Mock customers data for development
const MOCK_CUSTOMERS: { [key: string]: CustomerType & {
  username: string;
  birthday?: string;
  city?: string;
  address?: string;
} } = {
  '1': {
    id: '1',
    customerId: '#5552351',
    name: 'James Whiteley',
    email: 'james.whiteley@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: 'Corner Street 5th London',
    totalSpent: 194.82,
    lastOrder: {
      amount: 14.85,
      date: '2023-10-15'
    },
    username: 'jamesw',
    birthday: '1985-04-12',
    city: 'London',
    address: '42 Corner Street, 5th District'
  },
  '2': {
    id: '2',
    customerId: '#5552323',
    name: 'Veronica',
    email: 'veronica@example.com',
    joinDate: '26 March 2020, 12:42 AM',
    location: '21 King Street London',
    totalSpent: 74.92,
    lastOrder: {
      amount: 9.13,
      date: '2023-10-12'
    },
    username: 'veronicak',
    city: 'London',
    address: '21 King Street, Chelsea'
  },
  // Add more mock customers as needed
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = params.id;
    
    // In a real app, you would fetch from a database
    // For now, use mock data
    const customer = MOCK_CUSTOMERS[customerId];
    
    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const customerId = params.id;
    const data = await request.json();
    
    // In a real app, you would update in a database
    // For now, just log the data and return success
    console.log('Updating customer:', customerId, data);
    
    // Check if customer exists
    if (!MOCK_CUSTOMERS[customerId]) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }
    
    // In a real app, you would validate and sanitize the data
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Customer updated successfully'
    });
  } catch (error) {
    console.error('Error updating customer:', error);
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    );
  }
}