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
  ListPromosQueryResponse,
  ListPromosQueryParams,
  ListPromos422,
} from '../../types/promosTypes/ListPromos';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const listPromosQueryKey = (params?: ListPromosQueryParams) =>
  [{ url: '/api/v1/promos/' }, ...(params ? [params] : [])] as const;

export type ListPromosQueryKey = ReturnType<typeof listPromosQueryKey>;

/**
 * @description List all promos (admin only).
 * @summary List Promos
 * {@link /api/v1/promos/}
 */
export async function listPromos(
  params?: ListPromosQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListPromosQueryResponse,
    ResponseErrorConfig<ListPromos422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/promos/`,
    baseURL: 'http://localhost:8000',
    params,
    ...requestConfig,
  });
  return res.data;
}

export function listPromosQueryOptions(
  params?: ListPromosQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listPromosQueryKey(params);
  return queryOptions<
    ListPromosQueryResponse,
    ResponseErrorConfig<ListPromos422>,
    ListPromosQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listPromos(params, config);
    },
  });
}

/**
 * @description List all promos (admin only).
 * @summary List Promos
 * {@link /api/v1/promos/}
 */
export function useListPromos<
  TData = ListPromosQueryResponse,
  TQueryData = ListPromosQueryResponse,
  TQueryKey extends QueryKey = ListPromosQueryKey,
>(
  params?: ListPromosQueryParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ListPromosQueryResponse,
        ResponseErrorConfig<ListPromos422>,
        TData,
        TQueryData,
        TQueryKey
      >
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const {
    query: { client: queryClient, ...queryOptions } = {},
    client: config = {},
  } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? listPromosQueryKey(params);

  const query = useQuery(
    {
      ...(listPromosQueryOptions(
        params,
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<ListPromos422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
