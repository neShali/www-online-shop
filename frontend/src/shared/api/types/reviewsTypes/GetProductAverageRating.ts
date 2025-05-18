import type { HTTPValidationError } from '../HTTPValidationError';

export type GetProductAverageRatingPathParams = {
  /**
   * @type integer
   */
  product_id: number;
};

/**
 * @description Successful Response
 */
export type GetProductAverageRating200 = unknown;

/**
 * @description Validation Error
 */
export type GetProductAverageRating422 = HTTPValidationError;

export type GetProductAverageRatingQueryResponse = GetProductAverageRating200;

export type GetProductAverageRatingQuery = {
  Response: GetProductAverageRating200;
  PathParams: GetProductAverageRatingPathParams;
  Errors: GetProductAverageRating422;
};
