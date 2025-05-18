import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  AddProductToPromoMutationRequest,
  AddProductToPromoMutationResponse,
  AddProductToPromo422,
} from '../../types/promosTypes/AddProductToPromo';
import { useMutation } from '@tanstack/react-query';

export const addProductToPromoMutationKey = () =>
  [{ url: '/api/v1/promos/product' }] as const;

export type AddProductToPromoMutationKey = ReturnType<
  typeof addProductToPromoMutationKey
>;

/**
 * @description Add a product to a promo (admin only).
 * @summary Add Product To Promo
 * {@link /api/v1/promos/product}
 */
export async function addProductToPromo(
  data: AddProductToPromoMutationRequest,
  config: Partial<RequestConfig<AddProductToPromoMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    AddProductToPromoMutationResponse,
    ResponseErrorConfig<AddProductToPromo422>,
    AddProductToPromoMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/promos/product`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Add a product to a promo (admin only).
 * @summary Add Product To Promo
 * {@link /api/v1/promos/product}
 */
export function useAddProductToPromo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      AddProductToPromoMutationResponse,
      ResponseErrorConfig<AddProductToPromo422>,
      { data: AddProductToPromoMutationRequest },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<AddProductToPromoMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? addProductToPromoMutationKey();

  return useMutation<
    AddProductToPromoMutationResponse,
    ResponseErrorConfig<AddProductToPromo422>,
    { data: AddProductToPromoMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return addProductToPromo(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
