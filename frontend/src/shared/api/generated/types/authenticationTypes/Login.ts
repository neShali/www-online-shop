import type { BodyLogin } from '../BodyLogin';
import type { HTTPValidationError } from '../HTTPValidationError';
import type { Token } from '../Token';

/**
 * @description Successful Response
 */
export type Login200 = Token;

/**
 * @description Validation Error
 */
export type Login422 = HTTPValidationError;

export type LoginMutationRequest = BodyLogin;

export type LoginMutationResponse = Login200;

export type LoginMutation = {
  Response: Login200;
  Request: LoginMutationRequest;
  Errors: Login422;
};
