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

    return cartDAO.getById(user.cart.id);
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

    const isItem = cart.items.find((cartItem) => cartItem.item.id === item.id);

    if (isItem) {
      isItem.quantity += item.quantity;
    } else {
      cart.items.push({ item: item.id, quantity: item.quantity });
    }

    cart.items = cart.items.map(({ item, quantity }) => ({
      item: item?.id || item,
      quantity,
    }));

    return await cartDAO.updateById(cart.id, cart);
  }

  async modifyCartProductsById(id, items) {
    const cart = await cartDAO.getById(id);

    if (!cart) throw new Error("Carrito no encontrado D;");

    const products = await productsDAO.getAll({
      _id: { $in: items.map(({ id }) => id) },
    });

    if (items.length !== products.length) {
      throw new Error("Un producto no fue encontrado.");
    }

    cart.items = products.map(({ id }) => ({
      quantity: items.find((item) => item.id === id)?.quantity,
      item: id,
    }));

    return await cartDAO.updateById(id, cart);
  }

  async deleteAllProductByUser(user) {
    const cart = await this.getCartByUser(user.id);

    cart.items = [];

    return await cartDAO.updateById(cart.id, cart);
  }

  async deleteAllCartProductsById(id) {
    const cart = await cartDAO.getById(id);

    if (!cart) {
      throw new Error(
        "Capo, el id que me envias difiere de todos los id's que tenemos en la base de datos, que te pasa loco!."
      );
    }

    cart.items = [];

    return cartDAO.updateById(id, cart);
  }
}

export default new CartService();
