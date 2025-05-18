import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  DeletePromoMutationResponse,
  DeletePromoPathParams,
  DeletePromo422,
} from '../../types/promosTypes/DeletePromo';
import { useMutation } from '@tanstack/react-query';

export const deletePromoMutationKey = () =>
  [{ url: '/api/v1/promos/{promo_id}' }] as const;

export type DeletePromoMutationKey = ReturnType<typeof deletePromoMutationKey>;

/**
 * @description Delete a promo (admin only).
 * @summary Delete Promo
 * {@link /api/v1/promos/:promo_id}
 */
export async function deletePromo(
  { promo_id }: { promo_id: DeletePromoPathParams['promo_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeletePromoMutationResponse,
    ResponseErrorConfig<DeletePromo422>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/promos/${promo_id}`,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Delete a promo (admin only).
 * @summary Delete Promo
 * {@link /api/v1/promos/:promo_id}
 */
export function useDeletePromo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeletePromoMutationResponse,
      ResponseErrorConfig<DeletePromo422>,
      { promo_id: DeletePromoPathParams['promo_id'] },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? deletePromoMutationKey();

  return useMutation<
    DeletePromoMutationResponse,
    ResponseErrorConfig<DeletePromo422>,
    { promo_id: DeletePromoPathParams['promo_id'] },
    TContext
  >(
    {
      mutationFn: async ({ promo_id }) => {
        return deletePromo({ promo_id }, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
