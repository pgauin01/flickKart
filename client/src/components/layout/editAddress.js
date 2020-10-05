import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatingAddress } from "../../store/actions/user";

const EditAddress = (props) => {
  // console.log(props);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const adress = user.credentials.address;
  const add = adress.find((el) => el.id === props.id);
  const [address, SetAddress] = useState(add.address);
  // console.log(inputVal);

  // window.history.pushState(null, null, newPath);

  const inputHandler = (e) => {
    SetAddress(e);
  };
  const inputSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updatingAddress(add.id, { address }));
  };

  const goBackscreen = () => {
    props.history.goBack();
  };
  return (
    <div className="userViewAddress__edit">
      <h1 className="u-margin-horizontal-medium">Edit Address</h1>
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
          <button
            className="btn btn--cart--2 u-margin-left-3"
            onClick={goBackscreen}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
