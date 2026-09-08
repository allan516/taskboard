import { createHttpError } from './httpError';

const API_URL = import.meta.env.VITE_API_URL;

export async function http<T>(
  path: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> {
  const url = `${API_URL}${path}`;

  try {
    const headers = new Headers(options?.headers);

    if (options?.body) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    });

    if (response.status === 401 && !isRetry && path !== '/auth/refresh') {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (refreshResponse.ok) {
        return http<T>(path, options, true);
      }
    }

    if (!response.ok) {
      throw createHttpError(response.status, 'Request failed');
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    console.error('HTTP ERROR:', {
      url,
      method: options?.method ?? 'GET',
      error,
    });

    throw error;
  }
}
