export type CustomerType = {
  id: string;
  customerId: string;
  name: string;
  email: string;
  joinDate: string;
  location: string;
  totalSpent: number;
  lastOrder: {
    amount: number;
    date: string;
  };
};