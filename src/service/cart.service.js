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

  async createCart() {}
  async addProductByUser() {}
  async modifyCartById(id) {}
  async deleteProductByUser() {}
  async deleteCartById(id) {}
}

export default new CartService();
