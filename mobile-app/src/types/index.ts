// Типы пользователя
export interface User {
  id: number;
  username?: string;
  email?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

// Типы продуктов
export interface ProductVariant {
  id: number;
  size?: string;
  color?: string;
  price?: number;
  stock?: number;
  product_id: number;
}

export interface Product {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  is_active?: boolean;
  category_id?: number;
  image_url?: string;
  created_at: string;
  updated_at?: string;
  variants?: ProductVariant[];
}

export interface ProductList {
  items: Product[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Типы категорий
export interface Category {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
  children?: Category[];
}

export interface CategoryWithChildren {
  id: number;
  name: string;
  description?: string;
  parent_id?: number;
  children: CategoryWithChildren[];
}

// Типы корзины
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  unit_price: number;
  variant_size?: string;
  variant_color?: string;
  created_at: string;
  updated_at?: string;
}

export interface Cart {
  id: number;
  user_id: number;
  is_active: boolean;
  items: CartItem[];
  total_price: number;
  created_at: string;
  updated_at?: string;
}

export interface CartItemCreate {
  product_id: number;
  variant_id: number;
  quantity: number;
}

export interface CartItemUpdate {
  quantity?: number;
}

// Типы промоакций
export interface Promo {
  id: number;
  code: string;
  discount_percent?: number;
  discount_amount?: number;
  min_purchase_amount?: number;
  is_active: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at?: string;
}

// Типы отзывов
export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at?: string;
  user?: User;
}

export interface ReviewCreate {
  product_id: number;
  rating: number;
  comment?: string;
}