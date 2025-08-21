import { NextRequest, NextResponse } from 'next/server';
import { FAQItem } from '@/types/faq';

// Mock data for FAQs
let faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I order by dine in?',
    answer: 'To order by dine in, simply visit any of our restaurant locations. You\'ll be greeted by our staff who will seat you and provide a menu. You can place your order directly with our waitstaff, who will bring your food to your table when it\'s ready.',
    category: 'account',
    isPublished: true,
    sortOrder: 1,
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    question: 'How do I order by takeaway?',
    answer: 'For takeaway orders, you can either visit our restaurant and place your order at the counter, call us directly, or use our mobile app or website to place your order in advance. Once your order is ready, you can pick it up from our designated takeaway counter.',
    category: 'account',
    isPublished: true,
    sortOrder: 2,
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    question: 'QRIS Balance Refund',
    answer: 'For QRIS payment refunds, the refund process typically takes 7-14 business days to be processed and reflected in your account. The refund will be returned to the same QRIS-linked account that was used for the original payment. You will receive a notification once the refund has been processed.',
    category: 'refund',
    isPublished: true,
    sortOrder: 1,
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    question: 'What happens if my order is cancelled by the outlet?',
    answer: 'If your order is cancelled by the outlet, you will receive an immediate notification. Any payment that has been processed will be automatically refunded to your original payment method. The refund timing depends on your payment method (typically 3-14 business days). You can place a new order immediately if you wish.',
    category: 'order',
    isPublished: true,
    sortOrder: 1,
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    question: 'What payment methods can I use?',
    answer: 'We accept a variety of payment methods including: Credit/Debit Cards (Visa, Mastercard, American Express), E-wallets (Gopay, Dana, ShopeePay), QRIS, Bank Transfer, Cash (for in-store and COD orders).',
    category: 'payment',
    isPublished: true,
    sortOrder: 1,
    updatedAt: new Date().toISOString()
  }
];

// GET /api/faq - Get all FAQs or filter by category
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let filteredFaqs = [...faqItems];
  
  // Filter by category if provided
  if (category) {
    filteredFaqs = filteredFaqs.filter(faq => faq.category === category);
  }
  
  // Filter by search term if provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredFaqs = filteredFaqs.filter(faq => 
      faq.question.toLowerCase().includes(searchLower) || 
      faq.answer.toLowerCase().includes(searchLower)
    );
  }
  
  // Sort by sortOrder
  filteredFaqs.sort((a, b) => a.sortOrder - b.sortOrder);
  
  return NextResponse.json(filteredFaqs);
}

// POST /api/faq - Create a new FAQ item
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.question || !data.answer || !data.category) {
      return NextResponse.json(
        { error: 'Question, answer, and category are required' },
        { status: 400 }
      );
    }
    
    // Get the highest sortOrder for the category
    const categoryItems = faqItems.filter(item => item.category === data.category);
    const highestSortOrder = categoryItems.length > 0 
      ? Math.max(...categoryItems.map(item => item.sortOrder))
      : 0;
    
    // Create new FAQ item
    const newFaqItem: FAQItem = {
      id: Date.now().toString(),
      question: data.question,
      answer: data.answer,
      category: data.category,
      isPublished: data.isPublished ?? true,
      sortOrder: highestSortOrder + 1,
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock data
    faqItems.push(newFaqItem);
    
    return NextResponse.json(newFaqItem, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ item:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ item' },
      { status: 500 }
    );
  }
}

// PATCH /api/faq - Update FAQ items order in batch
export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected array of {id, sortOrder}' },
        { status: 400 }
      );
    }
    
    // Update sort orders
    for (const item of data) {
      const faqItem = faqItems.find(faq => faq.id === item.id);
      if (faqItem) {
        faqItem.sortOrder = item.sortOrder;
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating FAQ order:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ order' },
      { status: 500 }
    );
  }
}