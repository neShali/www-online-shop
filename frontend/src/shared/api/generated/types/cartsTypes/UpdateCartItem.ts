import type { CartItem } from '../CartItem';
import type { CartItemUpdate } from '../CartItemUpdate';
import type { HTTPValidationError } from '../HTTPValidationError';

export type UpdateCartItemPathParams = {
  /**
   * @type integer
   */
  item_id: number;
};

/**
 * @description Successful Response
 */
export type UpdateCartItem200 = CartItem;

/**
 * @description Validation Error
 */
export type UpdateCartItem422 = HTTPValidationError;

export type UpdateCartItemMutationRequest = CartItemUpdate;

export type UpdateCartItemMutationResponse = UpdateCartItem200;

export type UpdateCartItemMutation = {
  Response: UpdateCartItem200;
  Request: UpdateCartItemMutationRequest;
  PathParams: UpdateCartItemPathParams;
  Errors: UpdateCartItem422;
};
