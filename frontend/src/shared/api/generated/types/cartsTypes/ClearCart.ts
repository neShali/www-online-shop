import type { Cart } from '../Cart';

/**
 * @description Successful Response
 */
export type ClearCart200 = Cart;

export type ClearCartMutationResponse = ClearCart200;

export type ClearCartMutation = {
  Response: ClearCart200;
  Errors: any;
};
