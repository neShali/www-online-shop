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
import type { ListCategoryTreeQueryResponse } from '../../types/categoriesTypes/ListCategoryTree';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const listCategoryTreeQueryKey = () =>
  ['v5', { url: '/api/v1/categories/tree' }] as const;

export type ListCategoryTreeQueryKey = ReturnType<
  typeof listCategoryTreeQueryKey
>;

/**
 * @description Retrieve category tree structure (root categories with children).
 * @summary List Category Tree
 * {@link /api/v1/categories/tree}
 */
export async function listCategoryTree(
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
    ...requestConfig,
  });
  return res.data;
}

export function listCategoryTreeQueryOptions(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listCategoryTreeQueryKey();
  return queryOptions<
    ListCategoryTreeQueryResponse,
    ResponseErrorConfig<Error>,
    ListCategoryTreeQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listCategoryTree(config);
    },
  });
}

/**
 * @description Retrieve category tree structure (root categories with children).
 * @summary List Category Tree
 * {@link /api/v1/categories/tree}
 */
export function useListCategoryTree<
  TData = ListCategoryTreeQueryResponse,
  TQueryData = ListCategoryTreeQueryResponse,
  TQueryKey extends QueryKey = ListCategoryTreeQueryKey,
>(
  options: {
    query?: Partial<
      QueryObserverOptions<
        ListCategoryTreeQueryResponse,
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
  const queryKey = queryOptions?.queryKey ?? listCategoryTreeQueryKey();

  const query = useQuery(
    {
      ...(listCategoryTreeQueryOptions(
        config
      ) as unknown as QueryObserverOptions),
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
