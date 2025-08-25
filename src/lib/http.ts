// Minimal fetch wrapper that targets the external backend API
// - Uses NEXT_PUBLIC_API_URL
// - Parses JSON
// - Propagates errors with useful info
// - Sends auth token from cookie (client) or via provided headers (server)

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  // Force credentials when calling same-origin endpoints; not used for external API
  credentials?: RequestCredentials;
  // If true, returns raw Response instead of parsed JSON
  raw?: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';

function buildUrl(path: string, searchParams?: URLSearchParams | Record<string, string | number | boolean | undefined>) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${BASE_URL}${normalizedPath}`);
  if (searchParams) {
    if (searchParams instanceof URLSearchParams) {
      searchParams.forEach((v, k) => url.searchParams.set(k, v));
    } else {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
      });
    }
  }
  return url.toString();
}

function getClientAuthToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    return cookies['auth-token'];
  } catch {
    return undefined;
  }
}

export async function http<T = unknown>(path: string, options: HttpOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, credentials, raw } = options;

  const url = buildUrl(path);

  const finalHeaders: Record<string, string> = {
    'Accept': 'application/json',
    ...headers,
  };

  // Attach JSON content-type if sending a body and not already set
  const hasBody = body !== undefined && body !== null && method !== 'GET';
  let payload: BodyInit | undefined;
  if (hasBody) {
    if (typeof body === 'string' || body instanceof FormData || body instanceof Blob) {
      payload = body as BodyInit;
    } else {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      payload = JSON.stringify(body);
    }
  }

  // Attach auth token if available (client-side; server should pass via headers)
  const existingAuth = Object.keys(finalHeaders).find((k) => k.toLowerCase() === 'authorization');
  if (!existingAuth) {
    const token = getClientAuthToken();
    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      // For development, log that no auth token is available
      console.warn('No auth token found. API calls may fail if authentication is required.');
    }
  }

  const response = await fetch(url, {
    method,
    headers: finalHeaders,
    body: payload,
    credentials,
    next: { revalidate: 0 },
  });

  if (raw) return response as unknown as T;

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!response.ok) {
    let errorPayload: unknown = undefined;
    try {
      errorPayload = isJson ? await response.json() : await response.text();
    } catch {
      // ignore parse errors
    }
    const error = new Error(
      `HTTP ${response.status} ${response.statusText}`
    ) as Error & { status?: number; payload?: unknown };
    error.status = response.status;
    error.payload = errorPayload;
    throw error;
  }

  if (!isJson) {
    // @ts-expect-error generic cast for non-json consumers
    return (await response.text()) as T;
  }
  return (await response.json()) as T;
}

export const httpGet = <T = unknown>(path: string, headers?: Record<string, string>) =>
  http<T>(path, { method: 'GET', headers });

export const httpPost = <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
  http<T>(path, { method: 'POST', body, headers });

export const httpPatch = <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
  http<T>(path, { method: 'PATCH', body, headers });

export const httpDelete = <T = unknown>(path: string, headers?: Record<string, string>) =>
  http<T>(path, { method: 'DELETE', headers });

export const httpPut = <T = unknown>(path: string, body?: unknown, headers?: Record<string, string>) =>
  http<T>(path, { method: 'PUT', body, headers });

export const buildApiUrl = buildUrl;


