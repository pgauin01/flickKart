import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./sass/main.scss";

import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import product from "./pages/product";
import products from "./pages/products";
// import users from "./pages/user";
// import cart from "./pages/cart";
// import wishlist from "./pages/wishlist";
// import orders from "./pages/orders";
// import AddReview from "./components/layout/addReview";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { verifyUser } from "./store/actions/user";
import axios from "axios";

const token = localStorage.getItem("jwt");
const FBIdToken = token;

axios.defaults.baseURL = "http://127.0.0.1:3000/api/v1";
axios.defaults.headers.common["Authorization"] = FBIdToken;

const User = React.lazy(() => {
  return import("./pages/user");
});

const Cart = React.lazy(() => {
  return import("./pages/cart");
});

const AddReview = React.lazy(() => {
  return import("./components/layout/addReview");
});

const Wishlist = React.lazy(() => {
  return import("./pages/wishlist");
});

const Orders = React.lazy(() => {
  return import("./pages/orders");
});

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const { authenticated, credentials } = user;

  useEffect(() => {
    if (token) {
      dispatch(verifyUser());
    }
  }, [dispatch, token]);

  let route = (
    <Switch>
      <Route path="/" exact component={home} />
      <Route path="/login" component={login} />
      <Route path="/signup" component={signup} />
      <Route path="/products" component={products} />
      <Route path="/product/:id" component={product} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  if (authenticated) {
    route = (
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
        <Route path="/products" component={products} />
        <Route path="/product/:id" component={product} />
        <Route path="/user/cart" render={(props) => <Cart {...props} />} />
        <Route
          path="/product/reviews/addReview"
          render={(props) => <AddReview {...props} />}
        />
        <Route
          path="/user/wishlist"
          render={(props) => <Wishlist {...props} />}
        />
        <Route path="/user/orders" render={(props) => <Orders {...props} />} />
        <Route path="/user" render={(props) => <User {...props} />} />

        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <>
      <Navbar loading={loading} auth={authenticated} user={credentials} />
      <Suspense fallback={<p>Loading....</p>}>{route}</Suspense>
      <Footer />
    </>
  );
}

export default App;
