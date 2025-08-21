import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/',
  '/menu',
  '/about',
  '/contact',
];

// Define role-based access control
const roleBasedRoutes = {
  '/admin': ['admin'],
  '/account': ['customer', 'user'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // Skip middleware for order detail pages
  if (pathname.match(/\/admin\/order\/[\w-]+/)) {
    console.log('Skipping middleware for order detail page:', pathname);
    return NextResponse.next();
  }
  
  // Skip middleware for product detail pages
  if (pathname.match(/\/admin\/product\/[\w-]+/)) {
    console.log('SKIPPING MIDDLEWARE for product detail page:', pathname);
    return NextResponse.next();
  }

  // Skip middleware for customer detail pages
  if (pathname.match(/\/admin\/customer\/[\w-]+/)) {
    console.log('SKIPPING MIDDLEWARE for customer detail page:', pathname);
    return NextResponse.next();
  }
  
  // Skip middleware for about page admin route
  if (pathname === '/admin/about') {
    console.log('SKIPPING MIDDLEWARE for about page admin route:', pathname);
    return NextResponse.next();
  }
  
  // Skip middleware for FAQ admin route
  if (pathname === '/admin/faq') {
    console.log('SKIPPING MIDDLEWARE for FAQ admin route:', pathname);
    return NextResponse.next();
  }
  
  // Get session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'agusadico2025'
  });
  
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Check role-based access
  for (const [route, roles] of Object.entries(roleBasedRoutes)) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      if (!roles.includes(token.role as string)) {
        // Redirect based on role
        const redirectPath = token.role === 'admin' ? '/admin' : '/account';
        return NextResponse.redirect(new URL(redirectPath, request.url));
      }
    }
  }
  
  // If user is authenticated and trying to access login page, redirect to appropriate dashboard
  if (pathname === '/login') {
    const redirectPath = token.role === 'admin' ? '/admin' : '/account';
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*',
    '/account/:path*',
    '/admin/:path*',
  ],
};