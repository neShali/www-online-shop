import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  CreateCategoryMutationRequest,
  CreateCategoryMutationResponse,
  CreateCategory422,
} from '../../types/categoriesTypes/CreateCategory';
import { useMutation } from '@tanstack/react-query';

export const createCategoryMutationKey = () =>
  [{ url: '/api/v1/categories/' }] as const;

export type CreateCategoryMutationKey = ReturnType<
  typeof createCategoryMutationKey
>;

/**
 * @description Create new category (admin only).
 * @summary Create Category
 * {@link /api/v1/categories/}
 */
export async function createCategory(
  data: CreateCategoryMutationRequest,
  config: Partial<RequestConfig<CreateCategoryMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    CreateCategoryMutationResponse,
    ResponseErrorConfig<CreateCategory422>,
    CreateCategoryMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/categories/`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Create new category (admin only).
 * @summary Create Category
 * {@link /api/v1/categories/}
 */
export function useCreateCategory<TContext>(
  options: {
    mutation?: UseMutationOptions<
      CreateCategoryMutationResponse,
      ResponseErrorConfig<CreateCategory422>,
      { data: CreateCategoryMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<CreateCategoryMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? createCategoryMutationKey();

  return useMutation<
    CreateCategoryMutationResponse,
    ResponseErrorConfig<CreateCategory422>,
    { data: CreateCategoryMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return createCategory(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
