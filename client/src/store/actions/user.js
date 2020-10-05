import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  UPDATE_ME,
  LOADING_USER,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
} from "../types";

import axios from "axios";

export const loginUser = (userData, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });

      const response = await axios.post("/users/login", userData);
      dispatch({ type: SET_AUTHENTICATED, payload: response.data.data.user });
      setAuthorizationHeader(response.data.token, response.data.data.user._id);
      // dispatch({ type: SET_USER, payload: response.data.data.user });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    } catch (err) {
      // console.log(err.response.data);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    }
  };
};

export const SignupUser = (userData, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });

      const response = await axios.post("/users/signup", userData);
      dispatch({ type: SET_AUTHENTICATED, payload: response.data.data.user });
      setAuthorizationHeader(response.data.token, response.data.data.user._id);
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    } catch (err) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    }
  };
};

export const updateMe = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });
      const response = await axios.patch("/users/updateMe", userData);
      dispatch({ type: UPDATE_ME, payload: response.data.data.user });
      // dispatch({ type: STOP_LOADING_UI });
      dispatch({ type: CLEAR_ERRORS });

      // console.log(response.data.data.user);
    } catch (err) {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    }
  };
};

export const updatePassword = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_USER });
      await axios.patch("users/updateMyPassword", userData);
      // dispatch({ type: STOP_LOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
    } catch (err) {
      if (err.response.data.error.statusCode === 401) {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
      }
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    }
  };
};

export const verifyUser = () => {
  return async (dispatch) => {
    const userId = localStorage.getItem("userId");

    try {
      dispatch({ type: LOADING_USER });

      const user = await axios.get(`users/me`);
      if (userId == user.data.data.data.id) {
        dispatch({ type: SET_AUTHENTICATED, payload: user.data.data.data });
      } else {
        throw new Error("Invalid user");
      }
      // dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err);
      // dispatch({ type: STOP_LOADING_UI });
    }
  };
};

export const addAddress = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_UI });

      const response = await axios.post("/users/address", userData);
      dispatch({ type: ADD_ADDRESS, payload: response.data.data.data });
      dispatch({ type: STOP_LOADING_UI });

      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteAddress = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_UI });

      await axios.delete(`users/address/${id}`);
      dispatch({ type: DELETE_ADDRESS, payload: id });
      dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatingAddress = (id, userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_UI });

      const response = await axios.patch(`users/address/${id}`, userData);
      // console.log(response.data.data.user);
      dispatch({ type: UPDATE_ADDRESS, payload: response.data.data.user });
      dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
      console.log(err);
    }
  };
};

const setAuthorizationHeader = (token, UserId) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("jwt", FBIdToken);
  localStorage.setItem("userId", UserId);
};

const removerAuthHeader = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_UNAUTHENTICATED });
      removerAuthHeader();
    } catch (err) {
      console.log(err);
    }
  };
};
