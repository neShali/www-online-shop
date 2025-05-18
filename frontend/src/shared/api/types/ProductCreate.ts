import type { ProductVariantCreate } from './ProductVariantCreate';

export type ProductCreate = {
  /**
   * @type string
   */
  name: string;
  description?: string | null;
  /**
   * @type number
   */
  price: number;
  /**
   * @default true
   */
  is_active?: boolean | null;
  /**
   * @type integer
   */
  category_id: number;
  image_url?: string | null;
  /**
   * @type array | undefined
   */
  variants?: ProductVariantCreate[];
};
