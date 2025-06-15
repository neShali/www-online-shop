import type { ProductVariant } from './ProductVariant';

export type Product = {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  /**
   * @default true
   */
  is_active?: boolean | null;
  category_id?: number | null;
  image_url?: string | null;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
  /**
   * @type array | undefined
   */
  variants?: ProductVariant[];
};
