import { GET_ORDERS, LOADING_ORDERS } from "../types";
import axios from "axios";

export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_ORDERS });
      const response = await axios.get("/bookings/orders");
      dispatch({ type: GET_ORDERS, payload: response.data.data.data });
      // console.log(response.data.data.data);
    } catch (err) {
      console.log(err.response);
    }
  };
};
