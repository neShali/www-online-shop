// Products hooks
export {
  useListProducts,
  useGetProduct,
  productKeys,
  fetchProducts,
  fetchProduct,
  type ProductListParams,
} from './useProducts';

// Categories hooks
export {
  useListCategories,
  useListCategoryTree,
  categoryKeys,
  fetchCategories,
  fetchCategoryTree,
  type CategoryListParams,
} from './useCategories';

// Cart hooks
export {
  useGetMyCart,
  useAddItemToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  cartKeys,
  fetchMyCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from './useCart';

// Auth hooks
export {
  useLogin,
  useRegisterUser,
  useCurrentUser,
  useLogout,
  useIsAuthenticated,
  useAuthToken,
  authKeys,
  login,
  registerUser,
  getCurrentUser,
  refreshToken,
} from './useAuth';

// Promos hooks
export {
  useListActivePromos,
  useGetPromo,
  useGetPromoByCode,
  useGetPromoProducts,
  promoKeys,
  fetchActivePromos,
  fetchPromo,
  fetchPromoByCode,
  fetchPromoProducts,
} from './usePromos';

// Mobile utilities
export {
  MOBILE_CACHE_TIMES,
  MOBILE_STALE_TIMES,
  MOBILE_RETRY_CONFIG,
  MOBILE_HOOK_OPTIONS,
  createMobileQueryOptions,
  isOffline,
  getNetworkAwareOptions,
} from './utils';