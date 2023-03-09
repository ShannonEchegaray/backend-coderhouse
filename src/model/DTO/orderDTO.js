class OrderDTO {
  #order;

  constructor(order) {
    if (!order) return;
    this.#order = Boolean(order);
    this.id = order.id || order._id;
    this.items = order.items;
    this.email = order.email;
    this.user = order.user;
  }

  create() {
    if (!this.#order) return;
    return this;
  }
}

export default OrderDTO;
