import type { Product } from './Product';

export type ProductList = {
  /**
   * @type array
   */
  items: Product[];
  /**
   * @type integer
   */
  total: number;
  /**
   * @type integer
   */
  page: number;
  /**
   * @type integer
   */
  size: number;
  /**
   * @type integer
   */
  pages: number;
};
