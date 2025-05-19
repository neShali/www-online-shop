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
  GetCategoryQueryResponse,
  GetCategoryPathParams,
  GetCategory422,
} from '../../types/categoriesTypes/GetCategory';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCategoryQueryKey = ({
  category_id,
}: {
  category_id: GetCategoryPathParams['category_id'];
}) =>
  [
    {
      url: '/api/v1/categories/:category_id',
      params: { category_id: category_id },
    },
  ] as const;

export type GetCategoryQueryKey = ReturnType<typeof getCategoryQueryKey>;

/**
 * @description Get category by ID.
 * @summary Get Category
 * {@link /api/v1/categories/:category_id}
 */
export async function getCategory(
  { category_id }: { category_id: GetCategoryPathParams['category_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetCategoryQueryResponse,
    ResponseErrorConfig<GetCategory422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/categories/${category_id}`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function getCategoryQueryOptions(
  { category_id }: { category_id: GetCategoryPathParams['category_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getCategoryQueryKey({ category_id });
  return queryOptions<
    GetCategoryQueryResponse,
    ResponseErrorConfig<GetCategory422>,
    GetCategoryQueryResponse,
    typeof queryKey
  >({
    enabled: !!category_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getCategory({ category_id }, config);
    },
  });
}

/**
 * @description Get category by ID.
 * @summary Get Category
 * {@link /api/v1/categories/:category_id}
 */
export function useGetCategory<
  TData = GetCategoryQueryResponse,
  TQueryData = GetCategoryQueryResponse,
  TQueryKey extends QueryKey = GetCategoryQueryKey,
>(
  { category_id }: { category_id: GetCategoryPathParams['category_id'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetCategoryQueryResponse,
        ResponseErrorConfig<GetCategory422>,
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
  const queryKey =
    queryOptions?.queryKey ?? getCategoryQueryKey({ category_id });

  const query = useQuery(
    {
      ...(getCategoryQueryOptions(
        { category_id },
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<GetCategory422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
