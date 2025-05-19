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
  GetPromoByCodeQueryResponse,
  GetPromoByCodePathParams,
  GetPromoByCode422,
} from '../../types/promosTypes/GetPromoByCode';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getPromoByCodeQueryKey = ({
  code,
}: {
  code: GetPromoByCodePathParams['code'];
}) => [{ url: '/api/v1/promos/code/:code', params: { code: code } }] as const;

export type GetPromoByCodeQueryKey = ReturnType<typeof getPromoByCodeQueryKey>;

/**
 * @description Get a promo by code.Only returns active, valid promos.
 * @summary Get Promo By Code
 * {@link /api/v1/promos/code/:code}
 */
export async function getPromoByCode(
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

export function getPromoByCodeQueryOptions(
  { code }: { code: GetPromoByCodePathParams['code'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getPromoByCodeQueryKey({ code });
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
      return getPromoByCode({ code }, config);
    },
  });
}

/**
 * @description Get a promo by code.Only returns active, valid promos.
 * @summary Get Promo By Code
 * {@link /api/v1/promos/code/:code}
 */
export function useGetPromoByCode<
  TData = GetPromoByCodeQueryResponse,
  TQueryData = GetPromoByCodeQueryResponse,
  TQueryKey extends QueryKey = GetPromoByCodeQueryKey,
>(
  { code }: { code: GetPromoByCodePathParams['code'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetPromoByCodeQueryResponse,
        ResponseErrorConfig<GetPromoByCode422>,
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
  const queryKey = queryOptions?.queryKey ?? getPromoByCodeQueryKey({ code });

  const query = useQuery(
    {
      ...(getPromoByCodeQueryOptions(
        { code },
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<GetPromoByCode422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
