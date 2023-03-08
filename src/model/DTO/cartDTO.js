import ProductsDTO from "./productsDTO.js";

class CartDTO {
  constructor(cart) {
    if (!cart) return;
    this.id = cart.id || cart._id;
    this.user = cart.user;
    this.items = cart.items.map((item) => ({
      item:
        typeof item?.item?._id?.toString() === "string"
          ? item.item._id
          : new ProductsDTO(item.item),
      quantity: item.quantity,
    }));
  }
}

export default CartDTO;
