import type { User } from '../User';

/**
 * @description Successful Response
 */
export type ReadUsersMe200 = User;

export type ReadUsersMeQueryResponse = ReadUsersMe200;

export type ReadUsersMeQuery = {
  Response: ReadUsersMe200;
  Errors: any;
};
