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

    return orders.map((order) => new OrderDTO(order).create());
  }

  async getById(id) {
    const order = await this.schema.findOne({ _id: id }).populate("user");

    return new OrderDTO(order).create();
  }

  async updateById(id, properties = {}) {
    const data = await this.getById(id);
    const updated = await this.schema.findOneAndUpdate(
      { _id: id },
      { ...data, ...properties },
      { new: true }
    );

    return new OrderDTO(updated).create();
  }

  async create(properties) {
    const data = this.schema(properties);

    return new OrderDTO(await data.save()).create();
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default OrderDao;
