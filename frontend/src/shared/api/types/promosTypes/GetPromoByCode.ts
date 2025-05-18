import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';

export type GetPromoByCodePathParams = {
  /**
   * @type string
   */
  code: string;
};

/**
 * @description Successful Response
 */
export type GetPromoByCode200 = Promo;

/**
 * @description Validation Error
 */
export type GetPromoByCode422 = HTTPValidationError;

export type GetPromoByCodeQueryResponse = GetPromoByCode200;

export type GetPromoByCodeQuery = {
  Response: GetPromoByCode200;
  PathParams: GetPromoByCodePathParams;
  Errors: GetPromoByCode422;
};
