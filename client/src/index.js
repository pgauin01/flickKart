import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";

import productsReducer from "./store/reducers/products";
import UiReducer from "./store/reducers/ui";
import UserReducer from "./store/reducers/user";
import wishlistReducer from "./store/reducers/wishlist";
import cartReducer from "./store/reducers/cart";
import reviewReducer from "./store/reducers/reviews";
import ordersReducer from "./store/reducers/orders";

import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  products: productsReducer,
  ui: UiReducer,
  user: UserReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  reviews: reviewReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
