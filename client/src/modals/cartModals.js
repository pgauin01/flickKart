class Cart {
  constructor(cartId, id, name, price, seller, quantity, img, total) {
    this.cartId = cartId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.seller = seller;
    this.quantity = quantity;
    this.img = img;
    this.total = total;
  }
}

export default Cart;
