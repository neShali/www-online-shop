import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type { ClearCartMutationResponse } from '../../types/cartsTypes/ClearCart';
import { useMutation } from '@tanstack/react-query';

export const clearCartMutationKey = () =>
  [{ url: '/api/v1/carts/clear' }] as const;

export type ClearCartMutationKey = ReturnType<typeof clearCartMutationKey>;

/**
 * @description Clear all items from the cart.
 * @summary Clear Cart
 * {@link /api/v1/carts/clear}
 */
export async function clearCart(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ClearCartMutationResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/carts/clear`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Clear all items from the cart.
 * @summary Clear Cart
 * {@link /api/v1/carts/clear}
 */
export function useClearCart<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ClearCartMutationResponse,
      ResponseErrorConfig<Error>,
      void,
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? clearCartMutationKey();

  return useMutation<
    ClearCartMutationResponse,
    ResponseErrorConfig<Error>,
    void,
    TContext
  >(
    {
      mutationFn: async () => {
        return clearCart(config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
