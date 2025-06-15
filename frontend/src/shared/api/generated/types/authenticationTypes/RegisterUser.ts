import type { HTTPValidationError } from '../HTTPValidationError';
import type { User } from '../User';
import type { UserCreate } from '../UserCreate';

/**
 * @description Successful Response
 */
export type RegisterUser200 = User;

/**
 * @description Validation Error
 */
export type RegisterUser422 = HTTPValidationError;

export type RegisterUserMutationRequest = UserCreate;

export type RegisterUserMutationResponse = RegisterUser200;

export type RegisterUserMutation = {
  Response: RegisterUser200;
  Request: RegisterUserMutationRequest;
  Errors: RegisterUser422;
};
