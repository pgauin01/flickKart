import React, { useEffect } from "react";
import Products from "../components/Products";
import { useSelector, useDispatch } from "react-redux";
import { getWish } from "../store/actions/wishlist";

const Wishlist = (props) => {
  const dispatch = useDispatch();
  const wish = useSelector((state) => state.wishlist);
  const loading = useSelector((state) => state.ui.loading);
  const { wishlist } = wish;
  console.log(loading);

  useEffect(() => {
    dispatch(getWish());
  }, [dispatch]);

  let state;
  if (loading && wishlist.length === 0) {
    state = (
      <div className="loading">
        <img src="/loading.gif" />
      </div>
    );
  } else if (wishlist.length === 0) {
    state = (
      <div className="section-cart">
        <div className="noItem">
          <p className="noItem__text">
            No products found in wishlist start adding some....
          </p>
        </div>
      </div>
    );
  } else {
    state = <Products products={wishlist} wish />;
  }
  return state;
};

export default Wishlist;
