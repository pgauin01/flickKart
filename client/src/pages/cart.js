import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, calcTotal, deleteCart } from "../store/actions/cart";
import { addToWishlist } from "../store/actions/wishlist";
import Input from "../components/UI/quantityInput";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartt = useSelector((state) => state.cart);
  const loading = useSelector((state) => state.cart.loading);
  const email = useSelector((state) => state.user.credentials.email);
  const userID = useSelector((state) => state.user.credentials.id);
  const { total } = cartt;
  // console.log(loading);
  // console.log(cartt);

  const getCartData = useCallback(async () => {
    await dispatch(getCart());
  });

  const getTotal = useCallback(async () => {
    await dispatch(calcTotal());
  });

  const addTowish = useCallback(async (userData) => {
    await dispatch(addToWishlist(userData));
  });

  const deleteCartData = useCallback(async (id) => {
    await dispatch(deleteCart(id));
  });

  useEffect(() => {
    getCartData();
    getTotal();
  }, [dispatch]);

  const deleteCartHandler = (pid) => {
    deleteCartData(pid);

    // getTotal();
  };

  const addWishHandler = (cartid, pid) => {
    const product = pid;
    const user = userID;
    deleteCartData(cartid);
    addTowish({ product, user });
  };

  const makePayment = async () => {
    try {
      const session = await axios.get(`/bookings/checkout-session/${userID}`);
      const stripePromise = loadStripe(
        "pk_test_51H7e0FFoce81BebJOGLt0D7U5RtX6LOT9zLqFi80EiNSmZFMoeZKUeuwI89UzkIxEeulrwZlOEYxvXxr3Wg5XISJ003LCntMly"
      );
      // console.log(session.data.session.id);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  let cart;
  if (loading) {
    cart = (
      <div className="loading">
        <img src="/loading.gif" />
      </div>
    );
  } else if (cartt.cart.length === 0) {
    cart = (
      <div className="noItem">
        <p className="noItem__text">
          No products found in cart start adding some....
        </p>
      </div>
    );
  } else {
    cart = (
      <>
        <div className="cart">
          {cartt.cart.map((cart) => {
            return (
              <div key={cart.cartId} className="cart__card">
                <img src={cart.img} className="cart__img" />
                <div className="cart__description">
                  <h2 className="heading-tertiary">{cart.name}</h2>
                  <h2 className="heading-tertiary">{cart.seller}</h2>
                  <h2 className="heading-tertiary">₹‎{cart.price}</h2>
                </div>
                <div className="cart__actions">
                  <Input cartId={cart.cartId} value={cart.quantity} />
                  <button
                    className="btn btn--cart--delete"
                    onClick={() => deleteCartHandler(cart.cartId)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn--cart--later"
                    onClick={() => addWishHandler(cart.cartId, cart.id)}
                  >
                    Buy later
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cartright">
          <h3 className="heading-tertiary u-margin-bottom-small">
            PRICE DETAILS
          </h3>
          <hr />
          <ul className="cartright__desc">
            <li className="cartright__items">Price {cartt.cart.length} item</li>
            <li className="cartright__items">₹{total}</li>
            <li className="cartright__items">Delivery Charges</li>
            <li className="cartright__items">Free</li>
          </ul>
          <hr />
          <div className="cartright__amount">
            <h2>Total Amount</h2>
            <h2>₹{total}</h2>
            <div className="right">
              <button className="btn btn__order" onClick={makePayment}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <section className="section-cart">{cart}</section>;
};

export default Cart;
