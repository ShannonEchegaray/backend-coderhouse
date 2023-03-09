import ProductsDTO from "./productsDTO.js";
import { Types } from "mongoose";

class CartDTO {
  #cart;

  constructor(cart) {
    if (!cart) return;
    console.log(cart.items);
    this.#cart = Boolean(cart);
    this.id = cart.id || cart._id;
    this.user = cart.user;
    this.items = cart.items.map((item) => ({
      item: Types.ObjectId.isValid(item.item.toString())
        ? item.item
        : new ProductsDTO(item.item),
      quantity: item.quantity,
    }));
  }

  create() {
    if (!this.#cart) return;
    return this;
  }
}

export default CartDTO;
