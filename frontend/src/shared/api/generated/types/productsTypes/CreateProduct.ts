import type { HTTPValidationError } from '../HTTPValidationError';
import type { Product } from '../Product';
import type { ProductCreate } from '../ProductCreate';

/**
 * @description Successful Response
 */
export type CreateProduct200 = Product;

/**
 * @description Validation Error
 */
export type CreateProduct422 = HTTPValidationError;

export type CreateProductMutationRequest = ProductCreate;

export type CreateProductMutationResponse = CreateProduct200;

export type CreateProductMutation = {
  Response: CreateProduct200;
  Request: CreateProductMutationRequest;
  Errors: CreateProduct422;
};
