import { httpGet } from '@/lib/http';
import { FAQItem } from '@/types/faq';

export async function listFAQ(params?: { category?: 'account' | 'refund' | 'order' | 'payment'; search?: string }) {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  
  // Fix the API endpoint path to match the backend route
  const path = query.toString() ? `/faqs?${query.toString()}` : '/faqs';
  
  try {
    return await httpGet<FAQItem[]>(path);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    // Return empty array instead of throwing to prevent component crashes
    return [];
  }
}


