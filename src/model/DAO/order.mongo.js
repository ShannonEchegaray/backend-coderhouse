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
    const orders = await this.schema.find(query, { __v: false }).populate();

    return orders.map((order) => new OrderDTO(order));
  }

  async getById(id) {
    const order = this.schema.findOne({ _id: id }).populate();

    if (!order) throw new Error("No results");

    return order;
  }

  async updateById(id, properties = {}) {
    try {
      const data = await this.getById(id);
      const updated = await this.schema.updateOne(
        { _id: id },
        { ...data, ...properties }
      );

      if (updated.matchedCount === 0)
        throw new Error("No se encontro documento a modificar.");

      return;
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
