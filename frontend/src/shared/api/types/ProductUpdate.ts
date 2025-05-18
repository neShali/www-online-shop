import type { ProductVariantCreate } from './ProductVariantCreate';

export type ProductUpdate = {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  /**
   * @default true
   */
  is_active?: boolean | null;
  category_id?: number | null;
  image_url?: string | null;
  variants?: ProductVariantCreate[] | null;
};
