// eslint-disable-next-line
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/layout/Header";
import Products from "../components/Products";
import { getProducts } from "../store/actions/products";

const Home = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.products.loading);
  // console.log(loading);

  // useEffect(() => {
  //   dispatch(getWish());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let state;
  if (loading || products.products.length === 0) {
    state = (
      <div className="loading">
        <img src="/loading.gif" />
      </div>
    );
  }

  state = (
    <Products
      {...props}
      product
      title="Popular Products"
      products={products.products}
    />
  );

  return (
    <>
      <Header />
      {state}
    </>
  );
};

export default Home;
