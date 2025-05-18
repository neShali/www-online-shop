import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  RemoveProductFromPromoMutationResponse,
  RemoveProductFromPromoPathParams,
  RemoveProductFromPromo422,
} from '../../types/promosTypes/RemoveProductFromPromo';
import { useMutation } from '@tanstack/react-query';

export const removeProductFromPromoMutationKey = () =>
  [{ url: '/api/v1/promos/product/{promo_id}/{product_id}' }] as const;

export type RemoveProductFromPromoMutationKey = ReturnType<
  typeof removeProductFromPromoMutationKey
>;

/**
 * @description Remove a product from a promo (admin only).
 * @summary Remove Product From Promo
 * {@link /api/v1/promos/product/:promo_id/:product_id}
 */
export async function removeProductFromPromo(
  {
    promo_id,
    product_id,
  }: {
    promo_id: RemoveProductFromPromoPathParams['promo_id'];
    product_id: RemoveProductFromPromoPathParams['product_id'];
  },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    RemoveProductFromPromoMutationResponse,
    ResponseErrorConfig<RemoveProductFromPromo422>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/promos/product/${promo_id}/${product_id}`,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Remove a product from a promo (admin only).
 * @summary Remove Product From Promo
 * {@link /api/v1/promos/product/:promo_id/:product_id}
 */
export function useRemoveProductFromPromo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      RemoveProductFromPromoMutationResponse,
      ResponseErrorConfig<RemoveProductFromPromo422>,
      {
        promo_id: RemoveProductFromPromoPathParams['promo_id'];
        product_id: RemoveProductFromPromoPathParams['product_id'];
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? removeProductFromPromoMutationKey();

  return useMutation<
    RemoveProductFromPromoMutationResponse,
    ResponseErrorConfig<RemoveProductFromPromo422>,
    {
      promo_id: RemoveProductFromPromoPathParams['promo_id'];
      product_id: RemoveProductFromPromoPathParams['product_id'];
    },
    TContext
  >(
    {
      mutationFn: async ({ promo_id, product_id }) => {
        return removeProductFromPromo({ promo_id, product_id }, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
