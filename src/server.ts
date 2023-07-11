import * as dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express'
import cors from 'cors';
import { connectToDatabase } from './services/database.service';
import { consultRouter } from './routes/consult.router';
const app = express()
const port = process.env.PORT

connectToDatabase()
  .then(() => {
    app.use(cors())
    app.get('/', (req: Request, res: Response) => {
      res.send('It works! Go to /consult')
    })
    app.use("/consult", consultRouter);
    app.listen(port, () => {
      console.log(`Server started at Port: ${port}`);
    })
  })
