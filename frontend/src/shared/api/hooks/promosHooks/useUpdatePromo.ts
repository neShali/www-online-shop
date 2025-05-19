import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdatePromoMutationRequest,
  UpdatePromoMutationResponse,
  UpdatePromoPathParams,
  UpdatePromo422,
} from '../../types/promosTypes/UpdatePromo';
import { useMutation } from '@tanstack/react-query';

export const updatePromoMutationKey = () =>
  [{ url: '/api/v1/promos/{promo_id}' }] as const;

export type UpdatePromoMutationKey = ReturnType<typeof updatePromoMutationKey>;

/**
 * @description Update a promo (admin only).
 * @summary Update Promo
 * {@link /api/v1/promos/:promo_id}
 */
export async function updatePromo(
  { promo_id }: { promo_id: UpdatePromoPathParams['promo_id'] },
  data?: UpdatePromoMutationRequest,
  config: Partial<RequestConfig<UpdatePromoMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdatePromoMutationResponse,
    ResponseErrorConfig<UpdatePromo422>,
    UpdatePromoMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/promos/${promo_id}`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update a promo (admin only).
 * @summary Update Promo
 * {@link /api/v1/promos/:promo_id}
 */
export function useUpdatePromo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdatePromoMutationResponse,
      ResponseErrorConfig<UpdatePromo422>,
      {
        promo_id: UpdatePromoPathParams['promo_id'];
        data?: UpdatePromoMutationRequest;
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<UpdatePromoMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? updatePromoMutationKey();

  return useMutation<
    UpdatePromoMutationResponse,
    ResponseErrorConfig<UpdatePromo422>,
    {
      promo_id: UpdatePromoPathParams['promo_id'];
      data?: UpdatePromoMutationRequest;
    },
    TContext
  >(
    {
      mutationFn: async ({ promo_id, data }) => {
        return updatePromo({ promo_id }, data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
