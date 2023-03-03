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

    return users.map((user) => new UserDTO(user));
  }

  async getById(id) {
    const user = await this.schema
      .findOne({ _id: id })
      .populate("cart")
      .populate("order");

    if (!user) throw new Error("No results.");

    return new UserDTO(user);
  }

  async updateById(id, properties = {}) {
    try {
      const data = await this.getById(id);
      const updated = await this.schema.updateOne(
        { _id: id },
        { ...data, ...properties }
      );

      if (updated.matchedCount === 0)
        throw new Error("No se encontro documento a modificar");
    } catch (error) {
      throw error;
    }
  }

  async create(properties) {
    const data = this.schema(properties);
    return new UserDTO(await data.save());
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default UserDao;
