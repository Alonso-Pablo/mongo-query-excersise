import * as mongoDB from "mongodb";

export const collections: {
  shippings?: mongoDB.Collection,
  shippingOrders?: mongoDB.Collection,
} = {}

export let database: mongoDB.Db

export async function connectToDatabase () {
  const mongoUri = process.env.MONGO_URI as string;
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(mongoUri);
          
  await client.connect();

  const mongoDBName = process.env.MONGO_DB_NAME as string;
  const db: mongoDB.Db = client.db(mongoDBName);
  console.log(`  [MongoDB] Successfully connected to database: ${db.databaseName}`);
 
  const mongoShippingsCollectionName = process.env.MONGO_SHIPPINGS_COLLECTION_NAME as string;
  const shippingsCollection: mongoDB.Collection = db.collection(mongoShippingsCollectionName);


  collections.shippings = shippingsCollection;

  console.log(`  [MongoDB] Successfully connected to database: ${db.databaseName} and collection: ${shippingsCollection.collectionName}`);
}
