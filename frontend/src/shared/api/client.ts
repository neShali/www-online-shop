/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, {
  type AxiosRequestConfig,
  type AxiosRequestTransformer,
  type AxiosResponse,
  AxiosError,
} from 'axios';
import { clearToken, getToken, saveToken } from './auth';

interface IClient {
  <TData = unknown, _TError = unknown, TReq = unknown>(
    config: AxiosRequestConfig<TReq>
  ): Promise<{ data: TData }>;
  request<TData = unknown, _TError = unknown, TReq = unknown>(
    config: AxiosRequestConfig<TReq>
  ): Promise<{ data: TData }>;
}

export type RequestConfig<TData = unknown> = AxiosRequestConfig<TData>;
export type ResponseErrorConfig<TError = unknown> = AxiosError<TError>;

const defaultTransforms = axios.defaults
  .transformRequest as AxiosRequestTransformer[];

const raw = axios.create({
  baseURL: 'http://localhost:8000',
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

raw.interceptors.request.use((config) => {
  const token = getToken();
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
    const { response, config } = error as { response: any; config: any };

    if (
      config.url?.includes('/api/v1/auth/login') ||
      config.url?.includes('/api/v1/auth/register') ||
      config.url?.includes('/api/v1/auth/refresh-token')
    ) {
      return Promise.reject(error);
    }

    if (response?.status === 401 && !config._retry) {
      config._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await raw.post<{ access_token: string }>(
            '/api/v1/auth/refresh-token'
          );
          saveToken(data.access_token);
          pendingRequests.forEach((cb) => cb());
        } catch (e) {
          clearToken();
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
  _TError = unknown,
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
