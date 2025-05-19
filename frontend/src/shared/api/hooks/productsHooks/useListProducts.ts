import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type {
  QueryKey,
  QueryClient,
  QueryObserverOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type {
  ListProductsQueryResponse,
  ListProductsQueryParams,
  ListProducts422,
} from '../../types/productsTypes/ListProducts';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const listProductsQueryKey = (params?: ListProductsQueryParams) =>
  [{ url: '/api/v1/products/' }, ...(params ? [params] : [])] as const;

export type ListProductsQueryKey = ReturnType<typeof listProductsQueryKey>;

/**
 * @description Retrieve products with filtering and pagination.
 * @summary List Products
 * {@link /api/v1/products/}
 */
export async function listProducts(
  params?: ListProductsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListProductsQueryResponse,
    ResponseErrorConfig<ListProducts422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/products/`,
    baseURL: 'http://localhost:8000',
    params,
    ...requestConfig,
  });
  return res.data;
}

export function listProductsQueryOptions(
  params?: ListProductsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listProductsQueryKey(params);
  return queryOptions<
    ListProductsQueryResponse,
    ResponseErrorConfig<ListProducts422>,
    ListProductsQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listProducts(params, config);
    },
  });
}

/**
 * @description Retrieve products with filtering and pagination.
 * @summary List Products
 * {@link /api/v1/products/}
 */
export function useListProducts<
  TData = ListProductsQueryResponse,
  TQueryData = ListProductsQueryResponse,
  TQueryKey extends QueryKey = ListProductsQueryKey,
>(
  params?: ListProductsQueryParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ListProductsQueryResponse,
        ResponseErrorConfig<ListProducts422>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const {
    query: { client: queryClient, ...queryOptions } = {},
    client: config = {},
  } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? listProductsQueryKey(params);

  const query = useQuery(
    {
      ...(listProductsQueryOptions(
        params,
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<ListProducts422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
