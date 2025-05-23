import dotenv from 'dotenv'

dotenv.config();

interface Config {
  port: number;
  db_admin: string;
  db_password: string;
}

export const config: Config = {
  port: Number(process.env.PORT),
  db_admin: process.env.DB_ADMIN || '',
  db_password: process.env.DB_PASSWORD || '',
}
