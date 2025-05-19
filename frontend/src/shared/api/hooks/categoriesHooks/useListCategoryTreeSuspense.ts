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
import type { ListCategoryTreeQueryResponse } from '../../types/categoriesTypes/ListCategoryTree';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const listCategoryTreeSuspenseQueryKey = () =>
  [{ url: '/api/v1/categories/tree' }] as const;

export type ListCategoryTreeSuspenseQueryKey = ReturnType<
  typeof listCategoryTreeSuspenseQueryKey
>;

/**
 * @description Retrieve category tree structure (root categories with children).
 * @summary List Category Tree
 * {@link /api/v1/categories/tree}
 */
export async function listCategoryTreeSuspense(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListCategoryTreeQueryResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/categories/tree`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function listCategoryTreeSuspenseQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listCategoryTreeSuspenseQueryKey();
  return queryOptions<
    ListCategoryTreeQueryResponse,
    ResponseErrorConfig<Error>,
    ListCategoryTreeQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listCategoryTreeSuspense(config);
    },
  });
}

/**
 * @description Retrieve category tree structure (root categories with children).
 * @summary List Category Tree
 * {@link /api/v1/categories/tree}
 */
export function useListCategoryTreeSuspense<
  TData = ListCategoryTreeQueryResponse,
  TQueryKey extends QueryKey = ListCategoryTreeSuspenseQueryKey,
>(
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ListCategoryTreeQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? listCategoryTreeSuspenseQueryKey();

  const query = useSuspenseQuery(
    {
      ...(listCategoryTreeSuspenseQueryOptions(
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
