import {OnmsError} from '../api/OnmsError';

/**
 * A Grafana error object.
 * @module GrafanaError
 */
export class GrafanaError extends OnmsError {
  /**
   * The request options (configuration).
   * @hidden
   */
  private config: any;

  /**
   * Construct a new Grafana error.
   * @param message The status message associated with the result.
   * @param code The response code of the response.
   * @param options The request options (configuration).
   * @param data The payload of the response.
   */
  constructor(message: string, code?: number, options?: any, data?: any) {
    super(message, code, options, data);
    this.config = options;
  }

}
