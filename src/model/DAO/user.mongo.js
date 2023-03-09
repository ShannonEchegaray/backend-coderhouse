import MongoClient from "../../config/mongo.client.js";
import { userSchema } from "../mongo.schema.js";
import UserDTO from "../DTO/userDTO.js";
import Base from "./base.js";

let instance = null;

class UserDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
    this.schema = userSchema;
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new UserDao());
  }

  async getAll(query = {}) {
    const users = await this.schema.find(query, { __v: false });

    return users.map((user) => new UserDTO(user).create());
  }

  async getById(id) {
    const user = await this.schema
      .findOne({ _id: id })
      .populate("cart")
      .populate("order");

    return new UserDTO(user).create();
  }

  async updateById(id, properties = {}) {
    const data = await this.getById(id);
    const updated = await this.schema.findOneAndUpdate(
      { _id: id },
      { ...data, ...properties },
      { new: true }
    );

    return new UserDTO(updated).create();
  }

  async create(properties) {
    const data = this.schema(properties);
    return new UserDTO(await data.save()).create();
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default UserDao;
