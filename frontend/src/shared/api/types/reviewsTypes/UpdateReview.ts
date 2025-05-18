import type { HTTPValidationError } from '../HTTPValidationError';
import type { Review } from '../Review';
import type { ReviewUpdate } from '../ReviewUpdate';

export type UpdateReviewPathParams = {
  /**
   * @type integer
   */
  review_id: number;
};

/**
 * @description Successful Response
 */
export type UpdateReview200 = Review;

/**
 * @description Validation Error
 */
export type UpdateReview422 = HTTPValidationError;

export type UpdateReviewMutationRequest = ReviewUpdate;

export type UpdateReviewMutationResponse = UpdateReview200;

export type UpdateReviewMutation = {
  Response: UpdateReview200;
  Request: UpdateReviewMutationRequest;
  PathParams: UpdateReviewPathParams;
  Errors: UpdateReview422;
};
