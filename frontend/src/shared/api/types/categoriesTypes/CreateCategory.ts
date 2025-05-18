import type { Category } from '../Category';
import type { CategoryCreate } from '../CategoryCreate';
import type { HTTPValidationError } from '../HTTPValidationError';

/**
 * @description Successful Response
 */
export type CreateCategory200 = Category;

/**
 * @description Validation Error
 */
export type CreateCategory422 = HTTPValidationError;

export type CreateCategoryMutationRequest = CategoryCreate;

export type CreateCategoryMutationResponse = CreateCategory200;

export type CreateCategoryMutation = {
  Response: CreateCategory200;
  Request: CreateCategoryMutationRequest;
  Errors: CreateCategory422;
};
