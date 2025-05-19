import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  DeleteCategoryMutationResponse,
  DeleteCategoryPathParams,
  DeleteCategory422,
} from '../../types/categoriesTypes/DeleteCategory';
import { useMutation } from '@tanstack/react-query';

export const deleteCategoryMutationKey = () =>
  [{ url: '/api/v1/categories/{category_id}' }] as const;

export type DeleteCategoryMutationKey = ReturnType<
  typeof deleteCategoryMutationKey
>;

/**
 * @description Delete a category (admin only).This will also delete all child categories due to cascade.
 * @summary Delete Category
 * {@link /api/v1/categories/:category_id}
 */
export async function deleteCategory(
  { category_id }: { category_id: DeleteCategoryPathParams['category_id'] },
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    DeleteCategoryMutationResponse,
    ResponseErrorConfig<DeleteCategory422>,
    unknown
  >({
    method: 'DELETE',
    url: `/api/v1/categories/${category_id}`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Delete a category (admin only).This will also delete all child categories due to cascade.
 * @summary Delete Category
 * {@link /api/v1/categories/:category_id}
 */
export function useDeleteCategory<TContext>(
  options: {
    mutation?: UseMutationOptions<
      DeleteCategoryMutationResponse,
      ResponseErrorConfig<DeleteCategory422>,
      { category_id: DeleteCategoryPathParams['category_id'] },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? deleteCategoryMutationKey();

  return useMutation<
    DeleteCategoryMutationResponse,
    ResponseErrorConfig<DeleteCategory422>,
    { category_id: DeleteCategoryPathParams['category_id'] },
    TContext
  >(
    {
      mutationFn: async ({ category_id }) => {
        return deleteCategory({ category_id }, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
