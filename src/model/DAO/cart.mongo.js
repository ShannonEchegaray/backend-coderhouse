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
    console.log(this.schema);
    return this.schema.find(query, { _v: false });
  }

  async getById(id) {
    return this.schema.findOne({ id });
  }

  async updateById(id, properties = {}) {
    const data = this.getById(id);
    return this.schema.updateOne({ id }, { ...data, ...properties });
  }

  async deleteById(id) {
    return this.schema.deleteOne({ id });
  }
}

export default CartDao;
