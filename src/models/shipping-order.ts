import { ObjectId } from "mongodb";


export interface IShippingOrder {
  id?: ObjectId;
  total_amount: number;
  created_time: number,
}

export default class ShippingOrder {
  constructor(
    public shippingOrder: IShippingOrder,
  ) {}
}