import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const PORT = Number(process.env.PORT || 1234)

const JWT_SECRET = process.env.JWT_SECRET || '';

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
const DB_CONNECTION = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@${DB_URL}/${DB_DATABASE}`

interface Config {
  PORT: number;
  DB_OPTIONS: mongoose.ConnectOptions;
  DB_CONNECTION: string;
  JWT_SECRET: string;
}

export const config: Config = {
  PORT,
  DB_OPTIONS,
  DB_CONNECTION,
  JWT_SECRET
}
