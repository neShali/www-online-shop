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
  ListCategoriesQueryResponse,
  ListCategoriesQueryParams,
  ListCategories422,
} from '../../types/categoriesTypes/ListCategories';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const listCategoriesQueryKey = (params?: ListCategoriesQueryParams) =>
  ['v5', { url: '/api/v1/categories/' }, ...(params ? [params] : [])] as const;

export type ListCategoriesQueryKey = ReturnType<typeof listCategoriesQueryKey>;

/**
 * @description Retrieve all categories.
 * @summary List Categories
 * {@link /api/v1/categories/}
 */
export async function listCategories(
  params?: ListCategoriesQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListCategoriesQueryResponse,
    ResponseErrorConfig<ListCategories422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/categories/`,
    params,
    ...requestConfig,
  });
  return res.data;
}

export function listCategoriesQueryOptions(
  params?: ListCategoriesQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listCategoriesQueryKey(params);
  return queryOptions<
    ListCategoriesQueryResponse,
    ResponseErrorConfig<ListCategories422>,
    ListCategoriesQueryResponse,
    typeof queryKey
  >({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listCategories(params, config);
    },
  });
}

/**
 * @description Retrieve all categories.
 * @summary List Categories
 * {@link /api/v1/categories/}
 */
export function useListCategories<
  TData = ListCategoriesQueryResponse,
  TQueryData = ListCategoriesQueryResponse,
  TQueryKey extends QueryKey = ListCategoriesQueryKey,
>(
  params?: ListCategoriesQueryParams,
  options: {
    query?: Partial<
      QueryObserverOptions<
        ListCategoriesQueryResponse,
        ResponseErrorConfig<ListCategories422>,
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
  const queryKey = queryOptions?.queryKey ?? listCategoriesQueryKey(params);

  const query = useQuery(
    {
      ...(listCategoriesQueryOptions(
        params,
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<ListCategories422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
