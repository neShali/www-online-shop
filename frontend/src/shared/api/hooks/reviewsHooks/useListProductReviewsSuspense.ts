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
  ListProductReviewsQueryResponse,
  ListProductReviewsPathParams,
  ListProductReviewsQueryParams,
  ListProductReviews422,
} from '../../types/reviewsTypes/ListProductReviews';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const listProductReviewsSuspenseQueryKey = (
  { product_id }: { product_id: ListProductReviewsPathParams['product_id'] },
  params?: ListProductReviewsQueryParams
) =>
  [
    {
      url: '/api/v1/reviews/product/:product_id',
      params: { product_id: product_id },
    },
    ...(params ? [params] : []),
  ] as const;

export type ListProductReviewsSuspenseQueryKey = ReturnType<
  typeof listProductReviewsSuspenseQueryKey
>;

/**
 * @description Retrieve reviews for a product.
 * @summary List Product Reviews
 * {@link /api/v1/reviews/product/:product_id}
 */
export async function listProductReviewsSuspense(
  { product_id }: { product_id: ListProductReviewsPathParams['product_id'] },
  params?: ListProductReviewsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ListProductReviewsQueryResponse,
    ResponseErrorConfig<ListProductReviews422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/reviews/product/${product_id}`,
    baseURL: 'http://localhost:8000',
    params,
    ...requestConfig,
  });
  return res.data;
}

export function listProductReviewsSuspenseQueryOptions(
  { product_id }: { product_id: ListProductReviewsPathParams['product_id'] },
  params?: ListProductReviewsQueryParams,
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = listProductReviewsSuspenseQueryKey({ product_id }, params);
  return queryOptions<
    ListProductReviewsQueryResponse,
    ResponseErrorConfig<ListProductReviews422>,
    ListProductReviewsQueryResponse,
    typeof queryKey
  >({
    enabled: !!product_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return listProductReviewsSuspense({ product_id }, params, config);
    },
  });
}

/**
 * @description Retrieve reviews for a product.
 * @summary List Product Reviews
 * {@link /api/v1/reviews/product/:product_id}
 */
export function useListProductReviewsSuspense<
  TData = ListProductReviewsQueryResponse,
  TQueryKey extends QueryKey = ListProductReviewsSuspenseQueryKey,
>(
  { product_id }: { product_id: ListProductReviewsPathParams['product_id'] },
  params?: ListProductReviewsQueryParams,
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        ListProductReviewsQueryResponse,
        ResponseErrorConfig<ListProductReviews422>,
        TData,
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
    queryOptions?.queryKey ??
    listProductReviewsSuspenseQueryKey({ product_id }, params);

  const query = useSuspenseQuery(
    {
      ...(listProductReviewsSuspenseQueryOptions(
        { product_id },
        params,
        config
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<ListProductReviews422>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
