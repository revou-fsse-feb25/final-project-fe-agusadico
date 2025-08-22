import { httpGet, httpPost } from '@/lib/http';
import { OrderDetailType, OrderType } from '@/types/order';

export type CreateOrderPayload = {
  items: Array<{ productId: number; quantity: number }>;
  typeOrder: 'Dine In' | 'Take Away';
  bookedAtIso?: string; // optional booking
  note?: string;
  paymentMethod?: string;
};

export async function createOrder(payload: CreateOrderPayload) {
  return httpPost<OrderDetailType>('/api/orders', payload);
}

export async function getOrder(id: string) {
  return httpGet<OrderDetailType>(`/api/orders/${id}`);
}

export async function listOrders(params?: { status?: string; page?: number; pageSize?: number }) {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.page) query.set('page', String(params.page));
  if (params?.pageSize) query.set('pageSize', String(params.pageSize));
  const path = query.toString() ? `/api/orders?${query.toString()}` : '/api/orders';
  return httpGet<OrderType[]>(path);
}


