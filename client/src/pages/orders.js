import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./../store/actions/orders";
import dayjs from "dayjs";

const Orders = (props) => {
  const orders = useSelector((state) => state.orders);
  console.log(orders.loading);
  // console.log(orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  let screen;
  if (orders.loading) {
    screen = (
      <div className="loading">
        <img src="/loading.gif" />
      </div>
    );
  } else if (orders.orders.length === 0) {
    screen = (
      <div className="noItem">
        <p className="noItem__text">
          No products found in cart start adding some....
        </p>
      </div>
    );
  } else {
    screen = (
      <div className="orders">
        <div className="orders-container">
          {orders.orders.map((order) => {
            return (
              <div key={order.id} className="orders__card">
                {order.product.map((el, i) => {
                  return (
                    <div key={i} className="orders__items">
                      <img
                        src={`/img/product/${el.imageCover}`}
                        className="orders__img"
                      />
                      <div className="orders__desc">
                        <h4>Qty:{el.quantity}</h4>
                        <h4>Name:{el.name}</h4>
                        <h4>Price:₹{el.price}</h4>
                      </div>
                    </div>
                  );
                })}

                <div className="orders__calc">
                  <h1>Total Amount:₹{order.total}</h1>
                  <h1>
                    Ordered At:{dayjs(order.createdAt).format("DD/MM/YYYY")}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <section className="section-orders">
      <h1
        className="heading-secondary u-margin-horizontal-medium"
        style={{ textAlign: "center" }}
      >
        Your orders
      </h1>
      {screen}
    </section>
  );
};

export default Orders;
