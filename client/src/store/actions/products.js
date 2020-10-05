import { SET_PRODUCTS, SET_PRODUCT, LOADING_DATA } from "../types";
import axios from "axios";
import Products from "../../modals/Products";

//get all products
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_DATA });

      const response = await axios.get("/products");
      const res = response.data.data.data;
      // console.log(res);
      const updatedProducts = [];

      for (let key in res) {
        const FilteredHighlights = res[key].highlights.map((el) => {
          if (el.length > 18) {
            return `${el.slice(0, 18)}...`;
          }
          return el;
        });
        updatedProducts.push(
          new Products(
            res[key]._id,
            res[key].name,
            res[key].price,
            res[key].ratingsQuantity,
            res[key].ratingsAverage,
            res[key].seller,
            `/img/product/${res[key].imageCover}`,
            FilteredHighlights
          )
        );
      }
      if (response.status !== 200) {
        throw new Error("something went wrong");
      }
      dispatch({
        type: SET_PRODUCTS,
        payload: updatedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

//get single product

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });

    const response = await axios.get(`/products/${productId}`);
    // console.log(response.data.data.data);
    if (response.status !== 200) {
      throw new Error("something went wrong");
    }
    dispatch({
      type: SET_PRODUCT,
      payload: response.data.data.data,
    });
  } catch (err) {
    throw err;
  }
};
