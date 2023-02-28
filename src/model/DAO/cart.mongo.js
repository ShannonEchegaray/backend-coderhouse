import MongoClient from "../../config/mongo.client.js";
import { cartSchema } from "../mongo.schema.js";
import Base from "./base.js";

let instance = null;

class CartDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
    this.schema = cartSchema;
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new CartDao());
  }

  async getAll(query = {}) {
    return this.schema.find(query, { __v: false }).populate("items");
  }

  async getById(id) {
    return this.schema.findOne({ _id: id }).populate("items");
  }

  async updateById(id, properties = {}) {
    const data = this.getById(id);
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

export default CartDao;
