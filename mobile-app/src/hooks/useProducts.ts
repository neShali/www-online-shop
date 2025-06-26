import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { productsApi } from '../services/api';
import type { Product, ProductList } from '../types';

// Query key factories
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params?: ProductListParams) => [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Types
export interface ProductListParams {
  skip?: number;
  limit?: number;
  category_id?: number;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: 'name' | 'price' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

// API functions
export const fetchProducts = productsApi.getProducts;
export const fetchProduct = (productId: string) => productsApi.getProduct(Number(productId));

// Hooks
export function useListProducts(
  params?: ProductListParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<ProductList, Error> {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes (gcTime is the new name for cacheTime)
    enabled: options?.enabled ?? true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetProduct(
  productId: string | number,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Product, Error> {
  const id = typeof productId === 'string' ? productId : String(productId);
  
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: (options?.enabled ?? true) && !!productId,
    staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes
    gcTime: options?.cacheTime ?? 30 * 60 * 1000, // 30 minutes (gcTime is the new name for cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}