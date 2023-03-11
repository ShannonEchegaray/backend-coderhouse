import jwt from "jsonwebtoken";

import messageService from "../service/message.service.js";
import loginService from "../service/login.service.js";
import { secretToken } from "../config/config.js";
import { NotAuthorized } from "../utils/error.js";

class SocketController {
  async parseToken(token) {
    const user = jwt.verify(token, secretToken);

    if (!user) throw new NotAuthorized();

    return user.user;
  }

  async createChatByUser(token) {
    const user = await this.parseToken(token);

    return messageService.createChatByUser(user);
  }

  async findChatByUser(token) {
    const user = await this.parseToken(token);

    return messageService.findChatByUser(user);
  }

  async findChatById(token, id) {
    const user = await this.parseToken(token);

    await loginService.isAdmin(user);

    return messageService.findChatById(id);
  }

  async newMessage(token, message) {
    const user = await this.parseToken(token);

    return messageService.newMessage(user, message);
  }

  async newMessageToUser(token, message, id) {
    const user = await this.parseToken(token);

    await loginService.isAdmin(user);

    const data = messageService.newMessageToUser(user, message, id);

    return data;
  }

  async getAllChats(token) {
    const user = await this.parseToken(token);

    await loginService.isAdmin(user);

    return messageService.getAllChats();
  }
}

export default new SocketController();
