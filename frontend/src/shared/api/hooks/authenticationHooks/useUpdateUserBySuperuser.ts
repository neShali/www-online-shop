import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  UpdateUserBySuperuserMutationRequest,
  UpdateUserBySuperuserMutationResponse,
  UpdateUserBySuperuserPathParams,
  UpdateUserBySuperuser422,
} from '../../types/authenticationTypes/UpdateUserBySuperuser';
import { useMutation } from '@tanstack/react-query';

export const updateUserBySuperuserMutationKey = () =>
  [{ url: '/api/v1/auth/{user_id}' }] as const;

export type UpdateUserBySuperuserMutationKey = ReturnType<
  typeof updateUserBySuperuserMutationKey
>;

/**
 * @description Update a user by superuser.
 * @summary Update User By Superuser
 * {@link /api/v1/auth/:user_id}
 */
export async function updateUserBySuperuser(
  { user_id }: { user_id: UpdateUserBySuperuserPathParams['user_id'] },
  data?: UpdateUserBySuperuserMutationRequest,
  config: Partial<RequestConfig<UpdateUserBySuperuserMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    UpdateUserBySuperuserMutationResponse,
    ResponseErrorConfig<UpdateUserBySuperuser422>,
    UpdateUserBySuperuserMutationRequest
  >({
    method: 'PUT',
    url: `/api/v1/auth/${user_id}`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Update a user by superuser.
 * @summary Update User By Superuser
 * {@link /api/v1/auth/:user_id}
 */
export function useUpdateUserBySuperuser<TContext>(
  options: {
    mutation?: UseMutationOptions<
      UpdateUserBySuperuserMutationResponse,
      ResponseErrorConfig<UpdateUserBySuperuser422>,
      {
        user_id: UpdateUserBySuperuserPathParams['user_id'];
        data?: UpdateUserBySuperuserMutationRequest;
      },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<UpdateUserBySuperuserMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? updateUserBySuperuserMutationKey();

  return useMutation<
    UpdateUserBySuperuserMutationResponse,
    ResponseErrorConfig<UpdateUserBySuperuser422>,
    {
      user_id: UpdateUserBySuperuserPathParams['user_id'];
      data?: UpdateUserBySuperuserMutationRequest;
    },
    TContext
  >(
    {
      mutationFn: async ({ user_id, data }) => {
        return updateUserBySuperuser({ user_id }, data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
