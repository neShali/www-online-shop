import { useQuery, useMutation, useQueryClient, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { cartApi } from '../services/api';
import type { Cart, CartItem, CartItemCreate, CartItemUpdate } from '../types';

// Query key factories
export const cartKeys = {
  all: ['cart'] as const,
  me: () => [...cartKeys.all, 'me'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
};

// API functions
export const fetchMyCart = cartApi.getCart;
export const addItemToCart = cartApi.addToCart;
export const updateCartItem = (itemId: number, updates: CartItemUpdate) => cartApi.updateCartItem(itemId, updates);
export const removeCartItem = (itemId: number) => cartApi.removeCartItem(itemId);
export const clearCart = cartApi.clearCart;

// Hooks
export function useGetMyCart(
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  }
): UseQueryResult<Cart, Error> {
  return useQuery({
    queryKey: cartKeys.me(),
    queryFn: fetchMyCart,
    staleTime: options?.staleTime ?? 30 * 1000, // 30 seconds - cart data should be fresh
    gcTime: options?.cacheTime ?? 5 * 60 * 1000, // 5 minutes
    enabled: options?.enabled ?? true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

export function useAddItemToCart(): UseMutationResult<CartItem, Error, CartItemCreate> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      // Invalidate cart cache to refetch
      queryClient.invalidateQueries({ queryKey: cartKeys.me() });
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error);
    },
  });
}

export function useUpdateCartItem(): UseMutationResult<CartItem, Error, { itemId: number; updates: CartItemUpdate }> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ itemId, updates }) => updateCartItem(itemId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.me() });
    },
    onError: (error) => {
      console.error('Failed to update cart item:', error);
    },
  });
}

export function useRemoveCartItem(): UseMutationResult<CartItem, Error, number> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.me() });
    },
    onError: (error) => {
      console.error('Failed to remove cart item:', error);
    },
  });
}

export function useClearCart(): UseMutationResult<Cart, Error, void> {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      // Invalidate cart cache to refetch
      queryClient.invalidateQueries({ queryKey: cartKeys.me() });
    },
    onError: (error) => {
      console.error('Failed to clear cart:', error);
    },
  });
}