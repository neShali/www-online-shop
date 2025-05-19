import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type {
  QueryKey,
  QueryClient,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import type { ListActivePromosQueryResponse } from '../../types/promosTypes/ListActivePromos';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const listActivePromosSuspenseQueryKey = () =>
  [{ url: '/api/v1/promos/active' }] as const;

export type ListActivePromosSuspenseQueryKey = ReturnType<
  typeof listActivePromosSuspenseQueryKey
>;

/**
 * @description List all currently active promos (public).
 * @summary List Active Promos
 * {@link /api/v1/promos/active}
 */
export async function listActivePromosSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListActivePromosQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/promos/active`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function listActivePromosSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listActivePromosSuspenseQueryKey();
  return queryOptions<
    ListActivePromosQueryResponse,
    ResponseErrorConfig<Error>,
    ListActivePromosQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listActivePromosSuspense(config);
    },
  });
}

/**
 * @description List all currently active promos (public).
 * @summary List Active Promos
 * {@link /api/v1/promos/active}
 */
export function useListActivePromosSuspense<
  TData = ListActivePromosQueryResponse,
  TQueryKey extends QueryKey = ListActivePromosSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ListActivePromosQueryResponse,
        ResponseErrorConfig<Error>,
        TData,
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
  const queryKey = queryOptions?.queryKey ?? listActivePromosSuspenseQueryKey();

  const query = useSuspenseQuery(
    {
      ...(listActivePromosSuspenseQueryOptions(
        config
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
