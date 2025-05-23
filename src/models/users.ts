import mongoose from "mongoose";
import { Workout } from "./workouts";

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  surname: String,
  weight: Number,
  hieght: Number,
  age: Number,
  password: String,
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }]
});

export const User = mongoose.model('User', userSchema);


async function createFirstUser() {
  
  const user = new User({
    email: 'wz@wz.com',
    name: 'Woj',
    surname: 'Ziel',
    weight: 79,
    height: 183,
    age: 29,
    password: 'abc',

  });

  // const workout = new Workout({
  //   date: '2025-05-23',
  //   reps: 5,
  //   user: user
  // })
  
  // console.log('before user save')
  // const newUser = await user.save()
  // console.log('after user save')
  // console.log(newUser)

  const workout1 = new Workout({
    date: '2024-05-23',
    reps: 55,
    user_cde: user._id
  });

  // console.log('before workout save')
  // const newWorkout1 = await workout1.save()
  // console.log('after workout save')
  // console.log(newWorkout1);

  const workout2 = new Workout({
    date: '2024-05-22',
    reps: 66,
    user_cde: user._id
  });

  user.workouts.push(workout1._id, workout2._id)

  // console.log('before workout save')
  // const newWorkout2 = await workout2.save()
  // console.log('after workout save')
  // console.log(newWorkout2);

  const newUser = await user.save()
  const newWorkout1 = await workout1.save()
  const newWorkout2 = await workout2.save()

}

// createFirstUser()


export async function getAll() {
  return await User.find();
}

export async function getOne(name: string) {
  return await User.findOne({ name })
}
