import client from './client';
import type {
  User,
  LoginCredentials,
  RegisterData,
  Token,
  Product,
  ProductList,
  Category,
  CategoryWithChildren,
  Cart,
  CartItem,
  CartItemCreate,
  CartItemUpdate,
  Promo,
  Review,
  ReviewCreate,
} from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<Token> => {
    // OAuth2PasswordRequestForm expects form data format
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await client<Token>({
      method: 'POST',
      url: '/auth/login',
      data: formData.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data;
  },

  register: async (userData: RegisterData): Promise<User> => {
    const response = await client<User>({
      method: 'POST',
      url: '/auth/register',
      data: userData,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await client<User>({
      method: 'GET',
      url: '/auth/me',
    });
    return response.data;
  },

  refreshToken: async (): Promise<Token> => {
    const response = await client<Token>({
      method: 'POST',
      url: '/auth/refresh-token',
    });
    return response.data;
  },
};

export const productsApi = {
  getProducts: async (params?: {
    skip?: number;
    limit?: number;
    category_id?: number;
    search?: string;
  }): Promise<ProductList> => {
    const response = await client<ProductList>({
      method: 'GET',
      url: '/products',
      params,
    });
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await client<Product>({
      method: 'GET',
      url: `/products/${id}`,
    });
    return response.data;
  },
};

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await client<Category[]>({
      method: 'GET',
      url: '/categories',
    });
    return response.data;
  },

  getCategoryTree: async (): Promise<CategoryWithChildren[]> => {
    const response = await client<CategoryWithChildren[]>({
      method: 'GET',
      url: '/categories/tree',
    });
    return response.data;
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await client<Category>({
      method: 'GET',
      url: `/categories/${id}`,
    });
    return response.data;
  },
};

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await client<Cart>({
      method: 'GET',
      url: '/carts/me',
    });
    return response.data;
  },

  addToCart: async (item: CartItemCreate): Promise<CartItem> => {
    const response = await client<CartItem>({
      method: 'POST',
      url: '/carts/items',
      data: item,
    });
    return response.data;
  },

  updateCartItem: async (itemId: number, data: CartItemUpdate): Promise<CartItem> => {
    const response = await client<CartItem>({
      method: 'PUT',
      url: `/carts/items/${itemId}`,
      data,
    });
    return response.data;
  },

  removeCartItem: async (itemId: number): Promise<CartItem> => {
    const response = await client<CartItem>({
      method: 'DELETE',
      url: `/carts/items/${itemId}`,
    });
    return response.data;
  },

  clearCart: async (): Promise<Cart> => {
    const response = await client<Cart>({
      method: 'DELETE',
      url: '/carts/clear',
    });
    return response.data;
  },
};

export const promosApi = {
  getActivePromos: async (): Promise<Promo[]> => {
    const response = await client<Promo[]>({
      method: 'GET',
      url: '/promos/active',
    });
    return response.data;
  },

  getPromoByCode: async (code: string): Promise<Promo> => {
    const response = await client<Promo>({
      method: 'GET',
      url: `/promos/by-code/${code}`,
    });
    return response.data;
  },
};

export const reviewsApi = {
  getProductReviews: async (productId: number): Promise<Review[]> => {
    const response = await client<Review[]>({
      method: 'GET',
      url: `/reviews/product/${productId}`,
    });
    return response.data;
  },

  createReview: async (review: ReviewCreate): Promise<Review> => {
    const response = await client<Review>({
      method: 'POST',
      url: '/reviews',
      data: review,
    });
    return response.data;
  },

  getProductAverageRating: async (productId: number): Promise<{ average_rating: number; total_reviews: number }> => {
    const response = await client<{ average_rating: number; total_reviews: number }>({
      method: 'GET',
      url: `/reviews/product/${productId}/average`,
    });
    return response.data;
  },
};

// Export User type for backward compatibility
export type { User };

// Экспорт всех API
export const api = {
  auth: authApi,
  products: productsApi,
  categories: categoriesApi,
  cart: cartApi,
  promos: promosApi,
  reviews: reviewsApi,
};