import {
  QueryClient,
  QueryCache,
  MutationCache,
  Mutation,
  type DefaultOptions,
} from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
  queries: {
    // сколько мс данные считаются «свежими»
    staleTime: 5 * 60 * 1000,
    // сколько мс держать «мертвые» (неактивные) запросы перед GC
    gcTime: 15 * 60 * 1000, // 👈 вместо cacheTime :contentReference[oaicite:0]{index=0}
    // повторить при ошибке 1 раз
    retry: 1,
  },
  mutations: {
    retry: 1,
    onError(error, variables) {
      console.error('Global mutation error, variables:', variables, error);
    },
    onSuccess(data, variables) {
      console.log(
        'Global mutation success, data:',
        data,
        'variables:',
        variables
      );
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions,

  queryCache: new QueryCache({
    onError(error, query) {
      console.error('Global query error:', query.queryKey, error);
    },
  }),

  mutationCache: new MutationCache({
    onError(
      error,
      _variables,
      _context,
      mutation: Mutation<unknown, unknown, unknown, unknown>
    ) {
      console.error(
        'Global mutation cache error, key:',
        mutation.options.mutationKey,
        error
      );
    },
  }),
});
