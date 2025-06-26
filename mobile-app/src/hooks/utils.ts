/**
 * Mobile-Optimized API Hooks Utility Functions
 * 
 * This file contains utility functions and constants for mobile-specific optimizations
 * when using the API hooks.
 */

// Mobile-specific cache times (in milliseconds)
export const MOBILE_CACHE_TIMES = {
  // Short cache for frequently changing data
  SHORT: 2 * 60 * 1000,      // 2 minutes
  
  // Medium cache for moderately changing data
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  
  // Long cache for rarely changing data
  LONG: 15 * 60 * 1000,      // 15 minutes
  
  // Very long cache for static data
  STATIC: 30 * 60 * 1000,    // 30 minutes
};

// Mobile-specific stale times (when data is considered stale)
export const MOBILE_STALE_TIMES = {
  // Data that should stay fresh
  FRESH: 30 * 1000,          // 30 seconds
  
  // Normal staleness
  NORMAL: 2 * 60 * 1000,     // 2 minutes
  
  // Can be stale for longer
  RELAXED: 10 * 60 * 1000,   // 10 minutes
  
  // Static data can be stale for very long
  STATIC: 30 * 60 * 1000,    // 30 minutes
};

// Retry configuration for mobile networks
export const MOBILE_RETRY_CONFIG = {
  // Standard retry count
  STANDARD: 3,
  
  // Lower retry count for non-critical operations
  LOW: 2,
  
  // Higher retry count for critical operations
  HIGH: 5,
  
  // Exponential backoff delay function
  delay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  
  // Quick retry for less critical operations
  quickDelay: (attemptIndex: number) => Math.min(500 * 2 ** attemptIndex, 10000),
};

/**
 * Hook options for different types of mobile usage patterns
 */
export const MOBILE_HOOK_OPTIONS = {
  // For product listings - balance between freshness and performance
  PRODUCT_LIST: {
    staleTime: MOBILE_STALE_TIMES.NORMAL,
    cacheTime: MOBILE_CACHE_TIMES.MEDIUM,
    retry: MOBILE_RETRY_CONFIG.STANDARD,
    retryDelay: MOBILE_RETRY_CONFIG.delay,
  },
  
  // For product details - keep fresh longer since users focus on one product
  PRODUCT_DETAILS: {
    staleTime: MOBILE_STALE_TIMES.RELAXED,
    cacheTime: MOBILE_CACHE_TIMES.LONG,
    retry: MOBILE_RETRY_CONFIG.STANDARD,
    retryDelay: MOBILE_RETRY_CONFIG.delay,
  },
  
  // For categories - rarely change, can cache aggressively
  CATEGORIES: {
    staleTime: MOBILE_STALE_TIMES.STATIC,
    cacheTime: MOBILE_CACHE_TIMES.STATIC,
    retry: MOBILE_RETRY_CONFIG.STANDARD,
    retryDelay: MOBILE_RETRY_CONFIG.delay,
  },
  
  // For cart - needs to be fresh for accurate state
  CART: {
    staleTime: MOBILE_STALE_TIMES.FRESH,
    cacheTime: MOBILE_CACHE_TIMES.SHORT,
    retry: MOBILE_RETRY_CONFIG.LOW,
    retryDelay: MOBILE_RETRY_CONFIG.quickDelay,
  },
  
  // For user auth - moderate freshness needed
  AUTH: {
    staleTime: MOBILE_STALE_TIMES.NORMAL,
    cacheTime: MOBILE_CACHE_TIMES.MEDIUM,
    retry: MOBILE_RETRY_CONFIG.LOW,
    retryDelay: MOBILE_RETRY_CONFIG.quickDelay,
  },
  
  // For promos - can be cached but not too long (promotions change)
  PROMOS: {
    staleTime: MOBILE_STALE_TIMES.RELAXED,
    cacheTime: MOBILE_CACHE_TIMES.LONG,
    retry: MOBILE_RETRY_CONFIG.STANDARD,
    retryDelay: MOBILE_RETRY_CONFIG.delay,
  },
};

/**
 * Utility function to create optimized query options based on mobile context
 */
export function createMobileQueryOptions(
  type: keyof typeof MOBILE_HOOK_OPTIONS,
  overrides?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    retry?: number;
  }
) {
  const baseOptions = MOBILE_HOOK_OPTIONS[type];
  
  return {
    ...baseOptions,
    ...overrides,
  };
}

/**
 * Check if device is offline (you might need to implement this based on your offline detection)
 */
export function isOffline(): boolean {
  // This is a placeholder - you should implement actual offline detection
  // using libraries like @react-native-async-storage/async-storage for React Native
  // or navigator.onLine for web-based mobile apps
  return !navigator.onLine;
}

/**
 * Get network-aware query options
 * Adjusts caching and retry behavior based on network conditions
 */
export function getNetworkAwareOptions(baseOptions: Record<string, unknown>) {
  if (isOffline()) {
    return {
      ...baseOptions,
      enabled: false, // Disable queries when offline
      retry: 0,       // Don't retry when offline
    };
  }
  
  return baseOptions;
}

/**
 * Example usage patterns:
 * 
 * // Basic usage with mobile optimizations
 * const { data: products } = useListProducts(params, createMobileQueryOptions('PRODUCT_LIST'));
 * 
 * // Override specific options
 * const { data: product } = useGetProduct(id, createMobileQueryOptions('PRODUCT_DETAILS', {
 *   enabled: !!id,
 *   staleTime: 1000 * 60, // 1 minute custom stale time
 * }));
 * 
 * // Network-aware usage
 * const { data: categories } = useListCategories(
 *   undefined,
 *   getNetworkAwareOptions(createMobileQueryOptions('CATEGORIES'))
 * );
 */