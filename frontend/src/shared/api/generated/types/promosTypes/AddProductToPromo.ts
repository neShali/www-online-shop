import type { HTTPValidationError } from '../HTTPValidationError';
import type { ProductPromo } from '../ProductPromo';
import type { ProductPromoCreate } from '../ProductPromoCreate';

/**
 * @description Successful Response
 */
export type AddProductToPromo200 = ProductPromo;

/**
 * @description Validation Error
 */
export type AddProductToPromo422 = HTTPValidationError;

export type AddProductToPromoMutationRequest = ProductPromoCreate;

export type AddProductToPromoMutationResponse = AddProductToPromo200;

export type AddProductToPromoMutation = {
  Response: AddProductToPromo200;
  Request: AddProductToPromoMutationRequest;
  Errors: AddProductToPromo422;
};
