export type UserCreate = {
  /**
   * @type string, email
   */
  email: string;
  /**
   * @type string
   */
  username: string;
  /**
   * @default true
   */
  is_active?: boolean | null;
  /**
   * @default false
   */
  is_superuser?: boolean | null;
  /**
   * @type string
   */
  password: string;
};
