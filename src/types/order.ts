export type OrderType = {
  id: string;
  orderId: string;
  date: string;
  createdAt?: string; // ISO date string
  bookedAtIso?: string; // ISO date string
  customerName: string;
  typeOrder: 'Dine In' | 'Take Away';
  amount: number;
  status: 'PENDING' | 'DELIVERED' | 'CANCELED';
};

export type OrderItemType = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category?: string;
};

export type OrderDetailType = OrderType & {
  items: OrderItemType[];
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    image?: string;
  };
  billing: {
    name: string;
    address: string;
    postalCode: string;
  };
  shipping: {
    name: string;
    address: string;
    postalCode: string;
  };
  note?: string;
};