export type CategoryWithChildren = {
  name?: string | null;
  description?: string | null;
  parent_id?: number | null;
  /**
   * @type integer
   */
  id: number;
  /**
   * @type string, date-time
   */
  created_at: string;
  updated_at?: string | null;
  /**
   * @type array | undefined
   */
  children?: CategoryWithChildren[];
};
