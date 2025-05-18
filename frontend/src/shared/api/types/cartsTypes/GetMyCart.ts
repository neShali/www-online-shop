import type { Cart } from '../Cart';

/**
 * @description Successful Response
 */
export type GetMyCart200 = Cart;

export type GetMyCartQueryResponse = GetMyCart200;

export type GetMyCartQuery = {
  Response: GetMyCart200;
  Errors: any;
};
