import {
  GET_REVIEW,
  LOADING_UI,
  STOP_LOADING_UI,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from "../types";
import axios from "axios";

export const AddNewReview = (rating, review) => {
  return async (dispatch, getState) => {
    const user = getState().user.credentials.id;
    const product = getState().products.product.id;

    const userData = {
      review,
      rating,
      product,
      user,
    };

    try {
      const response = await axios.post("/reviews", userData);
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const getReviews = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOADING_UI });
      const user = getState().user.credentials.id;
      const response = await axios.get(`reviews/${user}`);
      dispatch({ type: GET_REVIEW, payload: response.data.data.data });
      dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateReview = (reviewId, userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`/reviews/${reviewId}`, userData);
      // console.log(response.data.data.data);
      dispatch({ type: UPDATE_REVIEW, payload: response.data.data.data });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/reviews/${reviewId}`);
      dispatch({ type: DELETE_REVIEW, payload: reviewId });
      console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
};
