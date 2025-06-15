import type { HTTPValidationError } from '../HTTPValidationError';
import type { Review } from '../Review';
import type { ReviewCreate } from '../ReviewCreate';

/**
 * @description Successful Response
 */
export type CreateReview200 = Review;

/**
 * @description Validation Error
 */
export type CreateReview422 = HTTPValidationError;

export type CreateReviewMutationRequest = ReviewCreate;

export type CreateReviewMutationResponse = CreateReview200;

export type CreateReviewMutation = {
  Response: CreateReview200;
  Request: CreateReviewMutationRequest;
  Errors: CreateReview422;
};
