import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DATABASE_URL);
export const mongoConfig = {
  url: process.env.DATABASE_URL,
};
