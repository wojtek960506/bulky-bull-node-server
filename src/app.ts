import express, { Response, Request} from 'express';
import { routeNotFound } from './middleware/routeNotFound';
import mongoose from 'mongoose';
import { config } from './config/config';
import { listUsers } from './controllers/usersController';

const app = express();

export const start = async () => {

  // for processing URL-encoded form data to make it available via req.body
  app.use(express.urlencoded())
  // for parsing incoming requests with JSON payload to make it available via req.body
  app.use(express.json());

  try {
    const connection = await mongoose.connect(config.DB_CONNECTION, config.DB_OPTIONS)
    console.log('Connected to Mongo: ', connection.version);
  } catch (error) {
    console.error(error)
  }

  app.get('/', (req: Request, res: Response) => {
    res.send('It is time for bulky season')
  })

  app.get('/users', listUsers);

  app.use(routeNotFound);

  app.listen(8080, () => {
    console.log('Bulky Bull bulking on port 8080')
  });
};
