import type { HTTPValidationError } from '../HTTPValidationError';
import type { Review } from '../Review';

export type DeleteReviewPathParams = {
  /**
   * @type integer
   */
  review_id: number;
};

/**
 * @description Successful Response
 */
export type DeleteReview200 = Review;

/**
 * @description Validation Error
 */
export type DeleteReview422 = HTTPValidationError;

export type DeleteReviewMutationResponse = DeleteReview200;

export type DeleteReviewMutation = {
  Response: DeleteReview200;
  PathParams: DeleteReviewPathParams;
  Errors: DeleteReview422;
};
