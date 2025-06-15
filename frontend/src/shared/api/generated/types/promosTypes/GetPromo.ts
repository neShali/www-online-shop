import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';

export type GetPromoPathParams = {
  /**
   * @type integer
   */
  promo_id: number;
};

/**
 * @description Successful Response
 */
export type GetPromo200 = Promo;

/**
 * @description Validation Error
 */
export type GetPromo422 = HTTPValidationError;

export type GetPromoQueryResponse = GetPromo200;

export type GetPromoQuery = {
  Response: GetPromo200;
  PathParams: GetPromoPathParams;
  Errors: GetPromo422;
};
