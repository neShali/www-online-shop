import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdateCartItemMutationRequest,
  UpdateCartItemMutationResponse,
  UpdateCartItemPathParams,
  UpdateCartItem422,
} from '../../types/cartsTypes/UpdateCartItem';
import { useMutation } from '@tanstack/react-query';

export const updateCartItemMutationKey = () =>
  [{ url: '/api/v1/carts/items/{item_id}' }] as const;

export type UpdateCartItemMutationKey = ReturnType<
  typeof updateCartItemMutationKey
>;

/**
 * @description Update quantity of an item in the cart.
 * @summary Update Cart Item
 * {@link /api/v1/carts/items/:item_id}
 */
export async function updateCartItem(
  { item_id }: { item_id: UpdateCartItemPathParams['item_id'] },
  data?: UpdateCartItemMutationRequest,
  config: Partial<RequestConfig<UpdateCartItemMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdateCartItemMutationResponse,
    ResponseErrorConfig<UpdateCartItem422>,
    UpdateCartItemMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/carts/items/${item_id}`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update quantity of an item in the cart.
 * @summary Update Cart Item
 * {@link /api/v1/carts/items/:item_id}
 */
export function useUpdateCartItem<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateCartItemMutationResponse,
      ResponseErrorConfig<UpdateCartItem422>,
      {
        item_id: UpdateCartItemPathParams['item_id'];
        data?: UpdateCartItemMutationRequest;
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<UpdateCartItemMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? updateCartItemMutationKey();

  return useMutation<
    UpdateCartItemMutationResponse,
    ResponseErrorConfig<UpdateCartItem422>,
    {
      item_id: UpdateCartItemPathParams['item_id'];
      data?: UpdateCartItemMutationRequest;
    },
    TContext
  >(
    {
      mutationFn: async ({ item_id, data }) => {
        return updateCartItem({ item_id }, data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
