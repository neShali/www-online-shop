export type CategoryCreate = {
  /**
   * @type string
   */
  name: string;
  description?: string | null;
  parent_id?: number | null;
};
