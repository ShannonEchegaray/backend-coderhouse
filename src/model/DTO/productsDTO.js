class ProductsDTO {
  constructor(product) {
    if (!product) return;
    this.id = product.id || product._id;
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.thumbnail = product.thumbnail;
    this.stock = product.stock;
    this.price = product.price;
  }
}

export default ProductsDTO;
