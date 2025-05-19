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
  GetPromoQueryResponse,
  GetPromoPathParams,
  GetPromo422,
} from '../../types/promosTypes/GetPromo';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPromoQueryKey = ({
  promo_id,
}: {
  promo_id: GetPromoPathParams['promo_id'];
}) =>
  [
    { url: '/api/v1/promos/:promo_id', params: { promo_id: promo_id } },
  ] as const;

export type GetPromoQueryKey = ReturnType<typeof getPromoQueryKey>;

/**
 * @description Get a promo by ID (admin only).
 * @summary Get Promo
 * {@link /api/v1/promos/:promo_id}
 */
export async function getPromo(
  { promo_id }: { promo_id: GetPromoPathParams['promo_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetPromoQueryResponse,
    ResponseErrorConfig<GetPromo422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/promos/${promo_id}`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function getPromoQueryOptions(
  { promo_id }: { promo_id: GetPromoPathParams['promo_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getPromoQueryKey({ promo_id });
  return queryOptions<
    GetPromoQueryResponse,
    ResponseErrorConfig<GetPromo422>,
    GetPromoQueryResponse,
    typeof queryKey
  >({
    enabled: !!promo_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getPromo({ promo_id }, config);
    },
  });
}

/**
 * @description Get a promo by ID (admin only).
 * @summary Get Promo
 * {@link /api/v1/promos/:promo_id}
 */
export function useGetPromo<
  TData = GetPromoQueryResponse,
  TQueryData = GetPromoQueryResponse,
  TQueryKey extends QueryKey = GetPromoQueryKey,
>(
  { promo_id }: { promo_id: GetPromoPathParams['promo_id'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetPromoQueryResponse,
        ResponseErrorConfig<GetPromo422>,
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
  const queryKey = queryOptions?.queryKey ?? getPromoQueryKey({ promo_id });

  const query = useQuery(
    {
      ...(getPromoQueryOptions(
        { promo_id },
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<GetPromo422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
