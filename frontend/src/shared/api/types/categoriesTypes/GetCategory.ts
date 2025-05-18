import type { Category } from '../Category';
import type { HTTPValidationError } from '../HTTPValidationError';

export type GetCategoryPathParams = {
  /**
   * @type integer
   */
  category_id: number;
};

/**
 * @description Successful Response
 */
export type GetCategory200 = Category;

/**
 * @description Validation Error
 */
export type GetCategory422 = HTTPValidationError;

export type GetCategoryQueryResponse = GetCategory200;

export type GetCategoryQuery = {
  Response: GetCategory200;
  PathParams: GetCategoryPathParams;
  Errors: GetCategory422;
};
