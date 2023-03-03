class CartDTO {
  constructor(cart) {
    this.id = cart.id || cart._id;
    this.user = cart.user;
    this.items = cart.items;
  }
}

export default CartDTO;
