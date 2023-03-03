class UserDTO {
  constructor(user) {
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
    this.order = user.order;
  }
}

export default UserDTO;
