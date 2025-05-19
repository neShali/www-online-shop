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
  GetPromoByCodeQueryResponse,
  GetPromoByCodePathParams,
  GetPromoByCode422,
} from '../../types/promosTypes/GetPromoByCode';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getPromoByCodeSuspenseQueryKey = ({
  code,
}: {
  code: GetPromoByCodePathParams['code'];
}) => [{ url: '/api/v1/promos/code/:code', params: { code: code } }] as const;

export type GetPromoByCodeSuspenseQueryKey = ReturnType<
  typeof getPromoByCodeSuspenseQueryKey
>;

/**
 * @description Get a promo by code.Only returns active, valid promos.
 * @summary Get Promo By Code
 * {@link /api/v1/promos/code/:code}
 */
export async function getPromoByCodeSuspense(
  { code }: { code: GetPromoByCodePathParams['code'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetPromoByCodeQueryResponse,
    ResponseErrorConfig<GetPromoByCode422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/promos/code/${code}`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

export function getPromoByCodeSuspenseQueryOptions(
  { code }: { code: GetPromoByCodePathParams['code'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getPromoByCodeSuspenseQueryKey({ code });
  return queryOptions<
    GetPromoByCodeQueryResponse,
    ResponseErrorConfig<GetPromoByCode422>,
    GetPromoByCodeQueryResponse,
    typeof queryKey
  >({
    enabled: !!code,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getPromoByCodeSuspense({ code }, config);
    },
  });
}

/**
 * @description Get a promo by code.Only returns active, valid promos.
 * @summary Get Promo By Code
 * {@link /api/v1/promos/code/:code}
 */
export function useGetPromoByCodeSuspense<
  TData = GetPromoByCodeQueryResponse,
  TQueryKey extends QueryKey = GetPromoByCodeSuspenseQueryKey,
>(
  { code }: { code: GetPromoByCodePathParams['code'] },
  options: {
    query?: Partial<
      UseSuspenseQueryOptions<
        GetPromoByCodeQueryResponse,
        ResponseErrorConfig<GetPromoByCode422>,
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
    queryOptions?.queryKey ?? getPromoByCodeSuspenseQueryKey({ code });

  const query = useSuspenseQuery(
    {
      ...(getPromoByCodeSuspenseQueryOptions(
        { code },
        config
      ) as unknown as UseSuspenseQueryOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
    },
    queryClient
  ) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetPromoByCode422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
