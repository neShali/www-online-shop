import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  CreateProductMutationRequest,
  CreateProductMutationResponse,
  CreateProduct422,
} from '../../types/productsTypes/CreateProduct';
import { useMutation } from '@tanstack/react-query';

export const createProductMutationKey = () =>
  [{ url: '/api/v1/products/' }] as const;

export type CreateProductMutationKey = ReturnType<
  typeof createProductMutationKey
>;

/**
 * @description Create new product (admin only).
 * @summary Create Product
 * {@link /api/v1/products/}
 */
export async function createProduct(
  data: CreateProductMutationRequest,
  config: Partial<RequestConfig<CreateProductMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CreateProductMutationResponse,
    ResponseErrorConfig<CreateProduct422>,
    CreateProductMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/products/`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Create new product (admin only).
 * @summary Create Product
 * {@link /api/v1/products/}
 */
export function useCreateProduct<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateProductMutationResponse,
      ResponseErrorConfig<CreateProduct422>,
      { data: CreateProductMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<CreateProductMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? createProductMutationKey();

  return useMutation<
    CreateProductMutationResponse,
    ResponseErrorConfig<CreateProduct422>,
    { data: CreateProductMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createProduct(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
