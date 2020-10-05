import { ADD_WISHLIST, GET_WISHLIST } from "../types";
import WishModals from "../../modals/WishModals";

const initialState = {
  wishlist: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WISHLIST:
      return {
        wishlist: action.payload,
      };
  }
  return state;
};

export default reducer;
