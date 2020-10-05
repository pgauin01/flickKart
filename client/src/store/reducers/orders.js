import { GET_ORDERS, LOADING_ORDERS } from "../types";

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ORDERS:
      return {
        ...state,
        loading: true,
      };

    case GET_ORDERS:
      return {
        orders: action.payload,
        loading: false,
      };
  }
  return state;
};

export default reducer;
