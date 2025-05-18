import type { CartItem } from './CartItem';

export type Cart = {
  /**
   * @default true
   * @type boolean | undefined
   */
  is_active?: boolean;
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
  /**
   * @type array | undefined
   */
  items?: CartItem[];
};
