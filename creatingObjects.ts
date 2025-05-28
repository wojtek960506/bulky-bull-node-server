import dotenv from 'dotenv'
import mongoose from 'mongoose';

import { User } from './src/models/users';


async function createSimpleUsers() {
  
  const user1 = new User({
    email: 'wz@wz.com',
    firstName: 'Woj',
    lastName: 'Ziel',
    weight: 79,
    height: 183,
    age: 29,
  });

  const user2 = new User({
    email: 'mz@mz.com',
    firstName: 'Mar',
    lastName: 'Ziel',
    weight: 85,
    height: 179,
    age: 26,
  });

  const user3 = new User({
    email: 'nz@nz.com',
    firstName: 'Nat',
    lastName: 'Ziel',
    weight: 68,
    height: 178,
    age: 19,
  });

  
  await user1.save();
  await user2.save();
  await user3.save();
}


async function main() {

  dotenv.config();

  const DB_URL = process.env.DB_URL || '';
  const DB_ADMIN = process.env.DB_ADMIN || '';
  const DB_PASSWORD = process.env.DB_PASSWORD || '';
  const DB_DATABASE = process.env.DB_DATABASE || '';
  const DB_APP_NAME = process.env.DB_APP_NAME || '';
  const DB_OPTIONS: mongoose.ConnectOptions = { 
    retryWrites: true,
    w: 'majority',
    appName: DB_APP_NAME
  };
  const DB_CONNECTION = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@${DB_URL}/${DB_DATABASE}`;


  let moongooseCon: mongoose.Mongoose | undefined = undefined;
  try {
    moongooseCon = await mongoose.connect(DB_CONNECTION, DB_OPTIONS);
    console.log('Connected to Mongo: ', moongooseCon.version);
    await createSimpleUsers();
    console.log('Simple users and workouts has been created');
  } catch (error) {
    console.error(error);
  } finally {
    if (moongooseCon) {
      moongooseCon.connection.close()
      console.log('connection to Mongo has been close');
    }
  }
}

main();
