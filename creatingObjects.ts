import dotenv from 'dotenv'
import mongoose from 'mongoose';

import { User } from './src/models/users';
import { Workout } from './src/models/workouts';


async function createSimpleUsers() {
  
  const user1 = new User({
    email: 'wz@wz.com',
    firstName: 'Woj',
    lastName: 'Ziel',
    weight: 79,
    height: 183,
    age: 29,
    firstNameLower: 'woj',
    lastNameLower: 'ziel',
  });

  const user2 = new User({
    email: 'mz@mz.com',
    firstName: 'Mar',
    lastName: 'Ziel',
    weight: 85,
    height: 179,
    age: 26,
    firstNameLower: 'mar',
    lastNameLower: 'ziel',
  });

  const user3 = new User({
    email: 'nz@nz.com',
    firstName: 'Nat',
    lastName: 'Ziel',
    weight: 68,
    height: 178,
    age: 19,
    firstNameLower: 'nat',
    lastNameLower: 'ziel',
  });

  const workout1 = new Workout({
    date: '2025-05-01',
    reps: 11,
    user: user1._id
  });

  const workout2 = new Workout({
    date: '2024-05-02',
    reps: 22,
    user: user1._id
  });

  const workout3 = new Workout({
    date: '2024-05-03',
    reps: 33,
    user: user2._id
  });

  const workout4 = new Workout({
    date: '2024-05-04',
    reps: 44,
    user: user2._id
  });

  const workout5 = new Workout({
    date: '2024-05-05',
    reps: 55,
    user: user3._id
  });

  const workout6 = new Workout({
    date: '2024-05-06',
    reps: 66,
    user: user3._id
  });

  user1.workouts.push(workout1._id, workout2._id)
  user2.workouts.push(workout3._id, workout4._id)
  user3.workouts.push(workout5._id, workout6._id)
  
  await user1.save();
  await user2.save();
  await user3.save();
  await workout1.save();
  await workout2.save();
  await workout3.save();
  await workout4.save();
  await workout5.save();
  await workout6.save();
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
