import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { promosApi } from '../services/api';
import type { Promo, Product } from '../types';

// Query key factories
export const promoKeys = {
  all: ['promos'] as const,
  active: () => [...promoKeys.all, 'active'] as const,
  details: () => [...promoKeys.all, 'detail'] as const,
  detail: (id: string) => [...promoKeys.details(), id] as const,
  products: (id: string) => [...promoKeys.detail(id), 'products'] as const,
  byCode: (code: string) => [...promoKeys.all, 'code', code] as const,
};

// API functions
export const fetchActivePromos = promosApi.getActivePromos;
export const fetchPromoByCode = promosApi.getPromoByCode;

// Note: These endpoints might not exist in the backend yet
export async function fetchPromo(_promoId: string): Promise<Promo> {
  // This would need to be implemented in the backend
  throw new Error('fetchPromo not implemented in backend');
}

export async function fetchPromoProducts(_promoId: string): Promise<Product[]> {
  // This would need to be implemented in the backend  
  throw new Error('fetchPromoProducts not implemented in backend');
}

// Hooks
export function useListActivePromos(
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Promo[], Error> {
  return useQuery({
    queryKey: promoKeys.active(),
    queryFn: fetchActivePromos,
    staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes
    gcTime: options?.cacheTime ?? 15 * 60 * 1000, // 15 minutes
    enabled: options?.enabled ?? true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetPromo(
  promoId: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Promo, Error> {
  return useQuery({
    queryKey: promoKeys.detail(promoId),
    queryFn: () => fetchPromo(promoId),
    enabled: (options?.enabled ?? true) && !!promoId,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useGetPromoByCode(
  code: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Promo, Error> {
  return useQuery({
    queryKey: promoKeys.byCode(code),
    queryFn: () => fetchPromoByCode(code),
    enabled: (options?.enabled ?? true) && !!code,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
    retry: 2, // Don't retry too many times for promo codes
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

export function useGetPromoProducts(
  promoId: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Product[], Error> {
  return useQuery({
    queryKey: promoKeys.products(promoId),
    queryFn: () => fetchPromoProducts(promoId),
    enabled: (options?.enabled ?? true) && !!promoId,
    staleTime: options?.staleTime ?? 10 * 60 * 1000, // 10 minutes
    gcTime: options?.cacheTime ?? 15 * 60 * 1000, // 15 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}