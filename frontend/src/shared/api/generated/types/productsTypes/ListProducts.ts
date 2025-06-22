import type { HTTPValidationError } from '../HTTPValidationError';
import type { ProductList } from '../ProductList';

export type ListProductsQueryParams = {
  /**
   * @description Page number
   * @minLength 1
   * @default 1
   * @type integer | undefined
   */
  page?: number;
  /**
   * @description Page size
   * @minLength 1
   * @maxLength 100
   * @default 10
   * @type integer | undefined
   */
  size?: number;
  /**
   * @description Filter by category ID
   */
  category_id?: number | null;
  /**
   * @description Minimum price
   */
  min_price?: number | null;
  /**
   * @description Maximum price
   */
  max_price?: number | null;
  /**
   * @description Search term for name or description
   */
  search?: string | null;

  /** Filter by variant size (e.g. "M") */
  variant_size?: string | null;

  /** Filter by variant color (e.g. "red") */
  variant_color?: string | null;
};

/**
 * @description Successful Response
 */
export type ListProducts200 = ProductList;

/**
 * @description Validation Error
 */
export type ListProducts422 = HTTPValidationError;

export type ListProductsQueryResponse = ListProducts200;

export type ListProductsQuery = {
  Response: ListProducts200;
  QueryParams: ListProductsQueryParams;
  Errors: ListProducts422;
};
