import type { HTTPValidationError } from '../HTTPValidationError';
import type { User } from '../User';
import type { UserUpdate } from '../UserUpdate';

/**
 * @description Successful Response
 */
export type UpdateUserMe200 = User;

/**
 * @description Validation Error
 */
export type UpdateUserMe422 = HTTPValidationError;

export type UpdateUserMeMutationRequest = UserUpdate;

export type UpdateUserMeMutationResponse = UpdateUserMe200;

export type UpdateUserMeMutation = {
  Response: UpdateUserMe200;
  Request: UpdateUserMeMutationRequest;
  Errors: UpdateUserMe422;
};
