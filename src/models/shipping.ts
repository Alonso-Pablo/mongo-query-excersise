import { ObjectId } from "mongodb";

export type ShippingStatus = 'pending' | 'transit' | 'sent';

export interface IShipping {
  id?: ObjectId;
  shipping_order_id: ObjectId;
  status: ShippingStatus,
}

export default class Shipping {
  constructor(
    public shipping: IShipping,
  ) {}
}
