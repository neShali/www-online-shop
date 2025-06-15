export type Category = {
  name?: string | null;
  description?: string | null;
  parent_id?: number | null;
  /**
   * @type integer
   */
  id: number | null;
  /**
   * @type string, date-time
   */
  created_at?: string;
  updated_at?: string | null;
};
