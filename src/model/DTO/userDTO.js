class UserDTO {
  #user;

  constructor(user) {
    if (!user) return;
    this.#user = Boolean(user);
    this.id = user.id || user._id;
    this.name = user.name;
    this.lastname = user.lastname;
    this.role = user.role;
    this.email = user.email;
    this.nickname = user.nickname;
    this.phone_number = user.phone_number;
    this.profile_image = user.profile_image;
    this.address = user.address;
    this.cart = user.cart;
    this.chat = user.chat;
    this.order = user.order;
  }

  create() {
    if (!this.#user) return;
    return this;
  }
}

export default UserDTO;
