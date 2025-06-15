import type { HTTPValidationError } from '../HTTPValidationError';
import type { Product } from '../Product';
import type { ProductUpdate } from '../ProductUpdate';

export type UpdateProductPathParams = {
  /**
   * @type integer
   */
  product_id: number;
};

/**
 * @description Successful Response
 */
export type UpdateProduct200 = Product;

/**
 * @description Validation Error
 */
export type UpdateProduct422 = HTTPValidationError;

export type UpdateProductMutationRequest = ProductUpdate;

export type UpdateProductMutationResponse = UpdateProduct200;

export type UpdateProductMutation = {
  Response: UpdateProduct200;
  Request: UpdateProductMutationRequest;
  PathParams: UpdateProductPathParams;
  Errors: UpdateProduct422;
};
