import mongoose, { DeleteResult } from "mongoose";
import { IUser, UserDocument } from "../types/userTypes";

export const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  weight: Number,
  height: Number,
  age: Number,
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  }],
});

export const User = mongoose.model<IUser>('User', userSchema);

export async function getAllUsers(): Promise<UserDocument[]> {
  return await User.find();
}

export async function getByFullName(firstName: string, lastName: string): Promise<UserDocument[]> {
  return await User.find({ 
    firstName: new RegExp(firstName, 'i'),
    lastName: new RegExp(lastName, 'i')
  });
}

export async function getUserById(id: string): Promise<UserDocument | null> {
  return await User.findById(id);
}

export async function insertUser(user: IUser): Promise<UserDocument> {
  return await User.create(user);
}

export async function removeUser(id: string): Promise<DeleteResult> {
  return await User.deleteOne({ _id: id });
}

export async function removeAllUsers(): Promise<DeleteResult> {
  return await User.deleteMany({});
}
