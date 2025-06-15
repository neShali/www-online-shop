export type CartItemCreate = {
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
};
