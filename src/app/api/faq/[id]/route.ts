import { NextRequest, NextResponse } from 'next/server';
import { FAQItem } from '@/types/faq';

// Reference to the mock data from the main route
// In a real application, this would be a database query
declare const faqItems: FAQItem[];

// GET /api/faq/[id] - Get a specific FAQ item
export async function GET(request: NextRequest) {
  // Extract ID from URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.length - 1];
  
  const faqItem = faqItems.find(item => item.id === id);
  
  if (!faqItem) {
    return NextResponse.json(
      { error: 'FAQ item not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(faqItem);
}

// PATCH /api/faq/[id] - Update a specific FAQ item
export async function PATCH(request: NextRequest) {
  try {
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    const data = await request.json();
    
    const faqItemIndex = faqItems.findIndex(item => item.id === id);
    
    if (faqItemIndex === -1) {
      return NextResponse.json(
        { error: 'FAQ item not found' },
        { status: 404 }
      );
    }
    
    // Update the FAQ item
    const updatedFaqItem = {
      ...faqItems[faqItemIndex],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    faqItems[faqItemIndex] = updatedFaqItem;
    
    return NextResponse.json(updatedFaqItem);
  } catch (error) {
    console.error('Error updating FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ item' },
      { status: 500 }
    );
  }
}

// DELETE /api/faq/[id] - Delete a specific FAQ item
export async function DELETE(request: NextRequest) {
  try {
    // Extract ID from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    const faqItemIndex = faqItems.findIndex(item => item.id === id);
    
    if (faqItemIndex === -1) {
      return NextResponse.json(
        { error: 'FAQ item not found' },
        { status: 404 }
      );
    }
    
    // Remove the FAQ item
    faqItems.splice(faqItemIndex, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ item' },
      { status: 500 }
    );
  }
}