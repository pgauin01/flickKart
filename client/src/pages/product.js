import React, { useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../store/actions/products";
import { addCart } from "../store/actions/cart";
import { addToWishlist } from "../store/actions/wishlist";

const Product = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const loading = useSelector((state) => state.products.loading);
  const userId = useSelector((state) => state.user.credentials.id);
  const product = useSelector((state) => state.products.product);
  // console.log(loading);
  // console.log(loading);

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (!product === false) {
      dispatch(getProduct(productId));
    }
  }, [dispatch]);

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const {
    color,
    description,
    highlights,
    imageCover,
    images,
    name,
    price,
    ratingsAverage,
    ratingsQuantity,
    reviews,
    seller,
    specifications,
    tags,
    _id,
  } = product;

  const img = `/img/product/${imageCover}`;

  const imgArray = [];
  if (images) {
    for (let i = 0; i < images.length; i++) {
      imgArray.push(`/img/product/${images[i]}`);
    }
  }

  // console.log(imgArray);

  let specskey = [];
  let specsValue = [];
  if (specifications) {
    for (const [key, value] of Object.entries(specifications[0])) {
      specskey.push(key);
      specsValue.push(value);
    }
  }

  let descKey = [];
  let descValue = [];
  if (description) {
    description.map((el) => {
      for (const [key, value] of Object.entries(el)) {
        descKey.push(key);
        descValue.push(value);
      }
    });
  }

  const reviewHandler = () => {
    props.history.push("reviews/addReview");
  };

  let desc = [];
  for (let i = 0; i < descKey.length; i++) {
    desc.push(descKey[i]);
    desc.push(descValue[i]);
  }

  const wishListHandler = async () => {
    const product = _id;
    const user = userId;

    await dispatch(addToWishlist({ product, user }));
  };

  const cartHandler = async () => {
    await dispatch(addCart(_id));
  };

  let productView;
  if (isEmpty(product) || loading) {
    productView = (
      <div className="loading">
        <img src="/loading.gif" />
      </div>
    );
  } else {
    productView = (
      <section className="section-product">
        <div className="product">
          <div className="productleft">
            <div className="productleft__description">
              <div className="productleft__descimg">
                <img src={img} className="productleft__mainimg" />
              </div>
              <div className="productleft__images">
                {imgArray.map((el, i) => {
                  return (
                    <img key={i} src={el} className="productleft__thumbimg" />
                  );
                })}
              </div>
              <div className="productleft__buttons">
                <a
                  className="btn btn--product--1"
                  onClick
                  onClick={wishListHandler}
                >
                  Add To Wishlist
                </a>
                <a className="btn btn--product--2" onClick={cartHandler}>
                  Add to cart
                </a>
              </div>
            </div>
          </div>

          <div className="productright">
            <h2 className="heading-secondary u-margin-horizontal-small">
              {name}
            </h2>
            <h5 className="heading-small u-margin-horizontal-small">
              {ratingsAverage}* {ratingsQuantity} Ratings
            </h5>
            <h2 className="heading-primary u-margin-horizontal-small">
              ₹ {price}
            </h2>
            <h5 className="heading-small u-margin-horizontal-small">
              Color:{" "}
              {color.map((el) => {
                return `${el} ,`;
              })}
            </h5>
            <h5 className="heading-small u-margin-horizontal-small">
              Seller : {seller}
            </h5>

            <div className="productright__highlights">
              <h2 className="heading-tertiary u-margin-horizontal-small font-bold">
                Highlights
              </h2>
              <ul className="productright__list">
                {highlights.map((el, i) => {
                  return (
                    <li key={i} className="productright__items">
                      {el}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="productright__description u-margin-top-medium">
              <div className="productright__description--box">
                <h2 className="heading-tertiary u-margin-horizontal-small font-bold">
                  Product Description
                </h2>
              </div>
              {desc.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="productright__description--box productright__description--box--border"
                  >
                    <p className="productright__description--text">{el}</p>
                  </div>
                );
              })}
            </div>

            <div className="productright__specification u-margin-top-medium">
              <div className="productright__specification--box">
                <h2 className="heading-tertiary u-margin-horizontal-small font-bold">
                  Specifications
                </h2>
              </div>
              <div className="productright__specification--box productright__specification--box--border">
                <div className="productright__specification--heading">
                  {specskey.map((el, i) => {
                    return (
                      <h2
                        key={i}
                        className="heading-small productright__specification--box--left "
                      >
                        {el}
                      </h2>
                    );
                  })}
                </div>

                <div className="productright__specification--para">
                  {specsValue.map((el2, i) => {
                    return (
                      <p
                        key={i}
                        className="paragraph productright__specification--box--right "
                      >
                        {el2}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="productreview">
              <div className="productreview__action">
                <h2 className="heading-secondary u-margin-top-medium u-margin-bottom-medium font-bold">
                  Rating and Reviews
                </h2>
                <button className="btn btn--red" onClick={reviewHandler}>
                  Add New Review
                </button>
              </div>
              {reviews.length > 0 ? (
                reviews.map((el, i) => {
                  return (
                    <div key={i} className="productreview__box">
                      <h3 className="productreview__heading">
                        {" "}
                        <span style={{ paddingRight: 20 }}>{el.rating}*</span>
                        {el.review}
                      </h3>

                      <div className="productreview__user">
                        <h3>{el.user.name}</h3>
                        <h4>{dayjs(el.createdAt).fromNow()}</h4>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>No Review found...</h1>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return productView;
};

export default Product;
