import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdateCategoryMutationRequest,
  UpdateCategoryMutationResponse,
  UpdateCategoryPathParams,
  UpdateCategory422,
} from '../../types/categoriesTypes/UpdateCategory';
import { useMutation } from '@tanstack/react-query';

export const updateCategoryMutationKey = () =>
  [{ url: '/api/v1/categories/{category_id}' }] as const;

export type UpdateCategoryMutationKey = ReturnType<
  typeof updateCategoryMutationKey
>;

/**
 * @description Update a category (admin only).
 * @summary Update Category
 * {@link /api/v1/categories/:category_id}
 */
export async function updateCategory(
  { category_id }: { category_id: UpdateCategoryPathParams['category_id'] },
  data?: UpdateCategoryMutationRequest,
  config: Partial<RequestConfig<UpdateCategoryMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdateCategoryMutationResponse,
    ResponseErrorConfig<UpdateCategory422>,
    UpdateCategoryMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/categories/${category_id}`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update a category (admin only).
 * @summary Update Category
 * {@link /api/v1/categories/:category_id}
 */
export function useUpdateCategory<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateCategoryMutationResponse,
      ResponseErrorConfig<UpdateCategory422>,
      {
        category_id: UpdateCategoryPathParams['category_id'];
        data?: UpdateCategoryMutationRequest;
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<UpdateCategoryMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? updateCategoryMutationKey();

  return useMutation<
    UpdateCategoryMutationResponse,
    ResponseErrorConfig<UpdateCategory422>,
    {
      category_id: UpdateCategoryPathParams['category_id'];
      data?: UpdateCategoryMutationRequest;
    },
    TContext
  >(
    {
      mutationFn: async ({ category_id, data }) => {
        return updateCategory({ category_id }, data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
