import {
  GET_CART,
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  LOADING_UI,
  STOP_LOADING_UI,
  GET_TOTAL,
  LOADING_CART,
} from "../types";
import axios from "axios";
import CartModel from "../../modals/cartModals";

export const getCart = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_CART });
      const response = await axios.get("users/cart");
      const cart = response.data.data.data;
      // console.log(cart);
      dispatch({ type: GET_CART, payload: response.data.data.data });
      const newCart = [];
      for (let key in cart) {
        newCart.push(
          new CartModel(
            cart[key].id,
            cart[key].product.id,
            cart[key].product.name,
            cart[key].total,
            cart[key].product.seller,
            cart[key].quantity,
            `/img/product/${cart[key].product.imageCover}`,
            cart[key].total
          )
        );
      }
      dispatch({ type: GET_CART, payload: newCart });

      // console.log(response.data.data.data);
      // dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCart = (productId) => {
  return async (dispatch, getState) => {
    //   const user = getState().
    const user = getState().user.credentials.id;
    dispatch({ type: LOADING_CART });

    // console.log(user);
    const product = productId;
    const userData = {
      user,
      product,
    };
    try {
      const response = await axios.post("users/cart", userData);
      console.log(response);
      // dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteCart = (pid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_CART });
      await axios.delete(`users/cart/${pid}`);
      dispatch({ type: DELETE_CART, payload: pid });
      // calcTotal();
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateQuantity = (cartId, quantity) => {
  return async (dispatch) => {
    const userData = {
      quantity,
    };
    try {
      dispatch({ type: LOADING_CART });

      const response = await axios.post(`users/cart/${cartId}`, userData);
      // console.log(response.data.data.data);
      const cart = response.data.data.data;
      const updatedItem = new CartModel(
        cart.id,
        cart.product.id,
        cart.product.name,
        cart.total,
        cart.product.seller,
        cart.quantity,
        `/img/product/${cart.product.imageCover}`,
        cart.total
      );
      // console.log(updatedItem);
      dispatch({ type: UPDATE_CART, payload: updatedItem });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const calcTotal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_CART });

      const response = await axios.get("users/cart/total");
      // console.log(response);

      dispatch({ type: GET_TOTAL, payload: response.data.sum[0].total });
    } catch (err) {
      // console.log(err.response);
    }
  };
};
