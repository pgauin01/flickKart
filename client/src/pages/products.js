import React, { useEffect } from "react";
import Product from "../components/Products";
import { useSelector, useDispatch } from "react-redux";

import { getProducts } from "../store/actions/products";

const Products = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const loading = useSelector((state) => state.products.loading);
  // console.log(products);

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
  } else {
    state = (
      <Product
        product
        title="All Products"
        products={products.products}
        {...props}
      />
    );
  }

  return (
    <>
      {state}
      {/* <section className="section-products">
        <div className="recentview-container">
          <h2 className="heading-secondary u-margin-bottom-medium">
            Recently viewed products
          </h2>
          <div className="recentProducts">
            <figure className="recentProducts__shape">
              <img src="../hero.jpg" className="recentProducts__img" />
              <figcaption className="recentProducts__name">Poco X2</figcaption>
              <figcaption className="recentProducts__price">$599</figcaption>
            </figure>

          </div>
        </div>
      </section> */}
    </>
  );
};

export default Products;
