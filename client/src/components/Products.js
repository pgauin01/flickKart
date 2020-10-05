import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/actions/products";
import { addCart } from "../store/actions/cart";
import {
  getWish,
  addToWishlist,
  removeWishList,
} from "../store/actions/wishlist";

const Products = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.credentials.id);
  const loading = useSelector((state) => state.ui.loading);
  const singleProductHandler = async (id) => {
    await dispatch(getProduct(id));
    props.history.push(`/product/${id}`);
  };

  const wishListHandler = async (pid, userId) => {
    const product = pid;
    const user = userId;

    await dispatch(addToWishlist({ product, user }));
  };

  const removeWishHandler = async (pid) => {
    await dispatch(removeWishList(pid));
    await dispatch(getWish());
  };

  const cartHandler = async (pid) => {
    await dispatch(addCart(pid));
  };
  return (
    <section className="section-products">
      {props.title ? (
        <h1 className="heading-primary heading-primary--dark u-center-text u-margin-bottom-medium">
          {props.title}
        </h1>
      ) : null}
      <div
        className={
          props.wish ? "products-container--wish" : "products-container"
        }
      >
        {props.products.map((product, i) => {
          return (
            <div key={i} className="card">
              <div
                className="card__img--container"
                onClick={() => singleProductHandler(product.id)}
              >
                <img src={product.imageCover} className="card__img" />
              </div>
              <div className="card__caption">
                <h3 className="card__title u-center-text">{product.name}</h3>
                <div className="card__description">
                  <div className="card__price">Price:${product.price}</div>
                  <div className="card__rating">
                    {product.ratingsAverage}Average Rating
                  </div>
                </div>
                <div className="">
                  {loading === false ? (
                    <ul className="card__highlights">
                      {product.highlights.map((el, i) => {
                        return (
                          <li key={i} className="card__items">
                            {el}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              </div>
              <div className="card__btn">
                <button
                  className="btn btn--cart--1"
                  onClick={() => cartHandler(product.id)}
                >
                  Add to cart
                </button>
                {props.product ? (
                  <button
                    className="btn btn--cart--2"
                    onClick={() => wishListHandler(product.id, userId)}
                  >
                    Add to Wishlist
                  </button>
                ) : (
                  <button
                    className="btn btn--cart--2--wish font-small"
                    onClick={() => {
                      removeWishHandler(product.wishId);
                    }}
                  >
                    remove from wishlist
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
