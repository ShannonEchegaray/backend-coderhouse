import MongoClient from "../../config/mongo.client.js";
import { userSchema } from "../mongo.schema.js";
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
    return this.schema.find(query, { __v: false }).populate("cart");
  }

  async getById(id) {
    return this.schema.findOne({ _id: id }).populate("cart");
  }

  async updateById(id, properties = {}) {
    const data = this.getById(id);
    console.log(properties);
    return this.schema.updateOne({ _id: id }, { ...data, ...properties });
  }

  async create(properties) {
    const data = this.schema(properties);
    return data.save();
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default UserDao;
