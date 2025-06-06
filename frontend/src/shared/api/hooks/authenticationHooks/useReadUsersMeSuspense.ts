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
import type { ReadUsersMeQueryResponse } from '../../types/authenticationTypes/ReadUsersMe';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const readUsersMeSuspenseQueryKey = () =>
  [{ url: '/api/v1/auth/me' }] as const;

export type ReadUsersMeSuspenseQueryKey = ReturnType<
  typeof readUsersMeSuspenseQueryKey
>;

/**
 * @description Get current user.
 * @summary Read Users Me
 * {@link /api/v1/auth/me}
 */
export async function readUsersMeSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ReadUsersMeQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/auth/me`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function readUsersMeSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = readUsersMeSuspenseQueryKey();
  return queryOptions<
    ReadUsersMeQueryResponse,
    ResponseErrorConfig<Error>,
    ReadUsersMeQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return readUsersMeSuspense(config);
    },
  });
}

/**
 * @description Get current user.
 * @summary Read Users Me
 * {@link /api/v1/auth/me}
 */
export function useReadUsersMeSuspense<
  TData = ReadUsersMeQueryResponse,
  TQueryKey extends QueryKey = ReadUsersMeSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ReadUsersMeQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? readUsersMeSuspenseQueryKey();

  const query = useSuspenseQuery(
    {
      ...(readUsersMeSuspenseQueryOptions(
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
