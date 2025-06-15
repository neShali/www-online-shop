export type ProductVariantCreate = {
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
};
