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
  GetProductQueryResponse,
  GetProductPathParams,
  GetProduct422,
} from '../../types/productsTypes/GetProduct';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getProductQueryKey = ({
  product_id,
}: {
  product_id: GetProductPathParams['product_id'];
}) =>
  [
    'v5',
    { url: '/api/v1/products/:product_id', params: { product_id: product_id } },
  ] as const;

export type GetProductQueryKey = ReturnType<typeof getProductQueryKey>;

/**
 * @description Get product by ID.
 * @summary Get Product
 * {@link /api/v1/products/:product_id}
 */
export async function getProduct(
  { product_id }: { product_id: GetProductPathParams['product_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    GetProductQueryResponse,
    ResponseErrorConfig<GetProduct422>,
    unknown
  >({
    method: 'GET',
    url: `/api/v1/products/${product_id}`,
    ...requestConfig,
  });
  return res.data;
}

export function getProductQueryOptions(
  { product_id }: { product_id: GetProductPathParams['product_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const queryKey = getProductQueryKey({ product_id });
  return queryOptions<
    GetProductQueryResponse,
    ResponseErrorConfig<GetProduct422>,
    GetProductQueryResponse,
    typeof queryKey
  >({
    enabled: !!product_id,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal;
      return getProduct({ product_id }, config);
    },
  });
}

/**
 * @description Get product by ID.
 * @summary Get Product
 * {@link /api/v1/products/:product_id}
 */
export function useGetProduct<
  TData = GetProductQueryResponse,
  TQueryData = GetProductQueryResponse,
  TQueryKey extends QueryKey = GetProductQueryKey,
>(
  { product_id }: { product_id: GetProductPathParams['product_id'] },
  options: {
    query?: Partial<
      QueryObserverOptions<
        GetProductQueryResponse,
        ResponseErrorConfig<GetProduct422>,
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
  const queryKey = queryOptions?.queryKey ?? getProductQueryKey({ product_id });

  const query = useQuery(
    {
      ...(getProductQueryOptions(
        { product_id },
        config
      ) as unknown as QueryObserverOptions),
      queryKey,
      ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
    },
    queryClient
  ) as UseQueryResult<TData, ResponseErrorConfig<GetProduct422>> & {
    queryKey: TQueryKey;
  };

  query.queryKey = queryKey as TQueryKey;

  return query;
}
