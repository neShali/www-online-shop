import type { BodyChangePassword } from '../BodyChangePassword';
import type { HTTPValidationError } from '../HTTPValidationError';
import type { User } from '../User';

/**
 * @description Successful Response
 */
export type ChangePassword200 = User;

/**
 * @description Validation Error
 */
export type ChangePassword422 = HTTPValidationError;

export type ChangePasswordMutationRequest = BodyChangePassword;

export type ChangePasswordMutationResponse = ChangePassword200;

export type ChangePasswordMutation = {
  Response: ChangePassword200;
  Request: ChangePasswordMutationRequest;
  Errors: ChangePassword422;
};
