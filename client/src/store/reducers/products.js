import { SET_PRODUCTS, SET_PRODUCT, LOADING_DATA } from "../types";
const initialState = {
  products: [],
  product: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PRODUCTS:
      return {
        products: action.payload,
        loading: false,
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
  }
  return state;
};

export default reducer;
