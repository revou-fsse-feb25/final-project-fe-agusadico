import { UserData } from '../auth';

// Client-side function to get JWT from cookies
export function getClientToken(): string | null {
  // Parse cookies from document.cookie
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  console.log('Client-side cookies (full):', document.cookie);
  console.log('Parsed cookies:', cookies);
  console.log('Found auth-token:', cookies['auth-token'] ? `${cookies['auth-token'].substring(0, 10)}...` : 'no');
  
  return cookies['auth-token'] || null;
}

// Parse JWT token (client-side only)
export function parseJwt(token: string): UserData | null {
  try {
    // Split the token and get the payload part
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );

    const userData = JSON.parse(jsonPayload);
    console.log('Parsed JWT payload:', userData);
    return userData;
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

// Get current user from client-side
export function getCurrentUser(): UserData | null {
  const token = getClientToken();
  if (!token) return null;
  
  return parseJwt(token);
}

// Add this debug function
export function debugAuthToken() {
  const token = getClientToken();
  console.log('Debug auth token:', token ? 'Token exists' : 'No token');
  if (token) {
    const userData = parseJwt(token);
    console.log('Parsed user data:', userData);
    console.log('Token expiration:', userData ? new Date((userData as any).exp * 1000).toISOString() : 'Unknown');
  }
}