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
import type {
  GetCategoryQueryResponse,
  GetCategoryPathParams,
  GetCategory422,
} from '../../types/categoriesTypes/GetCategory';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getCategorySuspenseQueryKey = ({
  category_id,
}: {
  category_id: GetCategoryPathParams['category_id'];
}) =>
  [
    'v5',
    {
      url: '/api/v1/categories/:category_id',
      params: { category_id: category_id },
    },
  ] as const;

export type GetCategorySuspenseQueryKey = ReturnType<
  typeof getCategorySuspenseQueryKey
>;

/**
 * @description Get category by ID.
 * @summary Get Category
 * {@link /api/v1/categories/:category_id}
 */
export async function getCategorySuspense(
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
    ...requestConfig,
  });
  return res.data;
}

export function getCategorySuspenseQueryOptions(
  { category_id }: { category_id: GetCategoryPathParams['category_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getCategorySuspenseQueryKey({ category_id });
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
      return getCategorySuspense({ category_id }, config);
    },
  });
}

/**
 * @description Get category by ID.
 * @summary Get Category
 * {@link /api/v1/categories/:category_id}
 */
export function useGetCategorySuspense<
  TData = GetCategoryQueryResponse,
  TQueryKey extends QueryKey = GetCategorySuspenseQueryKey,
>(
  { category_id }: { category_id: GetCategoryPathParams['category_id'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetCategoryQueryResponse,
        ResponseErrorConfig<GetCategory422>,
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
  const queryKey =
    queryOptions?.queryKey ?? getCategorySuspenseQueryKey({ category_id });

  const query = useSuspenseQuery(
    {
      ...(getCategorySuspenseQueryOptions(
        { category_id },
        config
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetCategory422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
