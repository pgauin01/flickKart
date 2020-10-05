class WishList {
  constructor(
    wishId,
    id,
    name,
    price,
    ratingsQuantity,
    ratingsAverage,
    seller,
    imageCover,
    highlights
  ) {
    this.wishId = wishId;
    this.id = id;
    this.name = name;
    this.price = price;
    this.ratingsQuantity = ratingsQuantity;
    this.ratingsAverage = ratingsAverage;
    this.seller = seller;
    this.imageCover = imageCover;
    this.highlights = highlights;
  }
}

export default WishList;
