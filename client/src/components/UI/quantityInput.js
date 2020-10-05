import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity } from "../../store/actions/cart";

const Input = (props) => {
  const [quantity, SetIsQuantity] = useState(props.value);
  const dispatch = useDispatch();
  //   console.log(quantity);
  const quantityChangeHandler = (e) => {
    SetIsQuantity(e);
  };

  const quantityUpdateHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateQuantity(props.cartId, quantity));
  };

  return (
    <form onSubmit={quantityUpdateHandler}>
      <div className="form-group">
        <label htmlFor="cart" className="cart__input--label">
          Qty:
        </label>
        <input
          type="text"
          id="cart"
          className="cart__input"
          value={quantity}
          onChange={(e) => quantityChangeHandler(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Input;
