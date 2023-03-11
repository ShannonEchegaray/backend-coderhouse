import ChatDao from "../model/DAO/chat.mongo.js";
import UserDao from "../model/DAO/user.mongo.js";
import { ChatNotFound, UserNotFound } from "../utils/error.js";

const chatDAO = ChatDao.getInstance();
const userDAO = UserDao.getInstance();

class MessageService {
  async createChatByUser(user) {
    const created = await chatDAO.create({ author: user.email });
    console.log(created);

    userDAO.updateById(user.id, { chat: created.id });

    return created;
  }

  async findChatByUser(user) {
    console.log(user);
    const userFound = await userDAO.getById(user.id);

    if (!userFound) throw new UserNotFound();

    const chat = await chatDAO.getById(userFound.chat);

    if (!chat) throw new ChatNotFound();

    return chat;
  }

  async findChatById(id) {
    const chat = await chatDAO.getById(id);

    if (!chat) throw new ChatNotFound();

    return chat;
  }

  async newMessage(user, message) {
    const userFound = await userDAO.getById(user.id);

    if (!userFound) throw new UserNotFound();

    const chat = await chatDAO.getById(userFound.chat);

    if (!chat) throw new ChatNotFound();

    chat.messages.push({
      body: message,
      createdAt: new Date(),
      author: user.email,
    });

    return chatDAO.updateById(chat.id, chat);
  }

  async newMessageToUser(user, message, id) {
    const chat = await chatDAO.getById(id);

    if (!chat) throw new ChatNotFound();

    chat.messages.push({
      body: message,
      createdAt: new Date(),
      author: user.email,
    });

    return chatDAO.updateById(chat.id, chat);
  }

  async getAllChats() {
    return chatDAO.getAll();
  }
}

export default new MessageService();
