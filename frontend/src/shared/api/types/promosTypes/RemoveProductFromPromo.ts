import type { HTTPValidationError } from '../HTTPValidationError';

export type RemoveProductFromPromoPathParams = {
  /**
   * @type integer
   */
  promo_id: number;
  /**
   * @type integer
   */
  product_id: number;
};

/**
 * @description Successful Response
 */
export type RemoveProductFromPromo200 = unknown;

/**
 * @description Validation Error
 */
export type RemoveProductFromPromo422 = HTTPValidationError;

export type RemoveProductFromPromoMutationResponse = RemoveProductFromPromo200;

export type RemoveProductFromPromoMutation = {
  Response: RemoveProductFromPromo200;
  PathParams: RemoveProductFromPromoPathParams;
  Errors: RemoveProductFromPromo422;
};
