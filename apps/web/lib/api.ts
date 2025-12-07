const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}

// Auth API
export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
  };
}

export const authApi = {
  signup: (username: string, password: string) =>
    api<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: { username, password },
    }),

  login: (username: string, password: string) =>
    api<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { username, password },
    }),
};

// Counter API
export interface Counter {
  id: string;
  name: string;
  count: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const counterApi = {
  getAll: (token: string) =>
    api<Counter[]>('/counters', { token }),

  getOne: (id: string, token: string) =>
    api<Counter>(`/counters/${id}`, { token }),

  create: (name: string, token: string) =>
    api<Counter>('/counters', {
      method: 'POST',
      body: { name },
      token,
    }),

  update: (id: string, name: string, token: string) =>
    api<Counter>(`/counters/${id}`, {
      method: 'PATCH',
      body: { name },
      token,
    }),

  increment: (id: string, token: string) =>
    api<Counter>(`/counters/${id}/increment`, {
      method: 'POST',
      token,
    }),

  delete: (id: string, token: string) =>
    api<{ message: string }>(`/counters/${id}`, {
      method: 'DELETE',
      token,
    }),
};

