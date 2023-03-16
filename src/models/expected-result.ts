import { ShippingStatus } from './shipping';

export interface ExpectedResult {
  status_shipping: ShippingStatus;
  year: number;
  week: number;
  count: number;
  total_amount: number;
}