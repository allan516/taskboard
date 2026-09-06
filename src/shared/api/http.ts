const API_URL = import.meta.env.VITE_API_URL;

export async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;

  console.log('HTTP:', url);

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  console.log('STATUS:', response.status);
  console.log('CONTENT-TYPE:', response.headers.get('content-type'));

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}
