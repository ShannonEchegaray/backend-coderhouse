import mongoose from "mongoose";
import Client from "./client";
import { mongoConfig } from "./config";

class MongoClient extends Client {
  static connect() {
    if (mongoose.connection.readyState === 1) return;
    mongoose.connect(mongoConfig.url);
  }

  static disconnect() {
    mongoose.disconnect();
  }
}

export default MongoClient;
