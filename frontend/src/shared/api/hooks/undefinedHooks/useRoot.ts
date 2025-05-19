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
import type { RootQueryResponse } from '../../types/undefinedTypes/Root';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const rootQueryKey = () => [{ url: '/' }] as const;

export type RootQueryKey = ReturnType<typeof rootQueryKey>;

/**
 * @description Root endpoint.
 * @summary Root
 * {@link /}
 */
export async function root(
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

export function rootQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = rootQueryKey();
  return queryOptions<
    RootQueryResponse,
    ResponseErrorConfig<Error>,
    RootQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return root(config);
    },
  });
}

/**
 * @description Root endpoint.
 * @summary Root
 * {@link /}
 */
export function useRoot<
  TData = RootQueryResponse,
  TQueryData = RootQueryResponse,
  TQueryKey extends QueryKey = RootQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        RootQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? rootQueryKey();

  const query = useQuery(
    {
      ...(rootQueryOptions(config) as unknown as QueryObserverOptions),
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
