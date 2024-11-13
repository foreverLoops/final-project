const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('supabase.auth.token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

export const api = {
  products: {
    getAll: () => fetchWithAuth('/products'),
    getOne: (id: string) => fetchWithAuth(`/products/${id}`),
    create: (data: any) => fetchWithAuth('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => fetchWithAuth(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => fetchWithAuth(`/products/${id}`, {
      method: 'DELETE',
    }),
  },
  orders: {
    getAll: () => fetchWithAuth('/orders'),
    getOne: (id: string) => fetchWithAuth(`/orders/${id}`),
    create: (data: any) => fetchWithAuth('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
};