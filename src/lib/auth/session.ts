import { getServerSession as getNextAuthServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
};

// For server components only
export async function getServerSession() {
  const session = await getNextAuthServerSession(authOptions);
  return { user: session?.user as SessionUser | null };
}

// Helper to check if user has a specific role
export function hasRole(user: SessionUser | null, role: string | string[]): boolean {
  if (!user) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
}

// Helper to get user role
export async function getUserRole(): Promise<string | null> {
  const { user } = await getServerSession();
  return user?.role || null;
}