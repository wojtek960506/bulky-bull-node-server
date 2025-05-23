import express, { Response, Request} from 'express';
// import mongoose from 'mongoose';
// import { config } from './config';



const app = express();

app.use(express.json());

// await mongoose.connect(db_connection_string)

// parsing body of request if it is in json format
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('It is time for bulky season')
})

export function start() {
  app.listen(8080, () => {
    console.log('Bulky Bull bulking on port 8080')
  });
};
