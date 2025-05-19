import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type {
  LoginMutationRequest,
  LoginMutationResponse,
  Login422,
} from '../../types/authenticationTypes/Login';
import { useMutation } from '@tanstack/react-query';

export const loginMutationKey = () => [{ url: '/api/v1/auth/login' }] as const;

export type LoginMutationKey = ReturnType<typeof loginMutationKey>;

/**
 * @description OAuth2 compatible token login, get an access token for future requests.
 * @summary Login
 * {@link /api/v1/auth/login}
 */
export async function login(
  data: LoginMutationRequest,
  config: Partial<RequestConfig<LoginMutationRequest>> & {
    client?: typeof client;
  } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    LoginMutationResponse,
    ResponseErrorConfig<Login422>,
    LoginMutationRequest
  >({
    method: 'POST',
    url: `/api/v1/auth/login`,
    baseURL: 'http://localhost:8000',
    data,
    ...requestConfig,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...requestConfig.headers,
    },
  });
  return res.data;
}

/**
 * @description OAuth2 compatible token login, get an access token for future requests.
 * @summary Login
 * {@link /api/v1/auth/login}
 */
export function useLogin<TContext>(
  options: {
    mutation?: UseMutationOptions<
      LoginMutationResponse,
      ResponseErrorConfig<Login422>,
      { data: LoginMutationRequest },
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig<LoginMutationRequest>> & {
      client?: typeof client;
    };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? loginMutationKey();

  return useMutation<
    LoginMutationResponse,
    ResponseErrorConfig<Login422>,
    { data: LoginMutationRequest },
    TContext
  >(
    {
      mutationFn: async ({ data }) => {
        return login(data, config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
