import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import { ExpectedResult } from '../models/expected-result';

export const consultRouter = express.Router();

consultRouter.use(express.json());

consultRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const results = (await collections.shippings?.aggregate([
      {
        "$lookup": {
          "from": "shipping_orders",
          "localField": "shipping_order_id",
          "foreignField": "_id",
          "as": "shipping_orders_docs"
        },
        
      },
      {
        "$unwind": "$shipping_orders_docs"
      },
      {
        "$project": {
          "status_shipping": "$status",
          "year": {
            "$year": {
              "$toDate": {
                "$multiply": [
                  {
                    "$toDecimal": "$shipping_orders_docs.created_time",
                    
                  },
                  1000
                ]
              }
            }
          },
          "week": {
            "$week": {
              "$toDate": {
                "$multiply": [
                  {
                    "$toDecimal": "$shipping_orders_docs.created_time",
                    
                  },
                  1000
                ]
              }
            }
          },
          "total_amount": "$shipping_orders_docs.total_amount",
          
        },
        
      },
      {
        "$group": {
          _id: "$week",
          "year": {
            $first: "$year"
          },
          "status_shipping": {
            $first: "$status_shipping"
          },
          "count": {
            $sum: 1
          },
          "total_amount": {
            $sum: "$total_amount"
          },
          
        }
      },
      {
        "$project": {
          "_id": 0,
          "status_shipping": "$status_shipping",
          "year": "$year",
          "week": "$_id",
          "count": "$count",
          "total_amount": 1,
        }
      }
    ]).toArray()) as unknown as ExpectedResult[];

    res.status(200).send(results);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});