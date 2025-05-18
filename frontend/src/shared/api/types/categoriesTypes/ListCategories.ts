import type { Category } from '../Category';
import type { HTTPValidationError } from '../HTTPValidationError';

export type ListCategoriesQueryParams = {
  /**
   * @default 0
   * @type integer | undefined
   */
  skip?: number;
  /**
   * @default 100
   * @type integer | undefined
   */
  limit?: number;
};

/**
 * @description Successful Response
 */
export type ListCategories200 = Category[];

/**
 * @description Validation Error
 */
export type ListCategories422 = HTTPValidationError;

export type ListCategoriesQueryResponse = ListCategories200;

export type ListCategoriesQuery = {
  Response: ListCategories200;
  QueryParams: ListCategoriesQueryParams;
  Errors: ListCategories422;
};
