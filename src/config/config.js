import dotenv from "dotenv";

dotenv.config();

export const mongoConfig = {
  url: process.env.DATABASE_URL,
};

export const emailConfig = {
  email: process.env.EMAIL,
  password: process.env.EMAIL_PASS,
  admin_email: process.env.EMAIL_ADMIN,
};

export const secretToken = process.env.SECRET_TOKEN;
