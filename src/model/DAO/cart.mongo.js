// import mongoose from "mongoose";
import MongoClient from "../../config/mongo.client";
import Base from "./base";

let instance = null;

class CartDao extends Base {
  constructor() {
    super();
    MongoClient.connect();
  }

  static getInstance() {
    if (instance) return instance;
    return (instance = new CartDao());
  }
}

export default CartDao;
