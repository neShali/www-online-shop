export type UserUpdate = {
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
  password?: string | null;
};
