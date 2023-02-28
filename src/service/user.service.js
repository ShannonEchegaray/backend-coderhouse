import UserDao from "../model/DAO/user.mongo.js";

const userDAO = UserDao.getInstance();

class UserService {
  async getProfileByUser(id) {
    return userDAO.getById(id);
  }

  async getProfileById(id) {
    return userDAO.getById(id);
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
