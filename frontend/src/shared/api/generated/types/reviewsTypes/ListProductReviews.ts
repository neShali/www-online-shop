import type { HTTPValidationError } from '../HTTPValidationError';
import type { Review } from '../Review';

export type ListProductReviewsPathParams = {
  /**
   * @type integer
   */
  product_id: number;
};

export type ListProductReviewsQueryParams = {
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
export type ListProductReviews200 = Review[];

/**
 * @description Validation Error
 */
export type ListProductReviews422 = HTTPValidationError;

export type ListProductReviewsQueryResponse = ListProductReviews200;

export type ListProductReviewsQuery = {
  Response: ListProductReviews200;
  PathParams: ListProductReviewsPathParams;
  QueryParams: ListProductReviewsQueryParams;
  Errors: ListProductReviews422;
};
