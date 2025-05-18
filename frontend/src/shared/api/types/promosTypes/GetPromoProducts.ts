import type { HTTPValidationError } from '../HTTPValidationError';
import type { ProductPromo } from '../ProductPromo';

export type GetPromoProductsPathParams = {
  /**
   * @type integer
   */
  promo_id: number;
};

/**
 * @description Successful Response
 */
export type GetPromoProducts200 = ProductPromo[];

/**
 * @description Validation Error
 */
export type GetPromoProducts422 = HTTPValidationError;

export type GetPromoProductsQueryResponse = GetPromoProducts200;

export type GetPromoProductsQuery = {
  Response: GetPromoProducts200;
  PathParams: GetPromoProductsPathParams;
  Errors: GetPromoProducts422;
};
