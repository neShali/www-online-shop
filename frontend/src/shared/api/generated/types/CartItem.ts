export type CartItem = {
  /**
   * @type integer
   */
  product_id: number;
  /**
   * @type integer
   */
  variant_id: number;
  /**
   * @default 1
   * @type integer | undefined
   */
  quantity?: number;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type integer
   */
  cart_id: number;
  /**
   * @type number
   */
  unit_price: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
  /**
   * @type string
   */
  variant_size: string;
  /**
   * @type string
   */
  variant_color: string;
};
