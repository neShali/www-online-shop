import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  CreateReviewMutationRequest,
  CreateReviewMutationResponse,
  CreateReview422,
} from '../../types/reviewsTypes/CreateReview';
import { useMutation } from '@tanstack/react-query';

export const createReviewMutationKey = () =>
  [{ url: '/api/v1/reviews/' }] as const;

export type CreateReviewMutationKey = ReturnType<
  typeof createReviewMutationKey
>;

/**
 * @description Create a review for a product.
 * @summary Create Review
 * {@link /api/v1/reviews/}
 */
export async function createReview(
  data: CreateReviewMutationRequest,
  config: Partial<RequestConfig<CreateReviewMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CreateReviewMutationResponse,
    ResponseErrorConfig<CreateReview422>,
    CreateReviewMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/reviews/`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Create a review for a product.
 * @summary Create Review
 * {@link /api/v1/reviews/}
 */
export function useCreateReview<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateReviewMutationResponse,
      ResponseErrorConfig<CreateReview422>,
      { data: CreateReviewMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<CreateReviewMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? createReviewMutationKey();

  return useMutation<
    CreateReviewMutationResponse,
    ResponseErrorConfig<CreateReview422>,
    { data: CreateReviewMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createReview(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
