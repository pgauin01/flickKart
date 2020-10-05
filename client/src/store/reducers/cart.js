import {
  GET_CART,
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  LOADING_CART,
  GET_TOTAL,
} from "../types";

const initialState = {
  cart: [],
  total: 0,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CART:
      return {
        ...state,
        loading: true,
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case UPDATE_CART:
      const updateCart = action.payload;
      const updatedCartIndex = state.cart.findIndex(
        (el) => el.cartId === action.payload.cartId
      );
      const cartItems = [...state.cart];
      const prevPrice = cartItems[updatedCartIndex];
      cartItems[updatedCartIndex] = updateCart;
      const newTotalprice = state.total + updateCart.total - prevPrice.total;
      return {
        cart: cartItems,
        total: newTotalprice,
        loading: false,
      };
    case DELETE_CART:
      const deleteCart = state.cart.filter(
        (el) => el.cartId !== action.payload
      );
      const deleteIndex = state.cart.findIndex(
        (el) => el.cartId === action.payload
      );
      const cartItem = [...state.cart];

      const newTotal = state.total - cartItem[deleteIndex].price;
      return {
        ...state,
        cart: deleteCart,
        total: newTotal,
        loading: false,
      };
    case GET_TOTAL:
      return {
        ...state,
        total: action.payload,
        loading: false,
      };
  }
  return state;
};

export default reducer;
