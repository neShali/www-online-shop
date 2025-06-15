import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';

export type ListPromosQueryParams = {
  /**
   * @default 0
   * @type integer | undefined
   */
  skip?: number;
  /**
   * @default 100
   * @type integer | undefined
   */
  limit?: number;
  /**
   * @default false
   * @type boolean | undefined
   */
  active_only?: boolean;
};

/**
 * @description Successful Response
 */
export type ListPromos200 = Promo[];

/**
 * @description Validation Error
 */
export type ListPromos422 = HTTPValidationError;

export type ListPromosQueryResponse = ListPromos200;

export type ListPromosQuery = {
  Response: ListPromos200;
  QueryParams: ListPromosQueryParams;
  Errors: ListPromos422;
};
