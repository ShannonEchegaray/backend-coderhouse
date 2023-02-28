import dotenv from "dotenv";

dotenv.config();

export const mongoConfig = {
  url: process.env.DATABASE_URL,
};
