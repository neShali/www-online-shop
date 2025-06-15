import type { HTTPValidationError } from '../HTTPValidationError';
import type { User } from '../User';
import type { UserUpdate } from '../UserUpdate';

export type UpdateUserBySuperuserPathParams = {
  user_id: unknown;
};

/**
 * @description Successful Response
 */
export type UpdateUserBySuperuser200 = User;

/**
 * @description Validation Error
 */
export type UpdateUserBySuperuser422 = HTTPValidationError;

export type UpdateUserBySuperuserMutationRequest = UserUpdate;

export type UpdateUserBySuperuserMutationResponse = UpdateUserBySuperuser200;

export type UpdateUserBySuperuserMutation = {
  Response: UpdateUserBySuperuser200;
  Request: UpdateUserBySuperuserMutationRequest;
  PathParams: UpdateUserBySuperuserPathParams;
  Errors: UpdateUserBySuperuser422;
};
