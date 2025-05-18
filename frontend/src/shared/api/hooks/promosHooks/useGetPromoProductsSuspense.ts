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
  GetPromoProductsQueryResponse,
  GetPromoProductsPathParams,
  GetPromoProducts422,
} from '../../types/promosTypes/GetPromoProducts';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getPromoProductsSuspenseQueryKey = ({
  promo_id,
}: {
  promo_id: GetPromoProductsPathParams['promo_id'];
}) =>
  [
    'v5',
    {
      url: '/api/v1/promos/:promo_id/products',
      params: { promo_id: promo_id },
    },
  ] as const;

export type GetPromoProductsSuspenseQueryKey = ReturnType<
  typeof getPromoProductsSuspenseQueryKey
>;

/**
 * @description Get all products associated with a promo (admin only).
 * @summary Get Promo Products
 * {@link /api/v1/promos/:promo_id/products}
 */
export async function getPromoProductsSuspense(
  { promo_id }: { promo_id: GetPromoProductsPathParams['promo_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetPromoProductsQueryResponse,
    ResponseErrorConfig<GetPromoProducts422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/promos/${promo_id}/products`,
    ...requestConfig,
  });
  return res.data;
}

export function getPromoProductsSuspenseQueryOptions(
  { promo_id }: { promo_id: GetPromoProductsPathParams['promo_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getPromoProductsSuspenseQueryKey({ promo_id });
  return queryOptions<
    GetPromoProductsQueryResponse,
    ResponseErrorConfig<GetPromoProducts422>,
    GetPromoProductsQueryResponse,
    typeof queryKey
  >({
    enabled: !!promo_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getPromoProductsSuspense({ promo_id }, config);
    },
  });
}

/**
 * @description Get all products associated with a promo (admin only).
 * @summary Get Promo Products
 * {@link /api/v1/promos/:promo_id/products}
 */
export function useGetPromoProductsSuspense<
  TData = GetPromoProductsQueryResponse,
  TQueryKey extends QueryKey = GetPromoProductsSuspenseQueryKey,
>(
  { promo_id }: { promo_id: GetPromoProductsPathParams['promo_id'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetPromoProductsQueryResponse,
        ResponseErrorConfig<GetPromoProducts422>,
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
    queryOptions?.queryKey ?? getPromoProductsSuspenseQueryKey({ promo_id });

  const query = useSuspenseQuery(
    {
      ...(getPromoProductsSuspenseQueryOptions(
        { promo_id },
        config
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient
  ) as UseSuspenseQueryResult<
    TData,
    ResponseErrorConfig<GetPromoProducts422>
  > & { queryKey: TQueryKey };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
