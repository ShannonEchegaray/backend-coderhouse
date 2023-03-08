import CartDao from "../model/DAO/cart.mongo.js";
import ProductsDao from "../model/DAO/products.mongo.js";
import UserDao from "../model/DAO/user.mongo.js";

const cartDAO = CartDao.getInstance();
const productsDAO = ProductsDao.getInstance();
const userDAO = UserDao.getInstance();

class CartService {
  async getAllCarts() {
    return cartDAO.getAll();
  }

  async getCartByUser(id) {
    const user = await userDAO.getById(id);
    return cartDAO.getById(user.cart._id);
  }

  async getCartById(id) {
    return cartDAO.getById(id);
  }

  async createCart(properties) {
    return cartDAO.create(properties);
  }

  async addProductByUser(user, item) {
    const product = await productsDAO.getById(item.id);

    if (!product) throw new Error("Producto no encontrado.");

    const cart = await this.getCartByUser(user.id);

    const isItem = cart.items.find((cartItem) => cartItem.id === item.id);

    console.log(isItem.id, item.id);

    if (isItem) {
      isItem.quantity += item.quantity;
    } else {
      cart.items.push({ item: item.id, quantity: item.quantity });
    }

    return await cartDAO.updateById(cart.id, cart);
  }

  async modifyCartById(id, properties) {
    return cartDAO.updateById(id, properties);
  }

  async deleteProductByUser(id) {
    return cartDAO.deleteById(id);
  }

  async deleteCartProductsById(id) {
    const cart = await cartDAO.getById(id);
    console.log(cart);
  }
}

export default new CartService();
