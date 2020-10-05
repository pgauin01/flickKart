import {
  ADD_WISHLIST,
  GET_WISHLIST,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";
import WishModals from "../../modals/WishModals";
import axios from "axios";

export const addToWishlist = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("users/wishlist", userData);
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const removeWishList = (id) => {
  return async (dispatch) => {
    try {
      // dispatch({ type: LOADING_UI });
      await axios.delete(`/users/wishlist/${id}`);
      // console.log(response);
      // dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getWish = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_UI });
      const response = await axios.get("users/wishlist");
      dispatch({ type: GET_WISHLIST, payload: response.data.data.data });
      const wisharr = response.data.data.data;
      // console.log(response.data.data.data);
      const updatedWishlist = [];

      for (let key in wisharr) {
        const FilteredHighlights = wisharr[key].product.highlights.map((el) => {
          if (el.length > 18) {
            return `${el.slice(0, 18)}...`;
          }
          return el;
        });
        updatedWishlist.push(
          new WishModals(
            wisharr[key].id,
            wisharr[key].product.id,
            wisharr[key].product.name,
            wisharr[key].product.price,
            wisharr[key].product.ratingsQuantity,
            wisharr[key].product.ratingsAverage,
            wisharr[key].product.seller,
            `/img/product/${wisharr[key].product.imageCover}`,
            FilteredHighlights
          )
        );
      }
      // console.log(updatedWishlist);
      dispatch({ type: GET_WISHLIST, payload: updatedWishlist });
      dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err.response);
    }
  };
};
