import type { Category } from '../Category';
import type { CategoryUpdate } from '../CategoryUpdate';
import type { HTTPValidationError } from '../HTTPValidationError';

export type UpdateCategoryPathParams = {
  /**
   * @type integer
   */
  category_id: number;
};

/**
 * @description Successful Response
 */
export type UpdateCategory200 = Category;

/**
 * @description Validation Error
 */
export type UpdateCategory422 = HTTPValidationError;

export type UpdateCategoryMutationRequest = CategoryUpdate;

export type UpdateCategoryMutationResponse = UpdateCategory200;

export type UpdateCategoryMutation = {
  Response: UpdateCategory200;
  Request: UpdateCategoryMutationRequest;
  PathParams: UpdateCategoryPathParams;
  Errors: UpdateCategory422;
};
