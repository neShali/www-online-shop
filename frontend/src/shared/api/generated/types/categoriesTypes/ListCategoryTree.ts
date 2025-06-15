import type { CategoryWithChildren } from '../CategoryWithChildren';

/**
 * @description Successful Response
 */
export type ListCategoryTree200 = CategoryWithChildren[];

export type ListCategoryTreeQueryResponse = ListCategoryTree200;

export type ListCategoryTreeQuery = {
  Response: ListCategoryTree200;
  Errors: any;
};
