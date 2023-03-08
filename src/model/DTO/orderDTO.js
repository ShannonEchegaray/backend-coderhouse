class OrderDTO {
  constructor(order) {
    if (!order) return;
    this.id = order.id || order._id;
    this.items = order.items;
    this.email = order.email;
    this.user = order.user;
  }
}

export default OrderDTO;