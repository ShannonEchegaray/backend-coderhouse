import MongoClient from "../../config/mongo.client.js";
import { productSchema } from "../mongo.schema.js";
import ProductDTO from "../DTO/productsDTO.js";
import Base from "./base.js";

let instance = null;

class ProductsDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
    this.schema = productSchema;
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new ProductsDao());
  }

  async getAll(query = {}) {
    const products = await this.schema.find(query, { __v: false });

    return products.map((product) => new ProductDTO(product));
  }

  async getById(id) {
    const product = await this.schema.findOne({ _id: id }, { __v: false });

    return new ProductDTO(product);
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
    return new ProductDTO(await data.save());
  }

  async deleteById(id) {
    return this.schema.deleteOne({ _id: id });
  }
}

export default ProductsDao;
