import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  DeleteProductMutationResponse,
  DeleteProductPathParams,
  DeleteProduct422,
} from '../../types/productsTypes/DeleteProduct';
import { useMutation } from '@tanstack/react-query';

export const deleteProductMutationKey = () =>
  [{ url: '/api/v1/products/{product_id}' }] as const;

export type DeleteProductMutationKey = ReturnType<
  typeof deleteProductMutationKey
>;

/**
 * @description Delete a product (admin only).
 * @summary Delete Product
 * {@link /api/v1/products/:product_id}
 */
export async function deleteProduct(
  { product_id }: { product_id: DeleteProductPathParams['product_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeleteProductMutationResponse,
    ResponseErrorConfig<DeleteProduct422>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/products/${product_id}`,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Delete a product (admin only).
 * @summary Delete Product
 * {@link /api/v1/products/:product_id}
 */
export function useDeleteProduct<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteProductMutationResponse,
      ResponseErrorConfig<DeleteProduct422>,
      { product_id: DeleteProductPathParams['product_id'] },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? deleteProductMutationKey();

  return useMutation<
    DeleteProductMutationResponse,
    ResponseErrorConfig<DeleteProduct422>,
    { product_id: DeleteProductPathParams['product_id'] },
    TContext
  >(
    {
      mutationFn: async ({ product_id }) => {
        return deleteProduct({ product_id }, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
