import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const PORT = Number(process.env.PORT || 1234)

const DB_URL = process.env.DB_URL || '';
const DB_ADMIN = process.env.DB_ADMIN || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const APP_NAME = process.env.DB_DATABASE || '';
const DB_OPTIONS: mongoose.ConnectOptions = { 
  retryWrites: true,
  w: 'majority',
  appName: APP_NAME
};

const DB_CONNECTION = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@${DB_URL}`


interface Config {
  PORT: number;
  DB_OPTIONS: mongoose.ConnectOptions;
  DB_CONNECTION: string;
}


export const config: Config = {
  PORT,
  DB_OPTIONS,
  DB_CONNECTION: DB_CONNECTION,
}
