import MongoClient from "../../config/mongo.client.js";
import { cartSchema } from "../mongo.schema.js";
import CartDTO from "../DTO/cartDTO.js";
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
    const carts = await this.schema
      .find(query, { __v: false })
      .populate("user");

    return carts.map((cart) => new CartDTO(cart).create());
  }

  async getById(id) {
    const cart = await this.schema
      .findOne({ _id: id })
      .populate("items")
      .populate({
        path: "items",
        populate: { path: "item", model: "Products" },
      });

    return new CartDTO(cart).create();
  }

  async updateById(id, properties = {}) {
    const data = (await this.getById(id)) || {};
    const updated = await this.schema.findOneAndUpdate(
      { _id: id },
      { ...data, ...properties },
      { new: true }
    );

    return new CartDTO(updated).create();
  }

  async create(properties) {
    const data = this.schema(properties);
    return new CartDTO(await data.save()).create();
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default CartDao;
