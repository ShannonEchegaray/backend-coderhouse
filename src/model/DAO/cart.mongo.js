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
      .populate("items");

    return carts.map((cart) => new CartDTO(cart));
  }

  async getById(id) {
    const cart = await this.schema.findOne({ _id: id }).populate("items");

    if (!cart) throw new Error("No results");

    return new CartDTO(cart);
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
    return new CartDTO(await data.save());
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default CartDao;
