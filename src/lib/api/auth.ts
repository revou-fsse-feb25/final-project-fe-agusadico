import { httpPost } from '@/lib/http';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  birthday: string; // ISO format (YYYY-MM-DD)
};

export type RegisterResult = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  city: string;
  birthday: string; // ISO format (YYYY-MM-DD)
};

export async function register(payload: RegisterInput): Promise<RegisterResult> {
  return httpPost<RegisterResult>('/auth/register', payload);
}


