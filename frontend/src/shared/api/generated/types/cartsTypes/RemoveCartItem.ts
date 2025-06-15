import type { CartItem } from '../CartItem';
import type { HTTPValidationError } from '../HTTPValidationError';

export type RemoveCartItemPathParams = {
  /**
   * @type integer
   */
  item_id: number;
};

/**
 * @description Successful Response
 */
export type RemoveCartItem200 = CartItem;

/**
 * @description Validation Error
 */
export type RemoveCartItem422 = HTTPValidationError;

export type RemoveCartItemMutationResponse = RemoveCartItem200;

export type RemoveCartItemMutation = {
  Response: RemoveCartItem200;
  PathParams: RemoveCartItemPathParams;
  Errors: RemoveCartItem422;
};
