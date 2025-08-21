import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Use NEXTAUTH_SECRET for consistency with NextAuth
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'agusadico2025';

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

export function signJwtToken(payload: UserData): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyJwtToken(token: string): UserData | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserData;
  } catch (error) {
    return null;
  }
}

// This function should only be used in Server Components or API routes
export async function getJwtFromCookies(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

// This function is for middleware and can be used in both client and server contexts
export function getJwtFromRequest(request: NextRequest): string | undefined {
  return request.cookies.get('auth-token')?.value;
}

// Mock user database - in a real app, this would be a database
const USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Agus Revou',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer' as const, // Make sure this matches what middleware expects
  },
];

export function findUserByCredentials(email: string, password: string) {
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return null;
  
  // Don't include password in the returned user object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function findUserById(id: string) {
  const user = USERS.find(u => u.id === id);
  if (!user) return null;
  
  // Don't include password in the returned user object
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}