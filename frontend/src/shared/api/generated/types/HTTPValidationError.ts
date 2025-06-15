import type { ValidationError } from './ValidationError';

export type HTTPValidationError = {
  /**
   * @type array | undefined
   */
  detail?: ValidationError[];
};
