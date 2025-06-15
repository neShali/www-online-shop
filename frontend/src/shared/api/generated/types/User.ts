export type User = {
  email?: string | null;
  username?: string | null;
  /**
   * @default true
   */
  is_active?: boolean | null;
  /**
   * @default false
   */
  is_superuser?: boolean | null;
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
