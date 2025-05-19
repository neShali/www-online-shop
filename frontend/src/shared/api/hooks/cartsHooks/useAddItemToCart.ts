import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  AddItemToCartMutationRequest,
  AddItemToCartMutationResponse,
  AddItemToCart422,
} from '../../types/cartsTypes/AddItemToCart';
import { useMutation } from '@tanstack/react-query';

export const addItemToCartMutationKey = () =>
  [{ url: '/api/v1/carts/items' }] as const;

export type AddItemToCartMutationKey = ReturnType<
  typeof addItemToCartMutationKey
>;

/**
 * @description Add an item to the user's cart.
 * @summary Add Item To Cart
 * {@link /api/v1/carts/items}
 */
export async function addItemToCart(
  data: AddItemToCartMutationRequest,
  config: Partial<RequestConfig<AddItemToCartMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AddItemToCartMutationResponse,
    ResponseErrorConfig<AddItemToCart422>,
    AddItemToCartMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/carts/items`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Add an item to the user's cart.
 * @summary Add Item To Cart
 * {@link /api/v1/carts/items}
 */
export function useAddItemToCart<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AddItemToCartMutationResponse,
      ResponseErrorConfig<AddItemToCart422>,
      { data: AddItemToCartMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<AddItemToCartMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? addItemToCartMutationKey();

  return useMutation<
    AddItemToCartMutationResponse,
    ResponseErrorConfig<AddItemToCart422>,
    { data: AddItemToCartMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return addItemToCart(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
