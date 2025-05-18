import type { HTTPValidationError } from '../HTTPValidationError';
import type { Promo } from '../Promo';
import type { PromoCreate } from '../PromoCreate';

/**
 * @description Successful Response
 */
export type CreatePromo200 = Promo;

/**
 * @description Validation Error
 */
export type CreatePromo422 = HTTPValidationError;

export type CreatePromoMutationRequest = PromoCreate;

export type CreatePromoMutationResponse = CreatePromo200;

export type CreatePromoMutation = {
  Response: CreatePromo200;
  Request: CreatePromoMutationRequest;
  Errors: CreatePromo422;
};
