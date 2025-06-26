import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { categoriesApi } from '../services/api';
import type { Category, CategoryWithChildren } from '../types';

// Query key factories
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params?: CategoryListParams) => [...categoryKeys.lists(), params] as const,
  tree: () => [...categoryKeys.all, 'tree'] as const,
};

// Types
export interface CategoryListParams {
  parent_id?: number;
}

// API functions
export const fetchCategories = categoriesApi.getCategories;
export const fetchCategoryTree = categoriesApi.getCategoryTree;

// Hooks
export function useListCategories(
  params?: CategoryListParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: categoryKeys.list(params),
    queryFn: () => fetchCategories(),
    staleTime: options?.staleTime ?? 15 * 60 * 1000, // 15 minutes - categories change rarely
    gcTime: options?.cacheTime ?? 30 * 60 * 1000, // 30 minutes
    enabled: options?.enabled ?? true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useListCategoryTree(
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<CategoryWithChildren[], Error> {
  return useQuery({
    queryKey: categoryKeys.tree(),
    queryFn: fetchCategoryTree,
    staleTime: options?.staleTime ?? 15 * 60 * 1000, // 15 minutes
    gcTime: options?.cacheTime ?? 30 * 60 * 1000, // 30 minutes
    enabled: options?.enabled ?? true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}