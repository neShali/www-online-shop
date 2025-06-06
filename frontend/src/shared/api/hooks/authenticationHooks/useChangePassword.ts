import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  ChangePasswordMutationRequest,
  ChangePasswordMutationResponse,
  ChangePassword422,
} from '../../types/authenticationTypes/ChangePassword';
import { useMutation } from '@tanstack/react-query';

export const changePasswordMutationKey = () =>
  [{ url: '/api/v1/auth/password' }] as const;

export type ChangePasswordMutationKey = ReturnType<
  typeof changePasswordMutationKey
>;

/**
 * @description Change current user password.
 * @summary Change Password
 * {@link /api/v1/auth/password}
 */
export async function changePassword(
  data: ChangePasswordMutationRequest,
  config: Partial<RequestConfig<ChangePasswordMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    ChangePasswordMutationResponse,
    ResponseErrorConfig<ChangePassword422>,
    ChangePasswordMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/auth/password`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Change current user password.
 * @summary Change Password
 * {@link /api/v1/auth/password}
 */
export function useChangePassword<TContext>(
  options: {
    mutation?: UseMutationOptions<
      ChangePasswordMutationResponse,
      ResponseErrorConfig<ChangePassword422>,
      { data: ChangePasswordMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<ChangePasswordMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey =
    mutationOptions.mutationKey ?? changePasswordMutationKey();

  return useMutation<
    ChangePasswordMutationResponse,
    ResponseErrorConfig<ChangePassword422>,
    { data: ChangePasswordMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return changePassword(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
