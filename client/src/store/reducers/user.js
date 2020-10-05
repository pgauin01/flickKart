import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  ADD_ADDRESS,
  UPDATE_ME,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from "../types";
const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTHENTICATED:
      return {
        loading: false,
        authenticated: true,
        credentials: action.payload,
      };
    case UPDATE_ME:
      return {
        ...state,
        loading: false,
        credentials: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return {
        loading: false,
        authenticated: false,
        credentials: {},
      };
    case ADD_ADDRESS:
      const newAddress = action.payload;
      const newCreden = {
        ...state.credentials,
        address: state.credentials.address.concat(newAddress),
      };
      return {
        ...state,
        credentials: newCreden,
      };

    case UPDATE_ADDRESS:
      const updateAddress = action.payload;
      const updatedAddressIndex = state.credentials.address.findIndex(
        (address) => address.id === updateAddress.id
      );
      const updatedAddress = [...state.credentials.address];
      updatedAddress[updatedAddressIndex] = updateAddress;
      const newCred = {
        ...state.credentials,
        address: updatedAddress,
      };
      return {
        ...state,
        credentials: newCred,
      };

    case DELETE_ADDRESS:
      const deleteAddress = state.credentials.address.filter(
        (el) => el.id !== action.payload
      );
      const newCredentials = {
        ...state.credentials,
        address: deleteAddress,
      };
      return {
        ...state,
        credentials: newCredentials,
      };
    default:
      return state;
  }
};

export default reducer;
