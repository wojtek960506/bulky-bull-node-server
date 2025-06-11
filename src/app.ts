import express, { Response, Request} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { routeNotFound } from './middleware/routeNotFound';
import { config } from './config/config';
import { router as apiAuthRouter } from './routes/apiAuthRoutes';
import { router as apiUserRouter } from './routes/apiUserRoutes';
import { router as apiExerciseRouter } from './routes/apiExerciseRoutes';


const app = express();

export const start = async () => {

  app.use(cors({
    origin: 'http://localhost:5173',
  }))

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

  app.get('/api', (req: Request, res: Response) => {
    res.status(200).json({ bulkyMessage: 'It is time for bulky season' });
  })

  app.use('/api/auth', apiAuthRouter);
  app.use('/api/users', apiUserRouter);
  app.use('/api/exercises', apiExerciseRouter);

  app.use(routeNotFound);

  app.listen(8080, () => {
    console.log(`Bulky Bull bulking on port ${config.PORT}`)
  });
};
