export type ReviewCreate = {
  /**
   * @type integer
   */
  product_id: number;
  /**
   * @type number
   */
  rating: number;
  comment?: string | null;
};
