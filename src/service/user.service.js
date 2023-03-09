import UserDao from "../model/DAO/user.mongo.js";
import { UserNotFound } from "../utils/error.js";

const userDAO = UserDao.getInstance();

class UserService {
  async getProfileByUser(id) {
    const user = await userDAO.getById(id);
    if (!user) throw new UserNotFound("El usuario no fue encontrado.");

    return user;
  }

  async getProfileById(id) {
    const user = await userDAO.getById(id);
    if (!user) throw new UserNotFound("El usuario no fue encontrado");

    return user;
  }

  async createUser(properties) {
    return userDAO.create(properties);
  }

  async updateByUser(id, properties) {
    return userDAO.updateById(id, properties);
  }

  async updateById(id, properties) {
    return userDAO.updateById(id, properties);
  }

  async deleteById(id) {
    return userDAO.deleteById(id);
  }

  async deleteByUser(id) {
    return userDAO.delete(id);
  }
}

export default new UserService();
