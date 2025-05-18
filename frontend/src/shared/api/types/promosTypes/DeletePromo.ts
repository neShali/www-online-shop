import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';

export type DeletePromoPathParams = {
  /**
   * @type integer
   */
  promo_id: number;
};

/**
 * @description Successful Response
 */
export type DeletePromo200 = Promo;

/**
 * @description Validation Error
 */
export type DeletePromo422 = HTTPValidationError;

export type DeletePromoMutationResponse = DeletePromo200;

export type DeletePromoMutation = {
  Response: DeletePromo200;
  PathParams: DeletePromoPathParams;
  Errors: DeletePromo422;
};
