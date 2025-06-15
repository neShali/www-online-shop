import type { Token } from '../Token';

/**
 * @description Successful Response
 */
export type RefreshToken200 = Token;

export type RefreshTokenMutationResponse = RefreshToken200;

export type RefreshTokenMutation = {
  Response: RefreshToken200;
  Errors: any;
};
