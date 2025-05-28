import { Locals } from "express";
import { HydratedDocument, Types } from "mongoose";


export type IUser = {
  email: string,
  firstName: string,
  lastName: string,
  weight?: Number,
  height?: Number,
  age?: Number,
  workouts: Types.ObjectId[];
};

export type UserDocument = HydratedDocument<IUser>;

export interface UserResLocals extends Locals {
  user: UserDocument;
}

export type UserObj = IUser & {
  id: Types.ObjectId,
}