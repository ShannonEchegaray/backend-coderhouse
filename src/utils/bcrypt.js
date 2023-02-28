import bcrypt from "bcrypt";

export const encrypt = async (password) => {
  return bcrypt.hash(password, 10);
};

export const compare = async (password, encryptPassword) => {
  return bcrypt.compare(password, encryptPassword);
};
