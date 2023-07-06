type Query = {};
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const pokefolder = {
  get: async <T>(endpoint: string | URL, query: Query): Promise<T | null> => {
    const url = new URL(endpoint, BASE_URL);

    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(`${key}`, value.toString());
      }
    });

    const response = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('failed to fetch');
    return response.json();
  },
};
