import OrderDao from "../model/DAO/order.mongo.js";
import CartDao from "../model/DAO/cart.mongo.js";

const cartDAO = CartDao.getInstance();
const orderDAO = OrderDao.getInstance();

class OrderService {
  async purchaseOrderByUser(user) {
    const cart = await cartDAO.getAll({ user: user._id });

    if (cart.length === 0)
      throw new Error("No existe carrito vinculado al usuario");

    const itemsPurchased = cart[0].items.map((el) => ({
      _id: el._id,
      name: el.name,
      price: el.price,
      quantity: el.quantity,
      finalPrice: el.price * el.quantity,
    }));

    return orderDAO.create({
      items: itemsPurchased,
      email: user.email,
      user: user._id,
    });
  }
}

export default new OrderService();
