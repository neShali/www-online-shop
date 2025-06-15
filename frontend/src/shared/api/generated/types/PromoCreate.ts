export type PromoCreate = {
  /**
   * @type string
   */
  code: string;
  discount_percent?: number | null;
  discount_amount?: number | null;
  min_purchase_amount?: number | null;
  /**
   * @default true
   */
  is_active?: boolean | null;
  /**
   * @type string, date-time
   */
  start_date: string;
  /**
   * @type string, date-time
   */
  end_date: string;
};
