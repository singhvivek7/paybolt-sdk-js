import { IPayinRequest, IPayinResponse, IPayinStatusResponse } from './types';

export class PayBolt {
  private readonly PAYIN_URL =
    'https://api.paybolt.in/api/v1/payments/payin/create';

  private readonly PAYIN_STATUS =
    'https://api.paybolt.in/api/v1/payments/payin/status';

  /**
   * Constructor for the PayBolt class.
   * @param config An object with the 'clientId' and 'clientSecret' for the PayBolt API.
   */
  constructor(
    private readonly config: { clientId: string; clientSecret: string }
  ) {}

  private createHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.set(
      'Authorization',
      'Basic ' + btoa(`${this.config.clientId}:${this.config.clientSecret}`)
    );
    return headers;
  }

  public payin = {
    /**
     * Creates a new payment using the given payload.
     * @param payload The information for the new payment.
     * @returns The response from the server.
     * @throws If the server responds with a status code outside of 200-299.
     */
    createPayment: async (payload: IPayinRequest): Promise<IPayinResponse> => {
      const res = await fetch(this.PAYIN_URL, {
        method: 'POST',
        headers: this.createHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(
          `Something went wrong: ${res.status} - ${errorDetails}`
        );
      }

      const data = await res.json();
      return data;
    },

    /**
     * Retrieves the status of the payment with the given order id.
     * @param orderId The ID of the order to retrieve the status of.
     * @returns The status of the payment.
     * @throws If the server responds with a status code outside of 200-299.
     */
    checkStatus: async (orderId: string): Promise<IPayinStatusResponse> => {
      const res = await fetch(this.PAYIN_STATUS, {
        method: 'POST',
        headers: this.createHeaders(),
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(
          `Something went wrong: ${res.status} - ${errorDetails}`
        );
      }

      const data = await res.json();
      return data;
    },
  };
}
