import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdateReviewMutationRequest,
  UpdateReviewMutationResponse,
  UpdateReviewPathParams,
  UpdateReview422,
} from '../../types/reviewsTypes/UpdateReview';
import { useMutation } from '@tanstack/react-query';

export const updateReviewMutationKey = () =>
  [{ url: '/api/v1/reviews/{review_id}' }] as const;

export type UpdateReviewMutationKey = ReturnType<
  typeof updateReviewMutationKey
>;

/**
 * @description Update a review.
 * @summary Update Review
 * {@link /api/v1/reviews/:review_id}
 */
export async function updateReview(
  { review_id }: { review_id: UpdateReviewPathParams['review_id'] },
  data?: UpdateReviewMutationRequest,
  config: Partial<RequestConfig<UpdateReviewMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdateReviewMutationResponse,
    ResponseErrorConfig<UpdateReview422>,
    UpdateReviewMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/reviews/${review_id}`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update a review.
 * @summary Update Review
 * {@link /api/v1/reviews/:review_id}
 */
export function useUpdateReview<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateReviewMutationResponse,
      ResponseErrorConfig<UpdateReview422>,
      {
        review_id: UpdateReviewPathParams['review_id'];
        data?: UpdateReviewMutationRequest;
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<UpdateReviewMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? updateReviewMutationKey();

  return useMutation<
    UpdateReviewMutationResponse,
    ResponseErrorConfig<UpdateReview422>,
    {
      review_id: UpdateReviewPathParams['review_id'];
      data?: UpdateReviewMutationRequest;
    },
    TContext
  >(
    {
      mutationFn: async ({ review_id, data }) => {
        return updateReview({ review_id }, data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
