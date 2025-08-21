import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByCredentials } from '@/lib/auth';

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      // Use your existing function to find user by credentials
      const user = findUserByCredentials(credentials.email, credentials.password);
      
      if (!user) {
        return null;
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  })],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to token when user signs in
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add role to session from token
      if (session.user) {
        session.user.role = token.role as 'admin' | 'customer';
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Explicitly use NEXTAUTH_SECRET from environment variables
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };