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
import type { RootQueryResponse } from '../../types/undefinedTypes/Root';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const rootSuspenseQueryKey = () => [{ url: '/' }] as const;

export type RootSuspenseQueryKey = ReturnType<typeof rootSuspenseQueryKey>;

/**
 * @description Root endpoint.
 * @summary Root
 * {@link /}
 */
export async function rootSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    RootQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function rootSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = rootSuspenseQueryKey();
  return queryOptions<
    RootQueryResponse,
    ResponseErrorConfig<Error>,
    RootQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return rootSuspense(config);
    },
  });
}

/**
 * @description Root endpoint.
 * @summary Root
 * {@link /}
 */
export function useRootSuspense<
  TData = RootQueryResponse,
  TQueryKey extends QueryKey = RootSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        RootQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? rootSuspenseQueryKey();

  const query = useSuspenseQuery(
    {
      ...(rootSuspenseQueryOptions(
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
