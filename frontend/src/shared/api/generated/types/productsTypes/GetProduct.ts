import type { HTTPValidationError } from '../HTTPValidationError';
import type { Product } from '../Product';

export type GetProductPathParams = {
  /**
   * @type integer
   */
  product_id: number;
};

/**
 * @description Successful Response
 */
export type GetProduct200 = Product;

/**
 * @description Validation Error
 */
export type GetProduct422 = HTTPValidationError;

export type GetProductQueryResponse = GetProduct200;

export type GetProductQuery = {
  Response: GetProduct200;
  PathParams: GetProductPathParams;
  Errors: GetProduct422;
};
