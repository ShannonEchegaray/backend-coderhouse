import CartDao from "../model/DAO/cart.mongo.js";

const cartDAO = CartDao.getInstance();

class CartService {
  async getAllCarts() {
    return cartDAO.getAll();
  }

  async getCartByUser() {}

  async getCartById(id) {
    return cartDAO.getById(id);
  }

  async createCart(properties) {
    return cartDAO.create(properties);
  }

  async addProductByUser() {}

  async modifyCartById(id, properties) {
    return cartDAO.updateById(id, properties);
  }

  async deleteProductByUser() {}

  async deleteCartProductsById(id) {
    const cart = await cartDAO.getById(id);
    console.log(cart);
  }
}

export default new CartService();
