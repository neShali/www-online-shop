import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  RegisterUserMutationRequest,
  RegisterUserMutationResponse,
  RegisterUser422,
} from '../../types/authenticationTypes/RegisterUser';
import { useMutation } from '@tanstack/react-query';

export const registerUserMutationKey = () =>
  [{ url: '/api/v1/auth/register' }] as const;

export type RegisterUserMutationKey = ReturnType<
  typeof registerUserMutationKey
>;

/**
 * @description Register a new user.
 * @summary Register User
 * {@link /api/v1/auth/register}
 */
export async function registerUser(
  data: RegisterUserMutationRequest,
  config: Partial<RequestConfig<RegisterUserMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    RegisterUserMutationResponse,
    ResponseErrorConfig<RegisterUser422>,
    RegisterUserMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/auth/register`,
    data,
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Register a new user.
 * @summary Register User
 * {@link /api/v1/auth/register}
 */
export function useRegisterUser<TContext>(
  options: {
    mutation?: UseMutationOptions<
      RegisterUserMutationResponse,
      ResponseErrorConfig<RegisterUser422>,
      { data: RegisterUserMutationRequest },
      TContext
    > & {
      client?: QueryClient;
    };
    client?: Partial<RequestConfig<RegisterUserMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? registerUserMutationKey();

  return useMutation<
    RegisterUserMutationResponse,
    ResponseErrorConfig<RegisterUser422>,
    { data: RegisterUserMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return registerUser(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
