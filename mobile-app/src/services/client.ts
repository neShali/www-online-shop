import axios, {
  type AxiosRequestConfig,
  type AxiosRequestTransformer,
  type AxiosResponse,
  AxiosError,
} from 'axios';

interface IClient {
  <TData = unknown, TReq = unknown>(
    config: AxiosRequestConfig<TReq>
  ): Promise<{ data: TData }>;
  request<TData = unknown, TReq = unknown>(
    config: AxiosRequestConfig<TReq>
  ): Promise<{ data: TData }>;
}

export type RequestConfig<TData = unknown> = AxiosRequestConfig<TData>;
export type ResponseErrorConfig<TError = unknown> = AxiosError<TError>;

import { Preferences } from '@capacitor/preferences';

// Функции для работы с токенами в мобильном приложении
export const getToken = async (): Promise<string | null> => {
  try {
    const result = await Preferences.get({ key: 'access_token' });
    return result.value;
  } catch {
    return null;
  }
};

export const saveToken = async (token: string): Promise<void> => {
  await Preferences.set({ key: 'access_token', value: token });
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const result = await Preferences.get({ key: 'refresh_token' });
    return result.value;
  } catch {
    return null;
  }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
  await Preferences.set({ key: 'refresh_token', value: token });
};

export const clearToken = async (): Promise<void> => {
  await Preferences.remove({ key: 'access_token' });
  await Preferences.remove({ key: 'refresh_token' });
};

const defaultTransforms = axios.defaults
  .transformRequest as AxiosRequestTransformer[];

const raw = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  transformRequest: [
    (data, headers) => {
      const ct =
        (headers as Record<string, string>)['Content-Type'] ||
        (headers as Record<string, string>)['content-type'];

      if (ct && (ct as string).includes('application/x-www-form-urlencoded')) {
        return new URLSearchParams(data).toString();
      }

      return data;
    },
    ...defaultTransforms,
  ],
});

raw.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

raw.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error as { response: unknown; config: AxiosRequestConfig };

    const currentToken = await getToken();
    if (!currentToken) {
      return Promise.reject(error);
    }

    if (
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/refresh-token')
    ) {
      return Promise.reject(error);
    }

    if (response?.status === 401 && !config._retry) {
      config._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Backend refresh token endpoint doesn't require refresh token in body
          const { data } = await raw.post<{ access_token: string; token_type: string }>(
            '/auth/refresh-token'
          );
          
          await saveToken(data.access_token);
          pendingRequests.forEach((cb) => cb());
        } catch (e) {
          await clearToken();
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
          pendingRequests = [];
        }
      }

      return new Promise((resolve, reject) => {
        pendingRequests.push(() => {
          raw(config).then(resolve).catch(reject);
        });
      });
    }

    return Promise.reject(error);
  }
);

const client: IClient = async <
  TData = unknown,
  TReq = unknown,
>(
  config: AxiosRequestConfig<TReq>
) => {
  const response = await raw.request<TData, AxiosResponse<TData>, TReq>(config);
  return {
    data: response.data,
  };
};
client.request = client;

export default client;