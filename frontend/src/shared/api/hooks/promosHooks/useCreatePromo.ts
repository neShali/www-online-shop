import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  CreatePromoMutationRequest,
  CreatePromoMutationResponse,
  CreatePromo422,
} from '../../types/promosTypes/CreatePromo';
import { useMutation } from '@tanstack/react-query';

export const createPromoMutationKey = () =>
  [{ url: '/api/v1/promos/' }] as const;

export type CreatePromoMutationKey = ReturnType<typeof createPromoMutationKey>;

/**
 * @description Create a new promo (admin only).
 * @summary Create Promo
 * {@link /api/v1/promos/}
 */
export async function createPromo(
  data: CreatePromoMutationRequest,
  config: Partial<RequestConfig<CreatePromoMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CreatePromoMutationResponse,
    ResponseErrorConfig<CreatePromo422>,
    CreatePromoMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/promos/`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Create a new promo (admin only).
 * @summary Create Promo
 * {@link /api/v1/promos/}
 */
export function useCreatePromo<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreatePromoMutationResponse,
      ResponseErrorConfig<CreatePromo422>,
      { data: CreatePromoMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<CreatePromoMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? createPromoMutationKey();

  return useMutation<
    CreatePromoMutationResponse,
    ResponseErrorConfig<CreatePromo422>,
    { data: CreatePromoMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createPromo(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
