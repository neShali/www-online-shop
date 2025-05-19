import client from '@kubb/plugin-client/clients/axios';
import type {
  RequestConfig,
  ResponseErrorConfig,
} from '@kubb/plugin-client/clients/axios';
import type { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import type { RefreshTokenMutationResponse } from '../../types/authenticationTypes/RefreshToken';
import { useMutation } from '@tanstack/react-query';

export const refreshTokenMutationKey = () =>
  [{ url: '/api/v1/auth/refresh-token' }] as const;

export type RefreshTokenMutationKey = ReturnType<
  typeof refreshTokenMutationKey
>;

/**
 * @description Refresh token for current user.
 * @summary Refresh Token
 * {@link /api/v1/auth/refresh-token}
 */
export async function refreshToken(
  config: Partial<RequestConfig> & { client?: typeof client } = {}
) {
  const { client: request = client, ...requestConfig } = config;

  const res = await request<
    RefreshTokenMutationResponse,
    ResponseErrorConfig<Error>,
    unknown
  >({
    method: 'POST',
    url: `/api/v1/auth/refresh-token`,
    baseURL: 'http://localhost:8000',
    ...requestConfig,
  });
  return res.data;
}

/**
 * @description Refresh token for current user.
 * @summary Refresh Token
 * {@link /api/v1/auth/refresh-token}
 */
export function useRefreshToken<TContext>(
  options: {
    mutation?: UseMutationOptions<
      RefreshTokenMutationResponse,
      ResponseErrorConfig<Error>,
      void,
      TContext
    > & { client?: QueryClient };
    client?: Partial<RequestConfig> & { client?: typeof client };
  } = {}
) {
  const { mutation = {}, client: config = {} } = options ?? {};
  const { client: queryClient, ...mutationOptions } = mutation;
  const mutationKey = mutationOptions.mutationKey ?? refreshTokenMutationKey();

  return useMutation<
    RefreshTokenMutationResponse,
    ResponseErrorConfig<Error>,
    void,
    TContext
  >(
    {
      mutationFn: async () => {
        return refreshToken(config);
      },
      mutationKey,
      ...mutationOptions,
    },
    queryClient
  );
}
