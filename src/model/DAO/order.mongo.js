import MongoClient from "../../config/mongo.client.js";
import { orderSchema } from "../mongo.schema.js";
import OrderDTO from "../DTO/orderDTO.js";
import Base from "./base.js";

let instance = null;

class OrderDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
    this.schema = orderSchema;
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new OrderDao());
  }

  async getAll(query = {}) {
    const orders = await this.schema
      .find(query, { __v: false })
      .populate("user");

    return orders.map((order) => new OrderDTO(order));
  }

  async getById(id) {
    const order = await this.schema.findOne({ _id: id }).populate("user");

    return order;
  }

  async updateById(id, properties = {}) {
    try {
      const data = await this.getById(id);
      const updated = await this.schema.findOneAndUpdate(
        { _id: id },
        { ...data, ...properties },
        { new: true }
      );

      return updated;
    } catch (error) {
      throw error;
    }
  }

  async create(properties) {
    const data = this.schema(properties);
    return new OrderDTO(await data.save());
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default OrderDao;
