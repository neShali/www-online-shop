export type ProductVariant = {
  /**
   * @type string
   */
  size: string;
  /**
   * @type string
   */
  color: string;
  color_hex?: string | null;
  /**
   * @default 0
   * @type integer | undefined
   */
  stock?: number;
  sku?: string | null;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type integer
   */
  product_id: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
};
