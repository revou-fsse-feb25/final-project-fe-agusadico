export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'account' | 'refund' | 'order' | 'payment';
  isPublished: boolean;
  sortOrder: number;
  updatedAt: string; // ISO date string
}