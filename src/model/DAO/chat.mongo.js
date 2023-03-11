import MongoClient from "../../config/mongo.client.js";
import { chatSchema } from "../mongo.schema.js";
import ChatDTO from "../DTO/chatDTO.js";
import Base from "./base.js";

let instance = null;

class ChatDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
    this.schema = chatSchema;
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new ChatDao());
  }

  async getAll(query = {}) {
    const chats = await this.schema.find(query, { __v: false });

    return chats.map((chat) => new ChatDTO(chat).create());
  }

  async getById(id) {
    const chat = await this.schema.findOne({ _id: id });

    return new ChatDTO(chat).create();
  }

  async updateById(id, properties = {}) {
    const data = await this.getById(id);
    const updated = await this.schema.findOneAndUpdate(
      { _id: id },
      { ...data, ...properties },
      { new: true }
    );

    return new ChatDTO(updated).create();
  }

  async create(properties) {
    const data = this.schema(properties);

    return new ChatDTO(await data.save()).create();
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default ChatDao;
