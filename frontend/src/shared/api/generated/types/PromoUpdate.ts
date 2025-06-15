export type PromoUpdate = {
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
};
