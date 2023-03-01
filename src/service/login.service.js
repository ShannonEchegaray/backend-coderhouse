import UserDao from "../model/DAO/user.mongo.js";

const userDAO = UserDao.getInstance();

class LoginService {
  async isAdmin(user) {
    const backendUser = await userDAO.getById(user._id);
    console.log(backendUser);
    return backendUser.role === "admin";
  }
}

export default new LoginService();
