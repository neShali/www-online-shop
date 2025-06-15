import type { Promo } from '../Promo';

/**
 * @description Successful Response
 */
export type ListActivePromos200 = Promo[];

export type ListActivePromosQueryResponse = ListActivePromos200;

export type ListActivePromosQuery = {
  Response: ListActivePromos200;
  Errors: any;
};
