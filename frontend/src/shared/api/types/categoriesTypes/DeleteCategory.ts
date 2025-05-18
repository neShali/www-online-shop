import type { Category } from '../Category';
import type { HTTPValidationError } from '../HTTPValidationError';

export type DeleteCategoryPathParams = {
  /**
   * @type integer
   */
  category_id: number;
};

/**
 * @description Successful Response
 */
export type DeleteCategory200 = Category;

/**
 * @description Validation Error
 */
export type DeleteCategory422 = HTTPValidationError;

export type DeleteCategoryMutationResponse = DeleteCategory200;

export type DeleteCategoryMutation = {
  Response: DeleteCategory200;
  PathParams: DeleteCategoryPathParams;
  Errors: DeleteCategory422;
};
