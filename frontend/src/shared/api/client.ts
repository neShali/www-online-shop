import axios from 'axios';
import { getToken, saveToken, clearToken } from './auth';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error;
    if (response?.status === 401 && !config._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await client.post('/api/v1/auth/refresh-token');
          saveToken(data.access_token);
          pendingRequests.forEach((cb) => cb());
        } catch {
          clearToken();
          // сюда можно редиректить на /login
        } finally {
          isRefreshing = false;
          pendingRequests = [];
        }
      }

      return new Promise((resolve) => {
        pendingRequests.push(() => {
          config._retry = true;
          resolve(client(config));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default client;
