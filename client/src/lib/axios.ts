import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const cookies = document.cookie.split(';');
      let cookieValue: string | null = null;
      for (const cookie of cookies) {
        const [key, ...rest] = cookie.split('=');
        if (key.trim() === 'auth-storage') {
          cookieValue = rest.join('=');
          break;
        }
      }
      if (cookieValue) {
        const stored = JSON.parse(decodeURIComponent(cookieValue));
        if (stored?.state?.token) {
          config.headers.Authorization = `Bearer ${stored.state.token}`;
        }
      }
    } catch {
      // malformed cookie — skip auth header
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        document.cookie = 'auth-storage=; path=/; max-age=0';
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
