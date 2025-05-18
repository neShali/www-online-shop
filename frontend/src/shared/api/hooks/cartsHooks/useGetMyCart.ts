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
import type { GetMyCartQueryResponse } from '../../types/cartsTypes/GetMyCart';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getMyCartQueryKey = () =>
  ['v5', { url: '/api/v1/carts/me' }] as const;

export type GetMyCartQueryKey = ReturnType<typeof getMyCartQueryKey>;

/**
 * @description Get current user's active cart.
 * @summary Get My Cart
 * {@link /api/v1/carts/me}
 */
export async function getMyCart(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetMyCartQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({ method: 'GET', url: `/api/v1/carts/me`, ...requestConfig });
  return res.data;
}

export function getMyCartQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getMyCartQueryKey();
  return queryOptions<
    GetMyCartQueryResponse,
    ResponseErrorConfig<Error>,
    GetMyCartQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getMyCart(config);
    },
  });
}

/**
 * @description Get current user's active cart.
 * @summary Get My Cart
 * {@link /api/v1/carts/me}
 */
export function useGetMyCart<
  TData = GetMyCartQueryResponse,
  TQueryData = GetMyCartQueryResponse,
  TQueryKey extends QueryKey = GetMyCartQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetMyCartQueryResponse,
        ResponseErrorConfig<Error>,
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
  const queryKey = queryOptions?.queryKey ?? getMyCartQueryKey();

  const query = useQuery(
    {
      ...(getMyCartQueryOptions(config) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
