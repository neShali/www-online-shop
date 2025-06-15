import type { HTTPValidationError } from '../HTTPValidationError';
import type { Product } from '../Product';

export type DeleteProductPathParams = {
  /**
   * @type integer
   */
  product_id: number;
};

/**
 * @description Successful Response
 */
export type DeleteProduct200 = Product;

/**
 * @description Validation Error
 */
export type DeleteProduct422 = HTTPValidationError;

export type DeleteProductMutationResponse = DeleteProduct200;

export type DeleteProductMutation = {
  Response: DeleteProduct200;
  PathParams: DeleteProductPathParams;
  Errors: DeleteProduct422;
};
