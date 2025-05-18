import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdateUserMeMutationRequest,
  UpdateUserMeMutationResponse,
  UpdateUserMe422,
} from '../../types/authenticationTypes/UpdateUserMe';
import { useMutation } from '@tanstack/react-query';

export const updateUserMeMutationKey = () =>
  [{ url: '/api/v1/auth/me' }] as const;

export type UpdateUserMeMutationKey = ReturnType<
  typeof updateUserMeMutationKey
>;

/**
 * @description Update current user.
 * @summary Update User Me
 * {@link /api/v1/auth/me}
 */
export async function updateUserMe(
  data?: UpdateUserMeMutationRequest,
  config: Partial<RequestConfig<UpdateUserMeMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdateUserMeMutationResponse,
    ResponseErrorConfig<UpdateUserMe422>,
    UpdateUserMeMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/auth/me`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update current user.
 * @summary Update User Me
 * {@link /api/v1/auth/me}
 */
export function useUpdateUserMe<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateUserMeMutationResponse,
      ResponseErrorConfig<UpdateUserMe422>,
      { data?: UpdateUserMeMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<UpdateUserMeMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? updateUserMeMutationKey();

  return useMutation<
    UpdateUserMeMutationResponse,
    ResponseErrorConfig<UpdateUserMe422>,
    { data?: UpdateUserMeMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return updateUserMe(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
