import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  weight: Number,
  height: Number,
  age: Number,
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
  // to make search by full name case-insensitive
  firstNameLower: String,
  lastNameLower: String,
});

export const User = mongoose.model('User', userSchema);

export async function getAllUsers() {
  return await User.find();
}

export async function getByFullName(firstNameLower: string, lastNameLower: string) {
  return await User.find({ firstNameLower, lastNameLower });
}

export async function getUserById(id: string) {
  return await User.findById(id).populate('workouts');
}

export async function removeUser(id: string) {
  return await User.deleteOne({ _id: id });
}

export async function removeAllUsers() {
  return await User.deleteMany({});
}
