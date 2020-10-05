import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/actions/user";

const AddAddress = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.credentials.id);

  const [address, SetAddress] = useState("");
  //   console.log(address);

  const inputHandler = (e) => {
    SetAddress(e);
  };
  const inputSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addAddress({ address, user }));
  };

  const cancelHandler = () => {
    props.history.goBack();
  };

  return (
    <div className="userViewAddress__edit">
      <h1 className="u-margin-horizontal-medium">Add Address</h1>
      <form onSubmit={inputSubmitHandler}>
        <input
          type="text"
          name="address"
          id="address"
          className="userViewAddress__input"
          value={address}
          onChange={(event) => inputHandler(event.target.value)}
        />
        <div className="userViewAddress__actions u-margin-top-medium">
          <button className="btn btn--cart--1" onClick={inputSubmitHandler}>
            Submit
          </button>
          <Link to="/user">
            <button className="btn btn--cart--2 u-margin-left-3">cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
