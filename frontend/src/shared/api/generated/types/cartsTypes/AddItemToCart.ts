import type { CartItem } from '../CartItem';
import type { CartItemCreate } from '../CartItemCreate';
import type { HTTPValidationError } from '../HTTPValidationError';

/**
 * @description Successful Response
 */
export type AddItemToCart200 = CartItem;

/**
 * @description Validation Error
 */
export type AddItemToCart422 = HTTPValidationError;

export type AddItemToCartMutationRequest = CartItemCreate;

export type AddItemToCartMutationResponse = AddItemToCart200;

export type AddItemToCartMutation = {
  Response: AddItemToCart200;
  Request: AddItemToCartMutationRequest;
  Errors: AddItemToCart422;
};
