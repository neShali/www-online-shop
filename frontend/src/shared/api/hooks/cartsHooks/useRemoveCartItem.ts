import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  RemoveCartItemMutationResponse,
  RemoveCartItemPathParams,
  RemoveCartItem422,
} from '../../types/cartsTypes/RemoveCartItem';
import { useMutation } from '@tanstack/react-query';

export const removeCartItemMutationKey = () =>
  [{ url: '/api/v1/carts/items/{item_id}' }] as const;

export type RemoveCartItemMutationKey = ReturnType<
  typeof removeCartItemMutationKey
>;

/**
 * @description Remove an item from the cart.
 * @summary Remove Cart Item
 * {@link /api/v1/carts/items/:item_id}
 */
export async function removeCartItem(
  { item_id }: { item_id: RemoveCartItemPathParams['item_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    RemoveCartItemMutationResponse,
    ResponseErrorConfig<RemoveCartItem422>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/carts/items/${item_id}`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Remove an item from the cart.
 * @summary Remove Cart Item
 * {@link /api/v1/carts/items/:item_id}
 */
export function useRemoveCartItem<TContext>(
  options: {
    mutation?: UseMutationOptions<
      RemoveCartItemMutationResponse,
      ResponseErrorConfig<RemoveCartItem422>,
      { item_id: RemoveCartItemPathParams['item_id'] },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? removeCartItemMutationKey();

  return useMutation<
    RemoveCartItemMutationResponse,
    ResponseErrorConfig<RemoveCartItem422>,
    { item_id: RemoveCartItemPathParams['item_id'] },
    TContext
  >(
    {
      mutationFn: async ({ item_id }) => {
        return removeCartItem({ item_id }, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
