export type Promo = {
  code?: string | null;
  discount_percent?: number | null;
  discount_amount?: number | null;
  min_purchase_amount?: number | null;
  /**
   * @default true
   */
  is_active?: boolean | null;
  start_date?: string | null;
  end_date?: string | null;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
};
