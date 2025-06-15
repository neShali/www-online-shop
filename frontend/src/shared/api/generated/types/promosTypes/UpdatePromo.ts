import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';
import type { PromoUpdate } from '../PromoUpdate';

export type UpdatePromoPathParams = {
  /**
   * @type integer
   */
  promo_id: number;
};

/**
 * @description Successful Response
 */
export type UpdatePromo200 = Promo;

/**
 * @description Validation Error
 */
export type UpdatePromo422 = HTTPValidationError;

export type UpdatePromoMutationRequest = PromoUpdate;

export type UpdatePromoMutationResponse = UpdatePromo200;

export type UpdatePromoMutation = {
  Response: UpdatePromo200;
  Request: UpdatePromoMutationRequest;
  PathParams: UpdatePromoPathParams;
  Errors: UpdatePromo422;
};
