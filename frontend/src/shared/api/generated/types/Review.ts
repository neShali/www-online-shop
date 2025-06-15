export type Review = {
  product_id?: number | null;
  rating?: number | null;
  comment?: string | null;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type integer
   */
  user_id: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
};
